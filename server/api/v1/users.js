const usersRouter = require('express').Router();

const User = require('../../models/user')

usersRouter
.post('/', async (req, res) => {
    try{
        const body = req.body
        if (!body) {
            return res.status(400).json({
                success: false,
                error: 'You must provide a user',
            })
        }
        console.log(body);
        const user = await new User(body)
        console.log("____", user);
        const saved = await user.save()
        res.json(saved)
    } catch(err){
        res.status(400).json({
            error: 'error occured on creating user'
        })
        console.log(error);
    }

})

module.exports = usersRouter;
