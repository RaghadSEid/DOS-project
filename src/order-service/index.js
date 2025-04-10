
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');
const axios = require("axios")
const cors = require("cors");
const app = express();
const port = 3006;
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.post("/purch",async (req,res)=>{

  const order = {
    "id":req.body.id,
    "orderCost":req.body.orderCost
  };
  try{
    const response = await axios.post(`http://catalog-server:3005/order`,order);
    console.log(response.data)
    
      res.send({ message:"The request has been sent successfully ^_^"})
  } catch(err){
    console.log(err)
    res.status(400).send({error:err})
  }
})

app.get("/test",(req,res)=>{
    res.send({ Message:"Arrived successfully ^_^"})
})

app.listen(port, () => {
  console.log(`localhost is :${port}`);
});



