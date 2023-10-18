const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const DataInsight = sequelize.define('DataInsight', {
    data_listing_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'data_listings',
            key: 'id'
        }
    },
    insight: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    date_generated: {
        type: DataTypes.DATE,
        defaultValue: sequelize.NOW
    }
});

module.exports = DataInsight;
