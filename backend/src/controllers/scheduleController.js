import Result from '../utils/constant/result.js';
import constants from '../utils/constant/constants.js';
import messages from '../utils/constant/message.js';
import ValidationHelper from '../utils/validationHelper.js';
import scheduleService from '../services/scheduleService.js';

class ScheduleController {
    async createSchedule({ contentId, slotId, rotationOrder, duration }) {
        const res = new Result();
        const { httpStatus } = constants;

        try {
            if (!contentId || !slotId || rotationOrder === undefined || duration === undefined) {
                res.status = httpStatus.badRequest;
                res.message = messages.scheduleFieldsRequired;
                return res;
            }

            if (!ValidationHelper.isPositiveInteger(contentId)) {
                res.status = httpStatus.badRequest;
                res.message = messages.invalidContentId;
                return res;
            }

            if (!ValidationHelper.isPositiveInteger(slotId)) {
                res.status = httpStatus.badRequest;
                res.message = messages.invalidSlotId;
                return res;
            }

            if (Number(rotationOrder) <= 0) {
                res.status = httpStatus.badRequest;
                res.message = messages.invalidRotationOrder;
                return res;
            }

            if (Number(duration) <= 0) {
                res.status = httpStatus.badRequest;
                res.message = messages.invalidScheduleDuration;
                return res;
            }

            const data = await scheduleService.createSchedule({ contentId, slotId, rotationOrder, duration });
            res.status = httpStatus.created;
            res.message = messages.scheduleCreatedSuccessfully;
            res.data = data;
            return res;
        } catch (err) {
            res.status = err.message === messages.contentNotFound || err.message === messages.slotNotFound ? httpStatus.notFound : err.message === messages.contentMustBeApprovedForSchedule ? httpStatus.badRequest : httpStatus.serverError;
            res.message = err.message || messages.unableToCreateSchedule;
            return res;
        }
    }

    async getSchedules({ query }) {
        const res = new Result();
        const { httpStatus } = constants;

        try {
            if (query.slotId && !ValidationHelper.isPositiveInteger(query.slotId)) {
                res.status = httpStatus.badRequest;
                res.message = messages.invalidSlotId;
                return res;
            }

            if (query.contentId && !ValidationHelper.isPositiveInteger(query.contentId)) {
                res.status = httpStatus.badRequest;
                res.message = messages.invalidContentId;
                return res;
            }

            const data = await scheduleService.getSchedules({ query });
            res.status = httpStatus.success;
            res.message = messages.schedulesFetchedSuccessfully;
            res.data = data;
            return res;
        } catch (err) {
            res.status = httpStatus.serverError;
            res.message = err.message || messages.unableToFetchSchedules;
            return res;
        }
    }

    async getScheduleById({ scheduleId }) {
        const res = new Result();
        const { httpStatus } = constants;

        try {
            if (!ValidationHelper.isPositiveInteger(scheduleId)) {
                res.status = httpStatus.badRequest;
                res.message = messages.invalidScheduleId;
                return res;
            }

            const data = await scheduleService.getScheduleById({ scheduleId });
            res.status = httpStatus.success;
            res.message = messages.scheduleFetchedSuccessfully;
            res.data = data;
            return res;
        } catch (err) {
            res.status = err.message === messages.scheduleNotFound ? httpStatus.notFound : httpStatus.serverError;
            res.message = err.message || messages.unableToFetchSchedule;
            return res;
        }
    }

    async updateSchedule({ scheduleId, slotId, rotationOrder, duration }) {
        const res = new Result();
        const { httpStatus } = constants;

        try {
            if (!ValidationHelper.isPositiveInteger(scheduleId)) {
                res.status = httpStatus.badRequest;
                res.message = messages.invalidScheduleId;
                return res;
            }

            if (slotId === undefined && rotationOrder === undefined && duration === undefined) {
                res.status = httpStatus.badRequest;
                res.message = messages.scheduleUpdateFieldsRequired;
                return res;
            }

            if (slotId !== undefined && !ValidationHelper.isPositiveInteger(slotId)) {
                res.status = httpStatus.badRequest;
                res.message = messages.invalidSlotId;
                return res;
            }

            if (rotationOrder !== undefined && Number(rotationOrder) <= 0) {
                res.status = httpStatus.badRequest;
                res.message = messages.invalidRotationOrder;
                return res;
            }

            if (duration !== undefined && Number(duration) <= 0) {
                res.status = httpStatus.badRequest;
                res.message = messages.invalidScheduleDuration;
                return res;
            }

            const data = await scheduleService.updateSchedule({ scheduleId, slotId, rotationOrder, duration });
            res.status = httpStatus.success;
            res.message = messages.scheduleUpdatedSuccessfully;
            res.data = data;
            return res;
        } catch (err) {
            res.status = err.message === messages.scheduleNotFound || err.message === messages.slotNotFound ? httpStatus.notFound : httpStatus.serverError;
            res.message = err.message || messages.unableToUpdateSchedule;
            return res;
        }
    }

    async deleteSchedule({ scheduleId }) {
        const res = new Result();
        const { httpStatus } = constants;

        try {
            if (!ValidationHelper.isPositiveInteger(scheduleId)) {
                res.status = httpStatus.badRequest;
                res.message = messages.invalidScheduleId;
                return res;
            }

            const data = await scheduleService.deleteSchedule({ scheduleId });
            res.status = httpStatus.success;
            res.message = messages.scheduleDeletedSuccessfully;
            res.data = data;
            return res;
        } catch (err) {
            res.status = err.message === messages.scheduleNotFound ? httpStatus.notFound : httpStatus.serverError;
            res.message = err.message || messages.unableToDeleteSchedule;
            return res;
        }
    }
}

export default new ScheduleController();
