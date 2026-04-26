import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const Content = sequelize.define('Content', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    subject: { type: DataTypes.STRING(100), allowNull: false },
    file_url: { type: DataTypes.STRING, allowNull: false },
    file_type: { type: DataTypes.STRING(50), allowNull: false },
    file_size: { type: DataTypes.INTEGER, allowNull: false },
    status: {
        type: DataTypes.ENUM('uploaded', 'pending', 'approved', 'rejected'),
        defaultValue: 'pending'
    },
    rejection_reason: { type: DataTypes.TEXT },
    approved_at: { type: DataTypes.DATE }
    // Note: uploaded_by and approved_by foreign keys are handled in relationships
}, {
    tableName: 'content',
    timestamps: true,
    updatedAt: false,
    createdAt: 'created_at'
});