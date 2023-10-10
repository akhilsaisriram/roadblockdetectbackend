
const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const Registeruser = require('./model');
const app = express();
const mongoose = require('mongoose');

app.use(bodyParser.json());



const http = require("http");
app.use(cors());



mongoose.connect("mongodb+srv://test:test@cluster0.emrz8iy.mongodb.net/?retryWrites=true&w=majority",{
    useUnifiedTopology: true,
    useNewUrlParser: true,
 
}).then(
  result => {console.log('server connected with db')}
)
.catch(err => console.log(err));


app.post('/on',async(req, res)=>{
  console.log("jj")
  const {username,states} = req.body;
  Registeruser.findOneAndUpdate(
    { username: username },{states:"1"}
  )
  .then(() => {
    console.log('Message saved successfully!');
    res.status(200).send('Message saved successfully!');
  })
  .catch((err) => {
    console.error('Error saving message:', err);
    res.status(500).send('Error saving message');
  });
});


app.post('/off',async(req, res)=>{
  console.log("jj")
  const {username,states} = req.body;
  Registeruser.findOneAndUpdate(
    { username: username },{states:"0"}
  )
  .then(() => {
    console.log('Message saved successfully!');
    res.status(200).send('Message saved successfully!');
  })
  .catch((err) => {
    console.error('Error saving message:', err);
    res.status(500).send('Error saving message');
  });
});

app.get('/authstat',async(req, res)=>{
  //console.log("jj")
const id="642ad5e77021aba5291f3590";
  let exist = await Registeruser.findById(id);
  if(!exist){
      return res.status(400).send('User not found');
  }
 console.log(exist)
  res.json(exist);

});

const admin = require('firebase-admin');

const serviceAccount = require('./fcom');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://fcom-61798-default-rtdb.firebaseio.com'
});

app.get('/fcom',async(req, res)=>{
  //console.log("jj")
  const db = admin.database();
  const ref = db.ref('test/int');
  
  ref.once('value', (snapshot) => {
    const results = snapshot.val();
   // console.log(results);
    res.json(results);
  });

});








app.listen(5000, (err) => {
  if (err) throw err;
  console.log('okk')
});