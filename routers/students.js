const express = require('express');
const { ObjectId } = require('mongodb');

const router = express.Router();

//controllers
//Create

router.post('/create',async (req, res) => {
    const db = req.db;
    const reqBody = req.body;
    try {
      const result= await db.collection("students").insertOne(reqBody)
      res.status(200).json(result);
      
    } catch (error) {

      res.status(500).json({ message: error.message });
      
    }
});

//all Read- get

router.get('/read',async (req, res) => {
  const db = req.db;

  try {
    const result= await db.collection("students").find().toArray();
    res.status(200).json(result);
    
  } catch (error) {

    res.status(500).json({ message: error.message });
    
  }

    //code to read a student record
});

//Read- get by id

router.get('/read-one/:id', async (req, res) => {

  const db = req.db;
  const id = req.params.id;

  try {
    const result = await db.collection("students").findOne({_id:new ObjectId(id)})
    res.status(200).json(result);

    

  } catch (error) {
    
    res.status(500).json({ message: error.message });
  }
  
  

});



//Update

router.post('/update/:id', async (req, res) => {

  const db = req.db;
  const id = req.params.id;
  const reqBody = req.body;

  try {
    const result = await db.collection("students").updateOne({_id: new ObjectId(id)},
    {$set:req.body}
  )
  res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
    
  }

  
  
 });

//Delete

router.delete('/delete/:id',async (req, res) => {
    const db = req.db;
    const id = req.params.id;

    try {
      const result = await db.collection("students").deleteOne({_id: new ObjectId(id)})
      res.status(200).json(result);
      
    } catch (error) {
      
      res.status(500).json({ message: error.message });
      
    }
});

//All delete

router.delete('/delete-all',async (req, res) => {
    const db = req.db;

    try {
      const result = await db.collection("students").deleteMany({})
      res.status(200).json(result);
      
    } catch (error) {
      
      res.status(500).json({ message: error.message });
      
    }
});

module.exports = router;




























module.exports=router;