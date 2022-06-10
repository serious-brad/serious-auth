import { Model, DataTypes } from "sequelize";
import sequelize from "./index.js";

class Token extends Model { }

Token.init({
  userId: DataTypes.STRING,
  refreshToken: DataTypes.STRING
}, {
  sequelize,
  timestamps: false
});

export default Token;
