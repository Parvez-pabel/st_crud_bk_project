const express = require('express');
const bodyParser = require('body-parser');
const {MongoClient} = require('mongodb');
const router = require('./routers/students');

const app = express();
const PORT = 5000;

const url = 'mongodb://localhost:27017/studentDB';
const dbName = "studentDB";

let db = null;

//connect to mongoDB

const connectToDB = async () => {
  const client =new MongoClient(url);
  await client.connect()
  db = client.db(dbName)
  console.log('connect to MongoDB');
  return db;
}
app.use(bodyParser.json());

connectToDB().then((database)=>{
  app.use((req, res, next)=>{
    req.db = database;
    next();

  })
  //routes
  app.use("/api", router);






}).catch((error)=>{
  console.error('Failed to connect to MongoDB', error);

})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

