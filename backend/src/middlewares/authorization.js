import Result from '../utils/constant/result.js';
import constants from '../utils/constant/constants.js';
import messages from '../utils/constant/message.js';

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        const result = new Result();
        if (!req.user) {
            result.status = constants.httpStatus.unauthorized;
            result.message = messages.unauthorized;
            return res.status(result.status).send(result);
        }

        if (!roles.includes(req.user.role)) {
            result.status = constants.httpStatus.forbidden;
            result.message = messages.accessDenied;
            return res.status(result.status).send(result);
        }

        next();
    };
};

export default authorizeRoles;
