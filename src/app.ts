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

// app.get('/diagramList', async (request, response) => {
//     try {
//         const data = await db.collection('diagramList').find().toArray()
//         response.status(200).json(data)
//     }
//     catch {
//         response.status(500).json({error: "Could not fetch data"})
//     }
// });
//
// app.post('/diagramList', async (request, response) => {
//     const diagram = request.body;
//     try {
//         const result = await db.collection('diagramList').insertOne(diagram);
//         response.status(201).json(result);
//     }
//     catch{
//         response.status(500).json({error: "Could not create document"})
//     }
// })
//
// app.delete('/diagramList/:id', async (request, response) => {
//     if (ObjectId.isValid(request.params.id)) {
//         try {
//             const result = await db.collection('diagramList').deleteOne({ _id: new ObjectId(request.params.id) })
//             response.status(200).json(result);
//         }
//         catch {
//             response.status(500).json({error: 'Could not delete document'})
//         }
//     } else {
//         response.status(500).json({error: 'Could not delete document'})
//     }
// })

app.post('/users', async (request, response) => {
    const user = request.body;
    try {
        // const result = await db.collection('diagramList').insertOne(diagram);
        // response.status(201).json(result);
        console.log(user)
    }
    catch{
        // response.status(500).json({error: "Could not create document"})
        console.log("Error")
    }
})
