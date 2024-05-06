'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');

function hashPassword(user, options) {
	if (!user.changed('password')) {
		return;
  }
  
	return bcrypt.hash(user.password, 12).then((hash) => {
    user.setDataValue('password', hash);
  });
}
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user.hasMany(models.todo, {foreignKey: 'user_id', sourceKey: 'user_id'});
    }
  }
  user.init({
    user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'user',
    hooks: {
			beforeCreate: hashPassword,
			beforeUpdate: hashPassword,
		},
  });

  user.prototype.comparePassword = function(password) {
		return bcrypt.compareSync(password, this.password);
	};

  return user;
};