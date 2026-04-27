import Result from '../utils/constant/result.js';
import authService from '../services/authService.js';
import constants from '../utils/constant/constants.js';
import messages from '../utils/constant/message.js';

class AuthController {
    async signUp({ name, email, password, role }) {
        const res = new Result();
        const { httpStatus, roles } = constants;

        try {
            if (!name || !email || !password || !role) {
                res.status = httpStatus.badRequest;
                res.message = messages.nameEmailPasswordRoleRequired;
                return res;
            }

            if (!this.#isValidEmail(email)) {
                res.status = httpStatus.badRequest;
                res.message = messages.invalidEmail;
                return res;
            }

            if (password.length < 6) {
                res.status = httpStatus.badRequest;
                res.message = messages.passwordMinLength;
                return res;
            }

            if (!Object.values(roles).includes(role)) {
                res.status = httpStatus.badRequest;
                res.message = messages.invalidRole;
                return res;
            }

            const data = await authService.signUp({
                userData: { name, email, password, role },
            });
            res.status = httpStatus.created;
            res.message = messages.signupSuccessful;
            res.data = data;
            return res;
        } catch (err) {
            res.status = err.message === messages.userAlreadyExists ? httpStatus.conflict : httpStatus.serverError;
            res.message = err.message || messages.unableToSignup;
            return res;
        }
    }

    async logIn({ email, password }) {
        const res = new Result();
        const { httpStatus } = constants;

        try {
            if (!email || !password) {
                res.status = httpStatus.badRequest;
                res.message = messages.emailPasswordRequired;
                return res;
            }

            if (!this.#isValidEmail(email)) {
                res.status = httpStatus.badRequest;
                res.message = messages.invalidEmail;
                return res;
            }

            const data = await authService.logIn({ email, password });
            res.status = httpStatus.success;
            res.message = messages.loginSuccessful;
            res.data = data;
            return res;
        } catch (err) {
            res.status = err.message === messages.invalidEmailOrPassword ? httpStatus.unauthorized : httpStatus.serverError;
            res.message = err.message || messages.unableToLogin;
            return res;
        }
    }

    async logOut() {
        const res = new Result();
        const { httpStatus } = constants;

        try {
            const data = await authService.logOut();
            res.status = httpStatus.success;
            res.message = messages.logoutSuccessful;
            res.data = data;
            return res;
        } catch (err) {
            res.status = httpStatus.serverError;
            res.message = err.message || messages.unableToLogout;
            return res;
        }
    }

    #isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
}

export default new AuthController();
