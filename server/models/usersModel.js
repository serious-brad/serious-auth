import { Model, DataTypes } from "sequelize";
import sequelize from "./index.js";
import Token from "./tokenModel.js";

export class Users extends Model { }

Users.init({
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  activationLink: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isActivated: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  avatar: DataTypes.STRING
}, {
  sequelize,
  modelName: 'Users',
  timestamps: false
});

Users.hasOne(Token, {
  foreignKey: {
    name: 'userId',
    allowNull: false
  }
});

export default Users;
