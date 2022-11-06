import * as mongoose from "mongoose";

const diagramSchema = new mongoose.Schema({
    cells: Array,
    diagramName: String,
    username: String
}, {
    collection: "diagrams"
})

const diagramModel = mongoose.model('diagram', diagramSchema);
export default diagramModel;


