import Result from '../utils/constant/result.js';
import contentService from '../services/contentService.js';
import broadcastService from '../services/broadcastService.js';
import constants from '../utils/constant/constants.js';
import messages from '../utils/constant/message.js';
import ValidationHelper from '../utils/validationHelper.js';

class ContentController {
    async uploadContent({ teacherId, title, description, subject, startTime, endTime, rotationDuration, file }) {
        const res = new Result();
        const { httpStatus } = constants;

        try {
            if (!title || !subject || !file) {
                res.status = httpStatus.badRequest;
                res.message = messages.contentTitleSubjectFileRequired;
                return res;
            }

            if (!startTime || !endTime) {
                res.status = httpStatus.badRequest;
                res.message = messages.contentScheduleFieldsRequired;
                return res;
            }

            const parsedStartTime = new Date(startTime);
            const parsedEndTime = new Date(endTime);

            if (Number.isNaN(parsedStartTime.getTime()) || Number.isNaN(parsedEndTime.getTime())) {
                res.status = httpStatus.badRequest;
                res.message = messages.invalidDateFormat;
                return res;
            }

            if (parsedStartTime >= parsedEndTime) {
                res.status = httpStatus.badRequest;
                res.message = messages.invalidContentScheduleWindow;
                return res;
            }

            if (rotationDuration !== undefined && Number(rotationDuration) <= 0) {
                res.status = httpStatus.badRequest;
                res.message = messages.invalidRotationDuration;
                return res;
            }

            const data = await contentService.uploadContent({
                teacherId,
                contentData: { title, description, subject, startTime, endTime, rotationDuration },
                file,
            });

            res.status = httpStatus.created;
            res.message = messages.contentUploadedSuccessfully;
            res.data = data;
            return res;
        } catch (err) {
            res.status = httpStatus.serverError;
            res.message = err.message || messages.unableToUploadContent;
            return res;
        }
    }

    async getContents({ teacherId, role, query }) {
        const res = new Result();
        const { httpStatus, contentStatus } = constants;

        try {
            if (query.status && !Object.values(contentStatus).includes(query.status)) {
                res.status = httpStatus.badRequest;
                res.message = messages.invalidContentStatus;
                return res;
            }

            if (role === constants.roles.principal && query.teacherId && !ValidationHelper.isPositiveInteger(query.teacherId)) {
                res.status = httpStatus.badRequest;
                res.message = messages.invalidContentId;
                return res;
            }

            const data = await contentService.getContents({
                teacherId,
                role,
                query,
            });

            res.status = httpStatus.success;
            res.message = role === constants.roles.principal ? messages.contentsFetchedSuccessfully : messages.teacherContentsFetchedSuccessfully;
            res.data = data;
            return res;
        } catch (err) {
            res.status = httpStatus.serverError;
            res.message = err.message || (role === constants.roles.principal ? messages.unableToFetchContents : messages.unableToFetchTeacherContents);
            return res;
        }
    }

    async getContentById({ teacherId, role, contentId }) {
        const res = new Result();
        const { httpStatus } = constants;

        try {
            if (!ValidationHelper.isPositiveInteger(contentId)) {
                res.status = httpStatus.badRequest;
                res.message = messages.invalidContentId;
                return res;
            }

            const data = await contentService.getContentById({
                teacherId,
                role,
                contentId,
            });

            res.status = httpStatus.success;
            res.message = messages.teacherContentFetchedSuccessfully;
            res.data = data;
            return res;
        } catch (err) {
            res.status = err.message === messages.contentNotFound ? httpStatus.notFound : err.message === messages.contentAccessDenied ? httpStatus.forbidden : httpStatus.serverError;
            res.message = err.message || (role === constants.roles.principal ? messages.unableToFetchContents : messages.unableToFetchTeacherContent);
            return res;
        }
    }

    async updateContent({ teacherId, contentId, title, description, subject, startTime, endTime, rotationDuration, file }) {
        const res = new Result();
        const { httpStatus } = constants;

        try {
            if (!ValidationHelper.isPositiveInteger(contentId)) {
                res.status = httpStatus.badRequest;
                res.message = messages.invalidContentId;
                return res;
            }

            if (title === undefined && description === undefined && subject === undefined && startTime === undefined && endTime === undefined && rotationDuration === undefined && !file) {
                res.status = httpStatus.badRequest;
                res.message = messages.contentUpdatedFieldsRequired;
                return res;
            }

            if ((startTime !== undefined && !endTime) || (endTime !== undefined && !startTime)) {
                res.status = httpStatus.badRequest;
                res.message = messages.contentScheduleFieldsRequired;
                return res;
            }

            let parsedStartTime;
            let parsedEndTime;

            if (startTime !== undefined && endTime !== undefined) {
                parsedStartTime = new Date(startTime);
                parsedEndTime = new Date(endTime);

                if (Number.isNaN(parsedStartTime.getTime()) || Number.isNaN(parsedEndTime.getTime())) {
                    res.status = httpStatus.badRequest;
                    res.message = messages.invalidDateFormat;
                    return res;
                }
            }

            if (startTime !== undefined && endTime !== undefined && parsedStartTime >= parsedEndTime) {
                res.status = httpStatus.badRequest;
                res.message = messages.invalidContentScheduleWindow;
                return res;
            }

            if (rotationDuration !== undefined && Number(rotationDuration) <= 0) {
                res.status = httpStatus.badRequest;
                res.message = messages.invalidRotationDuration;
                return res;
            }

            const data = await contentService.updateContent({
                teacherId,
                contentId,
                updateData: { title, description, subject, startTime, endTime, rotationDuration },
                file,
            });

            res.status = httpStatus.success;
            res.message = file ? messages.contentFileUpdatedSuccessfully : messages.contentUpdatedSuccessfully;
            res.data = data;
            return res;
        } catch (err) {
            res.status = err.message === messages.contentNotFound ? httpStatus.notFound : err.message === messages.contentAccessDenied ? httpStatus.forbidden : err.message === messages.contentUpdateNotAllowed ? httpStatus.badRequest : httpStatus.serverError;
            res.message = err.message || messages.unableToUpdateContent;
            return res;
        }
    }

