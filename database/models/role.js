const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Role = sequelize.define('Role', {
    role_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    }
});

module.exports = Role;
