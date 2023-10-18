const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Feedback = sequelize.define('Feedback', {
    sender_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'accounts',
            key: 'id'
        }
    },
    receiver_id: {
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
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    }
});

module.exports = Feedback;
