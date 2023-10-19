module.exports = (sequelize, DataTypes) => {
    const AccountRole = sequelize.define('AccountRole', {
      account_id: {
          type: DataTypes.INTEGER,
          references: {
              model: 'accounts',
              key: 'id'
          }
      },
      role_id: {
          type: DataTypes.INTEGER,
          references: {
              model: 'roles',
              key: 'id'
          }
      },
      date_assigned: {
          type: DataTypes.DATE,
          defaultValue: sequelize.NOW
      }
    });
  
    // Add any association logic here
  
    return AccountRole;
  };
  