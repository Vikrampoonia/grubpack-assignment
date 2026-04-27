import rateLimit from 'express-rate-limit';
import messages from '../utils/constant/message.js';
import constants from '../utils/constant/constants.js';

export const publicLiveRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        status: constants.httpStatus.badRequest,
        message: messages.tooManyRequests,
        data: [],
    },
});
