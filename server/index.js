import express from "express";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import cors from "cors";
import routes from "./routes/index.js";
import sequelize from "./models/index.js";
import errorsMiddlewares from "./middlewares/errorsMiddlewares.js";

dotenv.config();

const { PORT } = process.env;
const app = express();

app.use(fileUpload({}));
app.use(express.json());
app.use(cookieParser())
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL
}))
app.use(express.static('static'));

app.use('/api', routes)
app.use(errorsMiddlewares);


async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: false });

    app.listen(PORT, () => {
      console.log('\x1b[36m%s\x1b[0m', 'Listening on port: ' + PORT);
    });

    console.log('\x1b[36m%s\x1b[0m', 'Connection has been established successfully.');
  } catch (error) {
    console.log('\x1b[41m%s\x1b[0m', 'Unable to connect to the database:', error);
  }
}

start();
