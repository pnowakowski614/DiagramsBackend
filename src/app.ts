import * as express from 'express';
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import "dotenv/config";

const app = express();
const cors = require("cors");
const diagramListRouter = require("./routes/diagrams");
const usersRouter = require("./routes/users")

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("ok"));

app.use('/diagrams', diagramListRouter);
app.use('/users', usersRouter);

app.listen(process.env.PORT, console.log(process.env.PORT));
