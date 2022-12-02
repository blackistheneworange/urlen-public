const router = require("express").Router();
const redisClient = require("../utils/redisClient");

router.get("/:hashId",async (req,res)=>{
    try{
        
        const hashId = req.params.hashId

        if(!hashId){
            return res.status(400).send("Invalid Request")
        }

        const pattern = `${hashId}:*`
        const {value} = await redisClient.scanIterator({TYPE:'string', MATCH:pattern,COUNT:1}).next();

        if(value){
            const url = value.split(":-:")[1];
            res.redirect(301, url);
        }
        else{
            res.status(404).send("Not Found");
        }
    }
    catch(ex){
        res.status(500).send(ex);
    }
})

module.exports = router;