const Account = require('../models/account');
const Transaction = require('../models/transaction');
const UserProfile = require('../models/user_profile');
const Role = require('../models/role');
const AccountRole = require('../models/account_role');
const DataListing = require('../models/data_listing');
const Collaboration = require('../models/collaboration');
const CollaborationMember = require('../models/collaboration_member');
const Notification = require('../models/notification');
const AuditLog = require('../models/audit_log');
const DataInsight = require('../models/data_insight');
const Feedback = require('../models/feedback');

// Relationship between Account and Transaction (One-to-Many)
Account.hasMany(Transaction, {
    foreignKey: 'account_id'
});
Transaction.belongsTo(Account, {
    foreignKey: 'account_id'
});

// Relationship between Account and UserProfile (One-to-One)
Account.hasOne(UserProfile, {
    foreignKey: 'account_id'
});
UserProfile.belongsTo(Account, {
    foreignKey: 'account_id'
});

// Relationships for Roles and AccountRoles (Many-to-Many)
Account.belongsToMany(Role, {
    through: AccountRole,
    foreignKey: 'account_id'
});
Role.belongsToMany(Account, {
    through: AccountRole,
    foreignKey: 'role_id'
});

// Relationship between Account and DataListing (One-to-Many)
Account.hasMany(DataListing, {
    foreignKey: 'account_id'
});
DataListing.belongsTo(Account, {
    foreignKey: 'account_id'
});

// Relationship between Account and Collaboration (One-to-Many for leader)
Account.hasMany(Collaboration, {
    foreignKey: 'leader_id'
});
Collaboration.belongsTo(Account, {
    foreignKey: 'leader_id'
});

// Relationships for Collaboration and CollaborationMember (Many-to-Many)
Account.belongsToMany(Collaboration, {
    through: CollaborationMember,
    foreignKey: 'account_id'
});
Collaboration.belongsToMany(Account, {
    through: CollaborationMember,
    foreignKey: 'collaboration_id'
});

// Relationship between Account and Notification (One-to-Many)
Account.hasMany(Notification, {
    foreignKey: 'account_id'
});
Notification.belongsTo(Account, {
    foreignKey: 'account_id'
});

// Relationship between Account and AuditLog (One-to-Many)
Account.hasMany(AuditLog, {
    foreignKey: 'account_id'
});
AuditLog.belongsTo(Account, {
    foreignKey: 'account_id'
});

// Relationship between DataListing and DataInsight (One-to-Many)
DataListing.hasMany(DataInsight, {
    foreignKey: 'data_listing_id'
});
DataInsight.belongsTo(DataListing, {
    foreignKey: 'data_listing_id'
});

// Relationships for Feedback (Many-to-Many but via two fields: sender and receiver)
Account.hasMany(Feedback, {
    as: 'SentFeedbacks',
    foreignKey: 'sender_id'
});
Account.hasMany(Feedback, {
    as: 'ReceivedFeedbacks',
    foreignKey: 'receiver_id'
});
Feedback.belongsTo(Account, {
    as: 'Sender',
    foreignKey: 'sender_id'
});
Feedback.belongsTo(Account, {
    as: 'Receiver',
    foreignKey: 'receiver_id'
});

module.exports = {
    Account,
    Transaction,
    UserProfile,
    Role,
    AccountRole,
    DataListing,
    Collaboration,
    CollaborationMember,
    Notification,
    AuditLog,
    DataInsight,
    Feedback
};