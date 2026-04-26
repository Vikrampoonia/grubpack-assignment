import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const ContentSlot = sequelize.define('ContentSlot', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    subject: { type: DataTypes.STRING(100), allowNull: false, unique: true }
}, {
    tableName: 'content_slots',
    timestamps: true,
    updatedAt: false,
    createdAt: 'created_at'
});