import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';
import Result from '../utils/constant/result.js';
import constants from '../utils/constant/constants.js';
import messages from '../utils/constant/message.js';

const auth = async (req, res, next) => {
    try {
        const result = new Result();
        const authorization = req.headers.authorization;
        if (!authorization) {
            result.status = constants.httpStatus.unauthorized;
            result.message = messages.authorizationTokenRequired;
            return res.status(result.status).send(result);
        }

        const [prefix, token] = authorization.split(' ');
        if (prefix !== constants.token.prefix || !token) {
            result.status = constants.httpStatus.unauthorized;
            result.message = messages.invalidOrExpiredToken;
            return res.status(result.status).send(result);
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.id);

        if (!user) {
            result.status = constants.httpStatus.unauthorized;
            result.message = messages.userNotFound;
            return res.status(result.status).send(result);
        }

        req.user = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        };

        next();
    } catch (error) {
        const result = new Result();
        result.status = constants.httpStatus.unauthorized;
        result.message = messages.invalidOrExpiredToken;
        result.data = error.message ? { detail: error.message } : [];
        return res.status(result.status).send(result);
    }
};

export default auth;
