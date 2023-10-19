module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define('Transaction', {
      account_id: {
          type: DataTypes.INTEGER,
          references: {
              model: 'accounts',
              key: 'id'
          }
      },
      amount: {
          type: DataTypes.DECIMAL(20,2),
          allowNull: false
      },
      transaction_date: {
          type: DataTypes.DATE,
          defaultValue: sequelize.NOW
      },
      description: {
          type: DataTypes.TEXT
      }
    });
  
    // Add any association logic here
  
    return Transaction;
  };
  