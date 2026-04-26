import { User } from './user.js';
import { Content } from './content.js';
import { ContentSlot } from './contentSlot.js';
import { ContentSchedule } from './contentSchedule.js';

// 1. User <-> Content Relationships
User.hasMany(Content, { foreignKey: 'uploaded_by', as: 'uploads' });
Content.belongsTo(User, { foreignKey: 'uploaded_by', as: 'uploader' });

User.hasMany(Content, { foreignKey: 'approved_by', as: 'approvals' });
Content.belongsTo(User, { foreignKey: 'approved_by', as: 'approver' });

// 2. Content <-> Schedule Relationships
Content.hasMany(ContentSchedule, { foreignKey: 'content_id', onDelete: 'CASCADE' });
ContentSchedule.belongsTo(Content, { foreignKey: 'content_id' });

// 3. ContentSlot <-> Schedule Relationships
ContentSlot.hasMany(ContentSchedule, { foreignKey: 'slot_id', onDelete: 'CASCADE' });
ContentSchedule.belongsTo(ContentSlot, { foreignKey: 'slot_id' });

// Export all models from this single file
export { User, Content, ContentSlot, ContentSchedule };