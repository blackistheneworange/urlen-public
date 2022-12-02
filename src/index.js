const express = require("express");
const path = require("path");
const cors = require("cors");

const redisClient = require("./utils/redisClient");
const apiIndex = require("./api");
const apiV1 = require("./api/v1");

const app = express();
const appName = "URLen";
const port = process.env.PORT || 3000;
const corsOptions = {
    methods: ["GET","POST"]
}

app.enable('trust proxy');
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(path.resolve(__dirname,'../','public')));

app.use("/api/v1", cors(corsOptions), apiV1);
app.use("/", cors(corsOptions), apiIndex);

app.listen(port, async ()=>{
    await redisClient.connect();
    console.log(`App ${appName} started on port ${port}`);
})