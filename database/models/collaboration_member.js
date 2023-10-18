const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const CollaborationMember = sequelize.define('CollaborationMember', {
    collaboration_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'collaborations',
            key: 'id'
        }
    },
    account_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'accounts',
            key: 'id'
        }
    },
    joined_date: {
        type: DataTypes.DATE,
        defaultValue: sequelize.NOW
    }
});

module.exports = CollaborationMember;
