module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('Role', {
      role_name: {
          type: DataTypes.STRING(50),
          allowNull: false,
          unique: true
      }
    });
  
    // Add any association logic here
  
    return Role;
  };
  