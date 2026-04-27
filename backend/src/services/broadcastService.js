import { ContentSchedule } from '../models/contentSchedule.js';
import { Content } from '../models/content.js';
import { ContentSlot } from '../models/contentSlot.js';
import { User } from '../models/user.js';
import constants from '../utils/constant/constants.js';

class BroadcastService {
    async getLiveContent({ teacherId, subject }) {
        const now = new Date();

        const scheduleWhere = {};
        const slotInclude = {
            model: ContentSlot,
            attributes: ['id', 'subject'],
        };

        if (subject) {
            slotInclude.where = { subject };
        }

        const schedules = await ContentSchedule.findAll({
            where: scheduleWhere,
            include: [
                {
                    model: Content,
                    where: {
                        uploaded_by: Number(teacherId),
                        status: constants.contentStatus.approved,
                    },
                    include: [
                        {
                            model: User,
                            as: 'uploader',
                            attributes: ['id', 'name', 'email'],
                        },
                    ],
                },
                slotInclude,
            ],
            order: [
                [{ model: ContentSlot, as: 'ContentSlot' }, 'subject', 'ASC'],
                ['rotation_order', 'ASC'],
                ['id', 'ASC'],
            ],
        });

        const activeSchedules = schedules.filter((schedule) => {
            const content = schedule.Content;
            if (!content?.start_time || !content?.end_time) {
                return false;
            }

            const startTime = new Date(content.start_time);
            const endTime = new Date(content.end_time);
            return now >= startTime && now <= endTime;
        });

        if (!activeSchedules.length) {
            return [];
        }

        const groupedBySubject = activeSchedules.reduce((acc, schedule) => {
            const slotSubject = schedule.ContentSlot.subject;
            if (!acc[slotSubject]) {
                acc[slotSubject] = [];
            }
            acc[slotSubject].push(schedule);
            return acc;
        }, {});

        const liveItems = Object.values(groupedBySubject).map((subjectSchedules) => {
            const sortedSchedules = subjectSchedules.sort((a, b) => {
                if (a.rotation_order !== b.rotation_order) {
                    return a.rotation_order - b.rotation_order;
                }
                return a.id - b.id;
            });

            const totalDurationInMs = sortedSchedules.reduce((sum, schedule) => sum + (schedule.duration * 60 * 1000), 0);
            if (totalDurationInMs <= 0) {
                return null;
            }

            const earliestStartTime = sortedSchedules.reduce((earliest, schedule) => {
                const scheduleStart = new Date(schedule.Content.start_time);
                return scheduleStart < earliest ? scheduleStart : earliest;
            }, new Date(sortedSchedules[0].Content.start_time));

            const elapsedMs = now.getTime() - earliestStartTime.getTime();
            const loopOffset = ((elapsedMs % totalDurationInMs) + totalDurationInMs) % totalDurationInMs;

            let cumulativeDuration = 0;
            const activeSchedule = sortedSchedules.find((schedule) => {
                cumulativeDuration += schedule.duration * 60 * 1000;
                return loopOffset < cumulativeDuration;
            }) || sortedSchedules[0];

            return {
                subject: activeSchedule.ContentSlot.subject,
                scheduleId: activeSchedule.id,
                rotationOrder: activeSchedule.rotation_order,
                duration: activeSchedule.duration,
                content: activeSchedule.Content,
            };
        }).filter(Boolean);

        return liveItems;
    }
}

export default new BroadcastService();
