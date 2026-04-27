import multer from 'multer';
import path from 'path';
import fs from 'fs';
import constants from '../utils/constant/constants.js';
import messages from '../utils/constant/message.js';

const uploadDirectory = path.resolve('uploads');

if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirectory);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
    },
});

const upload = multer({
    storage,
    limits: {
        fileSize: constants.upload.maxFileSize,
    },
    fileFilter: (req, file, cb) => {
        if (!constants.upload.allowedMimeTypes.includes(file.mimetype)) {
            return cb(new Error(messages.invalidFileType));
        }

        return cb(null, true);
    },
});

export default upload;
