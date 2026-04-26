import dotenv from 'dotenv';
import express from 'express';

// Initialize environment variables
dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// The health check route for Render verification
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Content Broadcasting API is up and running!',
        timestamp: new Date().toISOString()
    });
});

// Set the port (Render uses the PORT environment variable)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});