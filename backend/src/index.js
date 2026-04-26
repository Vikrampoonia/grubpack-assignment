import dotenv from 'dotenv';
import express from 'express';
import { connectDB, sequelize } from './config/db.js';
import './models/User.js';

dotenv.config();

const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'success', message: 'API is running' });
});

app.get('/check-tables', async (req, res) => {
    try {
        const [results] = await sequelize.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public';
        `);
        res.status(200).json({ tables: results });
    } catch (error) {
        res.status(500).json({ error: error.message });
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