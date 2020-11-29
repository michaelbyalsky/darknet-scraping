const pastesRouter = require('express').Router();

const Paste = require('../../models/paste')

pastesRouter
.post('/', async (req, res) => {
    try{
        const body = req.body
        if (!body) {
            return res.status(400).json({
                success: false,
                error: 'You must provide a Paste',
            })
        }
        console.log(body);
        const paste = await new Paste(body)
        const saved = await paste.save()
        res.json(saved)
    } catch(err){
        res.status(400).json({
            error: 'error occured on creating user'
        })
        console.log(error);
    }

})

module.exports = pastesRouter;
