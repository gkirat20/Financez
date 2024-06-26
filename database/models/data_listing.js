module.exports = (sequelize, DataTypes) => {
    const DataListing = sequelize.define('DataListing', {
      account_id: {
          type: DataTypes.INTEGER,
          references: {
              model: 'accounts',
              key: 'id'
          }
      },
      title: {
          type: DataTypes.STRING(255),
          allowNull: false
      },
      description: DataTypes.TEXT,
      date_posted: {
          type: DataTypes.DATE,
          defaultValue: sequelize.NOW
      },
      price: DataTypes.DECIMAL(20,2),
      is_public: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
      }
    });
  
    // Add any association logic here
  
    return DataListing;
  };
  