import * as express from "express";
const router = express.Router();
import User from "../models/user";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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
    try {
        const user = await User.findOne({
            username: request.body.username
        })

        if(!user) {
            console.log("no user")
            return response.status(500).json({status: 'error', user: false})
        }

        const isPasswordValid = await bcrypt.compare(request.body.password, user.password);
        console.log(isPasswordValid);

        if (isPasswordValid) {
            const token = jwt.sign({
                username: user.username,
                email: user.email
            }, "mySecretKey7654!!")
            return response.status(200).json({status: 'ok', user: token, username: user.username})
        } else {
            return response.status(500).json({status: 'error', user: false})
        }
    } catch {
            return response.status(500).json({status: 'error', user: false})
        }
})

router.post('/register', async (request, response) => {
    try {
        const newPassword = await bcrypt.hash(request.body.password, 10);
        const user = await User.create({
            username: request.body.username,
            email: request.body.email,
            password: newPassword,
        })
        const token = jwt.sign({
            username: user.username,
            email: user.email
        }, "mySecretKey7654!!")
        response.json({ status: 'ok', user: token })
    } catch (err) {
        response.json({ status: 'error', error: 'Duplicate email or username!' })
    }
})

module.exports = router;
