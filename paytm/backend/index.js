const express = require("express");
const cors = require("cors")
const app = express();
app.use(express.json());
app.use(cors())
const rootRouter = require("./routes/index");


app.use("/api/v1", rootRouter);//all requests coming from v1 api go to rootRouter
app.listen(3000);