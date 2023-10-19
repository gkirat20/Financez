module.exports = (sequelize, DataTypes) => {
    const Account = sequelize.define('Account', {
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
  
    // Add any association logic here
  
    return Account;
  };
  
