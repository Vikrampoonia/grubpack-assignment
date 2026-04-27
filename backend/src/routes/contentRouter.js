import express from 'express';
import contentController from '../controllers/contentController.js';
import auth from '../middlewares/authentication.js';
import authorizeRoles from '../middlewares/authorization.js';
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

router.get('/get-content', auth, authorizeRoles(constants.roles.teacher), async (req, res) => {
    const data = await contentController.getContents({
        teacherId: req.user.id,
        query: req.query,
    });
    res.status(data.status).send(data);
});

router.get('/get-content/:contentId', auth, authorizeRoles(constants.roles.teacher), async (req, res) => {
    const data = await contentController.getContentById({
        teacherId: req.user.id,
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

router.get('/my-summary', auth, authorizeRoles(constants.roles.teacher), async (req, res) => {
    const data = await contentController.getContentSummary({
        teacherId: req.user.id,
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
