const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Collaboration = sequelize.define('Collaboration', {
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    description: DataTypes.TEXT,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    leader_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'accounts',
            key: 'id'
        }
    }
});

module.exports = Collaboration;
