const express = require("express");

const cors = require("cors");
require('dotenv').config();
 const app = express();
 app.use(express.json());
 app.use(cors())
 const rootRouter = require("./routes/index");
 app.use("/api/v1",rootRouter);

// Route to capture PayPal payment

 app.listen(3000);
 