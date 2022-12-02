const express = require("express");
const path = require("path");
const { createClient:createRedisClient } = require("redis");

const {REDIS_URL} = require("./config");
const { generate: generateRandomCode } = require("./utils/LCGenerator");

const app = express();
const port = process.env.PORT || 3000;

const redisClient = createRedisClient({
    url:REDIS_URL
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

app.enable('trust proxy');
app.use(express.json());
app.use(express.urlencoded({extended:false}));

if(process.env.NODE_ENV !== "production"){
    const cors = require("cors");
    app.use(cors());
}

app.use(express.static(path.resolve(__dirname,'../','public')));

app.post("/api/v1/generate",async (req,res)=>{
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

});

app.get("/:hashId",async (req,res)=>{
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

app.listen(port, async ()=>{
    await redisClient.connect();
    console.log("App started on port "+port);
})