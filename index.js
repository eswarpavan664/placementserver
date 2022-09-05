const express = require('express');
 
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const cors = require("cors");
const mysql = require("mysql");
const {mogoUrl} = require('./keys');
mongoose.connect(mogoUrl)

require('./models');
const requireToken = require('./requireToken');
const requireTokenAdmin = require('./requireTokenAdmin');
const authRoutes = require('./authRoutes');
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(authRoutes)
mongoose.connect(mogoUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
mongoose.connection.on('connected',()=>{
    console.log("database connected ...")
})


mongoose.connection.on('error',(err)=>{
    console.log("error occered... ",err);
})


/*
const db = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"students"
})

app.get("/getvalues",(req,res)=>{
    const sq = "SELECT * FROM cse";
    db.query(sq,(error,result)=>{
        res.send(result);
    })
})

app.get("/add",(req,res)=>{
    const sqlinsert=
    "INSERT INTO cse (Name,Id,Branch,Year) VALUES ('Divyesh','19A21A0507','cse',3)";

    db.query(sqlinsert,(err,result)=>{

        console.log("err",error);
        console.log("result",result);
        res.send("hello express");
    })
    res.send("hello");
})

*/



app.get('/',requireToken,(req,res)=>{
    res.send(
        {
            email:req.user.email,
            Name:req.user.Name,
            RegId:req.user.RegId,
            Branch:req.user.Branch,
            Year:req.user.Year,
            Percentage:req.user.Percentage,
            PhoneNumber:req.user.PhoneNumber,
            Backlogs:req.user.Backlogs,
            CollegeId:req.user.collegeId
        })
})



app.get('/getadmindata',requireTokenAdmin,(req,res)=>{
    res.send(
        {
            email:req.user.email,
            Name:req.user.Name,
            PhoneNumber:req.user.PhoneNumber,
            Role:req.user.Role,
            CollegeId:req.user.collegeId
        })
})

app.listen(process.env.PORT || 5000,()=>{
    console.log("server is runnung on port 5000");
})