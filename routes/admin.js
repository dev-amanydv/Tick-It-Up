const {Router} = require('express');
const adminMiddleware = require('../middleware/admin')
const { JWT_SECRET } = require('../config/config')
const jwt = require('jsonwebtoken')
const router = Router();
const { Admin, User, Todos} = require('../db')

router.post('/signup',async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const userExists = await Admin.findOne({
        username,
        password
    })
    if ( userExists){
        res.status(403).json({
            msg: "Admin already exists"
        })
    } else {
        const createUser = await Admin.create({
            username,
            password
        })
        res.json({
            msg:"Admin created successfully"
        })
    }
    
})

router.post('/signin', async (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    const userExists =await Admin.findOne({
        username,
        password
    })
    if (userExists){
        const token = jwt.sign({
            username
        }, JWT_SECRET);
        res.json({
            token
        })
    } else {
        res.status(411).json({
            msg: "Incorrect email and password"
        })
    }
})

module.exports = router