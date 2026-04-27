import express from 'express';
import authController from '../controllers/authController.js';
import auth from '../middlewares/authentication.js';
import authorizeRoles from '../middlewares/authorization.js';
import messages from '../utils/constant/message.js';
import Result from '../utils/constant/result.js';
import constants from '../utils/constant/constants.js';

const router = express.Router();

router.post('/signUp', async (req, res) => {
    const { name, email, password, role } = req.body;
    const data = await authController.signUp({ name, email, password, role });
    res.status(data.status).send(data);
});

router.post('/logIn', async (req, res) => {
    const { email, password } = req.body;
    const data = await authController.logIn({ email, password });
    res.status(data.status).send(data);
});

router.post('/logOut', auth, authorizeRoles(constants.roles.principal, constants.roles.teacher), async (req, res) => {
    const data = await authController.logOut();
    res.status(data.status).send(data);
});

router.get('/me', auth, authorizeRoles(constants.roles.principal, constants.roles.teacher), async (req, res) => {
    const result = new Result();
    result.status = constants.httpStatus.success;
    result.message = messages.authenticatedUserFetched;
    result.data = req.user;
    res.status(result.status).send(result);
});

export default router;
