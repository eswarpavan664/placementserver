const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const {jwtkey} = require('./keys');
const { ORDER } = require('mysql/lib/PoolSelector');
const router = express.Router();
const User = mongoose.model('User');

const  post = mongoose.model('Posts');

const  Apply = mongoose.model('Apply');

const AdminUser = mongoose.model('AdminUser');
const demo = mongoose.model('Demo');

router.post('/signup',async (req,res)=>{
   
    const {email,password,Name,Branch,Year,PhoneNumber,Percentage,Backlogs,RegId,collegeId} = req.body;

    try{
      const user = new User({email,password,Name,Branch,Year,PhoneNumber,Percentage,Backlogs,RegId,collegeId});
      await  user.save();
      const token = jwt.sign({userId:user._id},jwtkey)
      res.send({token})

    }catch(err){
      return res.status(422).send(err.message)
    }
    
    
})

router.post('/signin',async (req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        return res.status(422).send({error :"must provide email or password"})
    }
    const user = await User.findOne({email})
    if(!user){
        return res.status(422).send({error :"must provide email or password"})
    }
    try{
      await user.comparePassword(password);    
      const token = jwt.sign({userId:user._id},jwtkey)
      res.send({token})
    }catch(err){
        return res.status(422).send({error :"must provide email or password"})
    }
    


})




router.post('/Adminsignup',async (req,res)=>{
   
  const {email,password,PhoneNumber,collegeId,Name,Role} = req.body;

  try{
    const user = new AdminUser({email,password,PhoneNumber,collegeId,Name,Role});
    await  user.save();
    const token = jwt.sign({userId:user._id},jwtkey)
    res.send({token})

  }catch(err){
    return res.status(422).send(err.message)
  }
  
  
})

router.post('/Adminsignin',async (req,res)=>{
  const {email,password} = req.body
  if(!email || !password){
      return res.status(422).send({error :"must provide email or password"})
  }
  const user = await AdminUser.findOne({email})
  if(!user){
      return res.status(422).send({error :"must provide email or password"})
  }
  try{
    await user.comparePassword(password);    
    const token = jwt.sign({userId:user._id},jwtkey)
    res.send({token})
  }catch(err){
      return res.status(422).send({error :"must provide email or password"})
  }
  


})




router.post('/AddJobPost',async (req,res)=>{
   
  const {CompanyName,Logo,Salary,lastDate,ApplyLink,collegeId,PostedDate,Description,PostId} = req.body;

  try{
    const Add = new post({CompanyName,Logo,Salary,lastDate,ApplyLink,collegeId,PostedDate,Description,PostId});
    await  Add.save().then(()=>    res.send("uploaded successfully"));
  }catch(err){
    return res.status(422).send(err.message)
  }
  
  
})


router.get('/getposts', function(req, res, next) {
 
const id =  req.query.id;
 

     
  post.find({collegeId:id},(err, docs) => {
    
      if (!err) {
           res.send(docs);
           console.log("hiii",id);
      } else {
          console.log('Failed to retrieve the Course List: ' + err);
      }
  });

});



router.get('/deletepost', function(req, res, next) {
  const id =  req.query.id;
  post.deleteOne({_id:id},(err, docs) => {
      if (!err) {
           res.send(docs);
      } else {
          console.log('Failed to retrieve the Course List: ' + err);
      }
  });

});



router.get('/getapplys', function(req, res, next) {
  const id =  req.query.id;
  Apply.find({CollegeId:id},(err, docs) => {
      if (!err) {
           res.send(docs);
      } else {
          console.log('Failed to retrieve the Course List: ' + err);
      }
  });

});



router.get('/getuserapplys', function(req, res, next) {
  const id =  req.query.id;
  Apply.find({email:id},(err, docs) => {
      if (!err) {
           res.send(docs);
      } else {
          console.log('Failed to retrieve the Course List: ' + err);
      }
  });

});



router.get('/deleteApplication', function(req, res, next) {
  const id =  req.query.id;
  
  Apply.deleteOne({_id:id},(err, docs) => {
      if (!err) {
          console.log("Deleted")
      } else {
          console.log('Failed to retrieve the Course List: ' + err);
      }
  });

});


router.post('/ApplyForJob',async (req,res)=>{
   
  const {Name,Id,Branch,PhoneNumber,CollegeId,email,CompanyName,LastDate,AppliedDate,PostedDate,PostId} = req.body;

  try{
    const  apply  = new Apply({Name,Id,Branch,PhoneNumber,email,CollegeId,CompanyName,LastDate,AppliedDate,PostedDate,PostId});
    await  apply.save().then(()=>   console.log("Uploaded"));
  }catch(err){
    return res.status(422).send(err.message)
  }
})








router.get('/getlist', function(req, res, next) {
  const id =  req.query.id;
  demo.find((err, docs) => {
      if (!err) {
           res.send(docs);
           console.log(docs);
      } else {
          console.log('Failed to retrieve the Course List: ' + err);
      }
  });

});



router.post('/addlist',async (req,res)=>{
   
  const {lists} = req.body;

  try{
    const dem = new demo({lists});
    await  dem.save().then(()=>    res.send("uploaded successfully"));
  }catch(err){
    return res.status(422).send(err.message)
  }
  
  
})


module.exports = router