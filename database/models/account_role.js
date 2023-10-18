const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const AccountRole = sequelize.define('AccountRole', {
    account_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'accounts',
            key: 'id'
        }
    },
    role_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'roles',
            key: 'id'
        }
    },
    date_assigned: {
        type: DataTypes.DATE,
        defaultValue: sequelize.NOW
    }
});

module.exports = AccountRole;
