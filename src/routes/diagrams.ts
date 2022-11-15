import * as express from "express";
const router = express.Router();
import Diagram from "../models/diagram";
const jwt = require("jsonwebtoken");

router.get('/', async (request, response) => {
    const token = request.headers["x-access-token"];
    try {
        const decoded = jwt.verify(token, "mySecretKey7654!!")
        const username = decoded.username;
        const data = await Diagram.find({ username: username });
        response.status(200).json(data)
    }
    catch {
        response.status(500).json({ error: "Could not fetch data" })
    }
});

router.get('/:id', async (request, response) => {
    try {
        const pickedDiagram = await Diagram.findById(request.params.id);
        if (pickedDiagram === null) {
            return response.status(404).json({ error: 'Could not find diagram' });
        }
        return response.status(200).json(pickedDiagram)
    }
    catch {
        return response.status(500).json({ error: 'Could not delete document' })
    }
})

router.post('/', async (request, response) => {
    const token = request.headers["x-access-token"];

    try {
        const decoded = jwt.verify(token, "mySecretKey7654!!")
        const username = decoded.username;

        const diagram = new Diagram({
            cells: request.body.cells,
            diagramName: request.body.diagramName,
            username: username
        });

        const result = await diagram.save();
        return response.status(201).json(result);
    }
    catch{
        return response.status(500).json({ error: "Could not create document" })
    }
})

router.delete('/:id', async (request, response) => {
        try {
            const pickedDiagram = await Diagram.findById(request.params.id);
            if (pickedDiagram === null) {
                return response.status(404).json({ error: 'Could not find diagram' });
            }
            pickedDiagram.remove();
        }
        catch {
            return response.status(500).json({ error: 'Could not delete document' })
        }
})

module.exports = router;
