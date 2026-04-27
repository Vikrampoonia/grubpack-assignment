import { Op } from 'sequelize';
import { Content } from '../models/content.js';
import { ContentSlot } from '../models/contentSlot.js';
import { ContentSchedule } from '../models/contentSchedule.js';
import messages from '../utils/constant/message.js';
import constants from '../utils/constant/constants.js';

class ScheduleService {
    async createSchedule({ contentId, slotId, rotationOrder, duration }) {
        const content = await Content.findByPk(contentId);
        if (!content) {
            throw new Error(messages.contentNotFound);
        }

        if (content.status !== constants.contentStatus.approved) {
            throw new Error(messages.contentMustBeApprovedForSchedule);
        }

        const slot = await ContentSlot.findByPk(slotId);
        if (!slot) {
            throw new Error(messages.slotNotFound);
        }

        const schedule = await ContentSchedule.create({
            content_id: Number(contentId),
            slot_id: Number(slotId),
            rotation_order: Number(rotationOrder),
            duration: Number(duration),
        });

        return schedule;
    }

    async getSchedules({ query }) {
        const where = {};

        if (query.slotId) {
            where.slot_id = Number(query.slotId);
        }

        if (query.contentId) {
            where.content_id = Number(query.contentId);
        }

        const include = [
            { model: Content, attributes: ['id', 'title', 'subject', 'status'] },
            { model: ContentSlot, attributes: ['id', 'subject'] },
        ];

        if (query.subject) {
            include[1].where = { subject: { [Op.iLike]: `%${query.subject}%` } };
        }

        const schedules = await ContentSchedule.findAll({
            where,
            include,
            order: [['rotation_order', 'ASC'], ['id', 'ASC']],
        });

        return schedules;
    }

    async getScheduleById({ scheduleId }) {
        const schedule = await this.#findSchedule(scheduleId);
        return schedule;
    }

    async updateSchedule({ scheduleId, slotId, rotationOrder, duration }) {
        const schedule = await this.#findSchedule(scheduleId);

        if (slotId !== undefined) {
            const slot = await ContentSlot.findByPk(slotId);
            if (!slot) {
                throw new Error(messages.slotNotFound);
            }
        }

        await schedule.update({
            ...(slotId !== undefined ? { slot_id: Number(slotId) } : {}),
            ...(rotationOrder !== undefined ? { rotation_order: Number(rotationOrder) } : {}),
            ...(duration !== undefined ? { duration: Number(duration) } : {}),
        });

        return schedule;
    }

    async deleteSchedule({ scheduleId }) {
        const schedule = await this.#findSchedule(scheduleId);
        await schedule.destroy();
        return { deleted: true, scheduleId: Number(scheduleId) };
    }

    async #findSchedule(scheduleId) {
        const schedule = await ContentSchedule.findByPk(scheduleId, {
            include: [
                { model: Content, attributes: ['id', 'title', 'subject', 'status'] },
                { model: ContentSlot, attributes: ['id', 'subject'] },
            ],
        });

        if (!schedule) {
            throw new Error(messages.scheduleNotFound);
        }

        return schedule;
    }
}

export default new ScheduleService();
