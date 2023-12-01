module.exports = (sequelize, DataTypes) => {
    const Auction = sequelize.define('Auction', {
        dataId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        startPrice: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        endTime: {
            type: DataTypes.DATE,
            allowNull: false
        },
        highestBidder: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        highestBid: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        // Additional fields as needed
    });

    return Auction;
};
