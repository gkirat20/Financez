const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Notification = sequelize.define('Notification', {
    account_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'accounts',
            key: 'id'
        }
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    date_sent: {
        type: DataTypes.DATE,
        defaultValue: sequelize.NOW
    },
    is_read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

module.exports = Notification;
