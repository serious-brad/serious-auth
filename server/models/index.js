import dotenv from "dotenv";
import Sequelize from "sequelize";
import config from "../config/config.js";

dotenv.config();

const env = process.env.NODE_ENV || 'development';
const configData = config[env];
const sequelize = new Sequelize(configData.database, configData.username, configData.password, configData);

export default sequelize;
