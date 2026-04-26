import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const ContentSchedule = sequelize.define('ContentSchedule', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    rotation_order: { type: DataTypes.INTEGER },
    duration: { type: DataTypes.INTEGER, allowNull: false } // in minutes
    // Note: content_id and slot_id foreign keys are handled in relationships
}, {
    tableName: 'content_schedule',
    timestamps: true,
    updatedAt: false,
    createdAt: 'created_at'
});