import dotenv from 'dotenv';
import express from 'express';
import { connectDB, sequelize } from './config/db.js';
import './models/index.js';
import authRoutes from './routes/authRouter.js';
import contentRoutes from './routes/contentRouter.js';
import Result from './utils/constant/result.js';
import messages from './utils/constant/message.js';
import constants from './utils/constant/constants.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);

app.get('/health', (req, res) => {
    const result = new Result();
    result.status = constants.httpStatus.success;
    result.message = messages.apiRunning;
    return res.status(result.status).send(result);
});

app.get('/check-tables', async (req, res) => {
    try {
        const [results] = await sequelize.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public';
        `);
        const result = new Result();
        result.status = constants.httpStatus.success;
        result.message = messages.success;
        result.data = { tables: results };
        return res.status(result.status).send(result);
    } catch (error) {
        const result = new Result();
        result.status = constants.httpStatus.serverError;
        result.message = error.message || messages.internalServerError;
        return res.status(result.status).send(result);
    }
});

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    // 1. Connect to DB
    await connectDB();

    await sequelize.sync({ alter: true });
    console.log('✅ All models were synchronized successfully.');

    // 3. Start Express
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();