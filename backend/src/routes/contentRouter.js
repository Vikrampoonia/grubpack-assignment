import express from 'express';
import contentController from '../controllers/contentController.js';
import auth from '../middlewares/authentication.js';
import authorizeRoles from '../middlewares/authorization.js';
import { publicLiveRateLimiter } from '../middlewares/rateLimiter.js';
import upload from '../middlewares/upload.js';
import constants from '../utils/constant/constants.js';
import Result from '../utils/constant/result.js';
import messages from '../utils/constant/message.js';

const router = express.Router();

const handleUpload = (req, res, next) => {
    upload.single('file')(req, res, (error) => {
        if (!error) {
            return next();
        }

        const result = new Result();
        result.status = constants.httpStatus.badRequest;
        result.message = error.code === 'LIMIT_FILE_SIZE' ? messages.fileTooLarge : error.message || messages.unableToUploadContent;
        return res.status(result.status).send(result);
    });
};

router.get('/live/:teacherId', publicLiveRateLimiter, async (req, res) => {
    const { subject } = req.query;
    const data = await contentController.getLiveContent({
        teacherId: req.params.teacherId,
        subject,
    });
    res.status(data.status).send(data);
});

router.post('/upload-content', auth, authorizeRoles(constants.roles.teacher), handleUpload, async (req, res) => {
    const { title, description, subject, startTime, endTime, rotationDuration } = req.body;
    const data = await contentController.uploadContent({
        teacherId: req.user.id,
        title,
        description,
        subject,
        startTime,
        endTime,
        rotationDuration,
        file: req.file,
    });
    res.status(data.status).send(data);
});

router.get('/list-content', auth, authorizeRoles(constants.roles.teacher, constants.roles.principal), async (req, res) => {
    const { status, subject, teacherId, page, limit } = req.query;
    const data = await contentController.getContents({
        teacherId: req.user.id,
        role: req.user.role,
        query: { status, subject, teacherId, page, limit },
    });
    res.status(data.status).send(data);
});

router.get('/content-detail/:contentId', auth, authorizeRoles(constants.roles.teacher, constants.roles.principal), async (req, res) => {
    const data = await contentController.getContentById({
        teacherId: req.user.id,
        role: req.user.role,
        contentId: req.params.contentId,
    });
    res.status(data.status).send(data);
});

router.put('/update-content/:contentId', auth, authorizeRoles(constants.roles.teacher), handleUpload, async (req, res) => {
    const { title, description, subject, startTime, endTime, rotationDuration } = req.body;
    const data = await contentController.updateContent({
        teacherId: req.user.id,
        contentId: req.params.contentId,
        title,
        description,
        subject,
        startTime,
        endTime,
        rotationDuration,
        file: req.file,
    });
    res.status(data.status).send(data);
});

router.delete('/get-content/:contentId', auth, authorizeRoles(constants.roles.teacher), async (req, res) => {
    const data = await contentController.deleteContent({
        teacherId: req.user.id,
        contentId: req.params.contentId,
    });
    res.status(data.status).send(data);
});

router.get('/content-summary', auth, authorizeRoles(constants.roles.teacher, constants.roles.principal), async (req, res) => {
    const data = await contentController.getContentSummary({
        teacherId: req.user.id,
        role: req.user.role,
    });
    res.status(data.status).send(data);
});

router.get('/pending-content', auth, authorizeRoles(constants.roles.principal), async (req, res) => {
    const { subject, teacherId, page, limit } = req.query;
    const data = await contentController.getPendingContents({
        teacherId: req.user.id,
        role: req.user.role,
        query: { subject, teacherId, page, limit },
    });
    res.status(data.status).send(data);
});

router.patch('/update-content-status/:contentId', auth, authorizeRoles(constants.roles.principal), async (req, res) => {
    const { status, rejectionReason } = req.body;
    const data = await contentController.updateContentStatus({
        contentId: req.params.contentId,
        principalId: req.user.id,
        status,
        rejectionReason,
    });
    res.status(data.status).send(data);
});

router.patch('/get-content/:contentId/resubmit', auth, authorizeRoles(constants.roles.teacher), async (req, res) => {
    const data = await contentController.resubmitContent({
        teacherId: req.user.id,
        contentId: req.params.contentId,
    });
    res.status(data.status).send(data);
});

export default router;
