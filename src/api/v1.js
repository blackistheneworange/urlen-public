const router = require("express").Router();
const { generate: generateRandomCode } = require("../utils/LCGenerator");
const redisClient = require("../utils/redisClient");

router.post("/generate",async (req,res)=>{
    const url = req.body.url;

    if(!url || !(/http[s]?:\/\//).test(url)){
        return res.status(400).send("Invalid URL")
    }

    let hashId = generateRandomCode(6);
    const pattern=`*:-:${url}`;
    const {value} = await redisClient.scanIterator({TYPE:'string', MATCH:pattern,COUNT:1}).next();

    if(!value){
        const key = `${hashId}:-:${url}`
        await redisClient.set(key,"true");
    }
    else{
        hashId = value.split(":-:")[0];
    }

    let host = req.get('host');
    if(host && host.startsWith("www.")){
        host = host.slice(4,host.length)
    }
    const shortUrl=`${req.protocol}://${host}/${hashId}`;

    res.send({
        url,
        shortUrl
    })

})

module.exports = router;