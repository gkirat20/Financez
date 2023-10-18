const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const UserProfile = sequelize.define('UserProfile', {
    account_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'accounts',
            key: 'id'
        }
    },
    first_name: DataTypes.STRING(100),
    last_name: DataTypes.STRING(100),
    date_of_birth: DataTypes.DATE,
    country: DataTypes.STRING(100),
    phone: DataTypes.STRING(15),
    profile_image_url: DataTypes.TEXT,
    bio: DataTypes.TEXT
});

module.exports = UserProfile;
