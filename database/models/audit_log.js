const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const AuditLog = sequelize.define('AuditLog', {
    account_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'accounts',
            key: 'id'
        }
    },
    activity: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    date_logged: {
        type: DataTypes.DATE,
        defaultValue: sequelize.NOW
    }
});

module.exports = AuditLog;
