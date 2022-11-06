import * as express from "express";
const router = express.Router();
import User from "../models/user";

router.get('/', async (request, response) => {
    try {
        const data = await User.find();
        response.status(200).json(data)
    }
    catch {
        response.status(500).json({ error: "Could not fetch data" })
    }
});

router.post('/login', async (request, response) => {
    const user = await User.findOne({
        username: request.body.username,
        password: request.body.password
    })

    if (!user) {
        return response.json({ status: 'error', user: false })
    }
    else {
        return response.json({ status: 'ok', user: true})
    }
})

router.post('/register', async (request, response) => {
    try {
        await User.create({
            username: request.body.username,
            email: request.body.email,
            password: request.body.password,
        })
        response.json({ status: 'ok' })
    } catch (err) {
        console.log(err);
        response.json({ status: 'error', error: 'Duplicate email!' })
    }
})

module.exports = router;
