'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'Password is required',
        },
        len: {
          args: [8, 100], // Password length should be between 8 and 100 characters
          msg: 'Password must be between 8 and 100 characters long',
        },
        is: {
          args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/, // (?=.*) this means atleast one character is, ?= is positive lookahead
          msg: 'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character',
        },
        notContains: {
          args: ' ',
          msg: 'Password cannot contain spaces',
        },

      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};