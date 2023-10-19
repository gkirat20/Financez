module.exports = (sequelize, DataTypes) => {
    const Notification = sequelize.define('Notification', {
      account_id: {
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
      is_read: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
      }
    });
  
    // Add any association logic here
  
    return Notification;
  };
  