    async deleteContent({ teacherId, contentId }) {
        const res = new Result();
        const { httpStatus } = constants;

        try {
            if (!ValidationHelper.isPositiveInteger(contentId)) {
                res.status = httpStatus.badRequest;
                res.message = messages.invalidContentId;
                return res;
            }

            const data = await contentService.deleteContent({
                teacherId,
                contentId,
            });

            res.status = httpStatus.success;
            res.message = messages.contentDeletedSuccessfully;
            res.data = data;
            return res;
        } catch (err) {
            res.status = err.message === messages.contentNotFound ? httpStatus.notFound : err.message === messages.contentAccessDenied ? httpStatus.forbidden : err.message === messages.contentDeleteNotAllowed ? httpStatus.badRequest : httpStatus.serverError;
            res.message = err.message || messages.unableToDeleteContent;
            return res;
        }
    }

    async getContentSummary({ teacherId, role }) {
        const res = new Result();
        const { httpStatus } = constants;

        try {
            const data = await contentService.getContentSummary({
                teacherId,
                role,
            });

            res.status = httpStatus.success;
            res.message = role === constants.roles.principal ? messages.contentSummaryFetchedSuccessfully : messages.teacherContentSummaryFetchedSuccessfully;
            res.data = data;
            return res;
        } catch (err) {
            res.status = httpStatus.serverError;
            res.message = err.message || (role === constants.roles.principal ? messages.unableToFetchContentSummary : messages.unableToFetchTeacherContentSummary);
            return res;
        }
    }

    async getPendingContents({ teacherId, role, query }) {
        const res = new Result();
        const { httpStatus } = constants;

        try {
            if (role === constants.roles.principal && query.teacherId && !ValidationHelper.isPositiveInteger(query.teacherId)) {
                res.status = httpStatus.badRequest;
                res.message = messages.invalidContentId;
                return res;
            }

            const data = await contentService.getPendingContents({ teacherId, role, query });
            res.status = httpStatus.success;
            res.message = role === constants.roles.principal ? messages.pendingContentsFetchedSuccessfully : messages.teacherContentsFetchedSuccessfully;
            res.data = data;
            return res;
        } catch (err) {
            res.status = httpStatus.serverError;
            res.message = err.message || (role === constants.roles.principal ? messages.unableToFetchPendingContents : messages.unableToFetchTeacherContents);
            return res;
        }
    }

    async updateContentStatus({ contentId, principalId, status, rejectionReason }) {
        const res = new Result();
        const { httpStatus, contentStatus } = constants;

        try {
            if (!ValidationHelper.isPositiveInteger(contentId)) {
                res.status = httpStatus.badRequest;
                res.message = messages.invalidContentId;
                return res;
            }

            if (![contentStatus.approved, contentStatus.rejected].includes(status)) {
                res.status = httpStatus.badRequest;
                res.message = messages.invalidApprovalStatus;
                return res;
            }

            if (status === contentStatus.rejected && (!rejectionReason || !rejectionReason.trim())) {
                res.status = httpStatus.badRequest;
                res.message = messages.rejectionReasonRequired;
                return res;
            }

            const data = await contentService.updateContentStatus({
                contentId,
                principalId,
                status,
                rejectionReason: rejectionReason?.trim(),
            });
            res.status = httpStatus.success;
            res.message = messages.contentStatusUpdatedSuccessfully;
            res.data = data;
            return res;
        } catch (err) {
            res.status = err.message === messages.contentNotFound ? httpStatus.notFound : httpStatus.serverError;
            res.message = err.message || messages.unableToUpdateContentStatus;
            return res;
        }
    }

    async resubmitContent({ teacherId, contentId }) {
        const res = new Result();
        const { httpStatus } = constants;

        try {
            if (!ValidationHelper.isPositiveInteger(contentId)) {
                res.status = httpStatus.badRequest;
                res.message = messages.invalidContentId;
                return res;
            }

            const data = await contentService.resubmitContent({
                teacherId,
                contentId,
            });

            res.status = httpStatus.success;
            res.message = messages.contentResubmittedSuccessfully;
            res.data = data;
            return res;
        } catch (err) {
            res.status = err.message === messages.contentNotFound ? httpStatus.notFound : err.message === messages.contentAccessDenied ? httpStatus.forbidden : err.message === messages.contentResubmitNotAllowed ? httpStatus.badRequest : httpStatus.serverError;
            res.message = err.message || messages.unableToResubmitContent;
            return res;
        }
    }

    async getLiveContent({ teacherId, subject }) {
        const res = new Result();
        const { httpStatus } = constants;

        try {
            if (!ValidationHelper.isPositiveInteger(teacherId)) {
                res.status = httpStatus.badRequest;
                res.message = messages.invalidContentId;
                return res;
            }

            const data = await broadcastService.getLiveContent({ teacherId, subject });
            res.status = httpStatus.success;
            res.message = data.length ? messages.liveContentFetchedSuccessfully : messages.noContentAvailable;
            res.data = data;
            return res;
        } catch (err) {
            res.status = httpStatus.serverError;
            res.message = err.message || messages.unableToFetchLiveContent;
            return res;
        }
    }
}

export default new ContentController();
