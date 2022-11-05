import * as express from "express";
const router = express.Router();
import User from "../models/user";
import { request } from "express";
import Diagram from "../models/diagram";

router.get('/', async (request, response) => {
    try {
        const data = await User.find();
        response.status(200).json(data)
    }
    catch {
        response.status(500).json({ error: "Could not fetch data" })
    }
});

router.post('/', async (request, response) => {
    const user = new User({
        username: request.body.username,
        email: request.body.email,
        password: request.body.password
    });
    try {
        const result = await user.save();
        return response.status(201).json(result);
    }
    catch{
        return response.status(500).json({ error: "Could not create user" })
    }
})

module.exports = router;
