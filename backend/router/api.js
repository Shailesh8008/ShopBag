const apiRouter = require("express").Router();

apiRouter.get("/",(req,res)=>{
    res.send("path '/' called.")
})

module.exports = apiRouter;