import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Sequelize with your Render/Neon connection string
export const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    logging: false // Set to console.log to see raw SQL queries during debugging
});

export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Sequelize successfully connected to PostgreSQL.');
    } catch (error) {
        console.error('❌ Unable to connect to the database:', error);
    }
};