import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';
import messages from '../utils/constant/message.js';
import constants from '../utils/constant/constants.js';

class AuthService {
    async signUp({ userData }) {
        const existingUser = await User.findOne({ where: { email: userData.email } });

        if (existingUser) {
            throw new Error(messages.userAlreadyExists);
        }

        const password_hash = await bcrypt.hash(userData.password, 10);
        const user = await User.create({
            name: userData.name,
            email: userData.email,
            password_hash,
            role: userData.role,
        });

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
        };
    }

    async logIn({ email, password }) {
        const user = await User.findOne({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password_hash))) {
            throw new Error(messages.invalidEmailOrPassword);
        }

        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        };

        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: constants.token.expiresIn,
        });

        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt,
            },
            accessToken,
        };
    }
}

export default new AuthService();
