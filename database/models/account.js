const { DataTypes } = require('sequelize');
const sequelize = require('./index');  // Importing initialized sequelize instance

const Account = sequelize.define('Account', {
    // Columns definition
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    password_hash: {
        type: DataTypes.STRING(256),
        allowNull: false
    },
    date_created: {
        type: DataTypes.DATE,
        defaultValue: sequelize.NOW
    }
});

module.exports = Account;
