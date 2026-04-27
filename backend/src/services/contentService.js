import { Op } from 'sequelize';
import { Content } from '../models/content.js';
import { ContentSlot } from '../models/contentSlot.js';
import messages from '../utils/constant/message.js';
import constants from '../utils/constant/constants.js';

class ContentService {
    async uploadContent({ teacherId, contentData, file }) {
        await this.#ensureSubjectSlot(contentData.subject);

        const content = await Content.create({
            title: contentData.title,
            description: contentData.description || null,
            subject: contentData.subject,
            start_time: contentData.startTime,
            end_time: contentData.endTime,
            rotation_duration: contentData.rotationDuration ? Number(contentData.rotationDuration) : null,
            file_url: file.path.replace(/\\/g, '/'),
            file_type: file.mimetype,
            file_size: file.size,
            status: constants.contentStatus.pending,
            rejection_reason: null,
            uploaded_by: teacherId,
        });

        return content;
    }

    async getContents({ teacherId, query }) {
        const where = { uploaded_by: teacherId };

        if (query.status) {
            where.status = query.status;
        }

        if (query.subject) {
            where.subject = { [Op.iLike]: `%${query.subject}%` };
        }

        const page = Number(query.page) > 0 ? Number(query.page) : 1;
        const limit = Number(query.limit) > 0 ? Number(query.limit) : 10;
        const offset = (page - 1) * limit;

        const { rows, count } = await Content.findAndCountAll({
            where,
            order: [['id', 'DESC']],
            limit,
            offset,
        });

        return {
            items: rows,
            pagination: {
                page,
                limit,
                total: count,
                totalPages: Math.ceil(count / limit) || 1,
            },
        };
    }

    async getContentById({ teacherId, contentId }) {
        const content = await this.#getOwnedContent({ teacherId, contentId });
        return content;
    }

    async updateContent({ teacherId, contentId, updateData, file }) {
        const content = await this.#getOwnedContent({ teacherId, contentId });

        if (content.status === constants.contentStatus.approved) {
            throw new Error(messages.contentUpdateNotAllowed);
        }

        if (updateData.subject !== undefined) {
            await this.#ensureSubjectSlot(updateData.subject);
        }

        await content.update({
            ...(updateData.title !== undefined ? { title: updateData.title } : {}),
            ...(updateData.description !== undefined ? { description: updateData.description } : {}),
            ...(updateData.subject !== undefined ? { subject: updateData.subject } : {}),
            ...(updateData.startTime !== undefined ? { start_time: updateData.startTime } : {}),
            ...(updateData.endTime !== undefined ? { end_time: updateData.endTime } : {}),
            ...(updateData.rotationDuration !== undefined ? { rotation_duration: updateData.rotationDuration ? Number(updateData.rotationDuration) : null } : {}),
            ...(file ? {
                file_url: file.path.replace(/\\/g, '/'),
                file_type: file.mimetype,
                file_size: file.size,
            } : {}),
        });

        return content;
    }

    async deleteContent({ teacherId, contentId }) {
        const content = await this.#getOwnedContent({ teacherId, contentId });

        if (content.status === constants.contentStatus.approved) {
            throw new Error(messages.contentDeleteNotAllowed);
        }

        await content.destroy();
        return { deleted: true, contentId: Number(contentId) };
    }

    async getContentSummary({ teacherId }) {
        const contents = await Content.findAll({
            where: { uploaded_by: teacherId },
            attributes: ['status'],
        });

        const summary = {
            total: contents.length,
            pending: 0,
            approved: 0,
            rejected: 0,
            uploaded: 0,
        };

        contents.forEach((content) => {
            if (summary[content.status] !== undefined) {
                summary[content.status] += 1;
            }
        });

        return summary;
    }

    async resubmitContent({ teacherId, contentId }) {
        const content = await this.#getOwnedContent({ teacherId, contentId });

        if (content.status !== constants.contentStatus.rejected) {
            throw new Error(messages.contentResubmitNotAllowed);
        }

        await content.update({
            status: constants.contentStatus.pending,
            rejection_reason: null,
        });

        return content;
    }

    async #getOwnedContent({ teacherId, contentId }) {
        const content = await Content.findByPk(contentId);

        if (!content) {
            throw new Error(messages.contentNotFound);
        }

        if (content.uploaded_by !== teacherId) {
            throw new Error(messages.contentAccessDenied);
        }

        return content;
    }

    async #ensureSubjectSlot(subject) {
        await ContentSlot.findOrCreate({
            where: { subject },
            defaults: { subject },
        });
    }
}

export default new ContentService();
