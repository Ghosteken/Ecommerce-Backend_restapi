const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require ("body-parser");
const mongoose = require('mongoose');
const Customer = require('./models/Customer');
const UseRoutes = require('./routes/user');






const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());


app.get("/", (req, res) => {
  res.send("Wish to wear");
});

app.get("/noobs", (req, res) => {
  res.send("Noobs");
});

app.use('/api/v1/user', UseRoutes);


const connectDB = require('./config/db');
dotenv.config({path:'./config/config.env'});

connectDB();

//routes
app.use('/', require('./routes/user'));



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
