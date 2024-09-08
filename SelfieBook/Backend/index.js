const cors = require("cors")
const express = require('express');
const connectDB = require('./db');

const app = express();
connectDB();
app.use(cors())
app.use(express.json());
const rootRouter = require('./routes/index');


app.use("/api/v1", rootRouter);



app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
