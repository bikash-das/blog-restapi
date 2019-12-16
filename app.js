const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyparser = require('body-parser');
const cors = require('cors');
require('dotenv/config'); // no need to assign to variable

//middleware : func that executes when routes are being hit, used for auth, etc
app.use(cors());
app.use(bodyparser.json());
// app.use('/posts', () => {
//     console.log('This is a middle ware running');
// });


const postRoute = require('./routes/posts');
const userRoute = require('./routes/user');

app.use('/user', userRoute);
app.use('/posts', postRoute);

//Routes
app.get('/', (req, res) => {
    res.send('<h1> This is Home Page </h1>');
});


// connect to db
// const MongoClient = require('mongodb').MongoClient;
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
  // perform actions on the collection object
//   console.log("Connected to db");
//   client.close();
// });
// start listening server
const uri = process.env.DB_CONNECTION;
mongoose.connect(uri, { useNewUrlParser: true}, () => {
    console.log('Remote DB connected');
});
app.listen(3000, () => {
    console.log('started server at 3000');
});