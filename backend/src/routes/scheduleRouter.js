import express from 'express';
import scheduleController from '../controllers/scheduleController.js';
import auth from '../middlewares/authentication.js';
import authorizeRoles from '../middlewares/authorization.js';
import constants from '../utils/constant/constants.js';

const router = express.Router();

router.post('/create-schedule', auth, authorizeRoles(constants.roles.principal), async (req, res) => {
    const { contentId, slotId, rotationOrder, duration } = req.body;
    const data = await scheduleController.createSchedule({ contentId, slotId, rotationOrder, duration });
    res.status(data.status).send(data);
});

router.get('/list-schedule', auth, authorizeRoles(constants.roles.principal), async (req, res) => {
    const { slotId, subject, contentId } = req.query;
    const data = await scheduleController.getSchedules({ query: { slotId, subject, contentId } });
    res.status(data.status).send(data);
});

router.get('/schedule-detail/:scheduleId', auth, authorizeRoles(constants.roles.principal), async (req, res) => {
    const data = await scheduleController.getScheduleById({ scheduleId: req.params.scheduleId });
    res.status(data.status).send(data);
});

router.put('/update-schedule/:scheduleId', auth, authorizeRoles(constants.roles.principal), async (req, res) => {
    const { slotId, rotationOrder, duration } = req.body;
    const data = await scheduleController.updateSchedule({ scheduleId: req.params.scheduleId, slotId, rotationOrder, duration });
    res.status(data.status).send(data);
});

router.delete('/delete-schedule/:scheduleId', auth, authorizeRoles(constants.roles.principal), async (req, res) => {
    const data = await scheduleController.deleteSchedule({ scheduleId: req.params.scheduleId });
    res.status(data.status).send(data);
});

export default router;
