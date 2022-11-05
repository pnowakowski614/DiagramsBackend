import * as express from "express";
const router = express.Router();
import Diagram from "../models/diagram";

router.get('/', async (request, response) => {
    try {
        const data = await Diagram.find();
        response.status(200).json(data)
    }
    catch {
        response.status(500).json({ error: "Could not fetch data" })
    }
});

router.post('/', async (request, response) => {
    const diagram = new Diagram({
        cells: request.body.cells,
        diagramName: request.body.diagramName
    });
    try {
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
            alert(request.params.message);
        }
        catch {
            return response.status(500).json({ error: 'Could not delete document' })
        }
})

module.exports = router;
