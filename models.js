const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')


const Demo = new mongoose.Schema({
    lists:{
        type:[String]
    }

})


const userSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    Name:{
        type:String,
        required:true
    },
    Branch:{
        type:String,
        required:true
    },
     Year:{
        type:String,
        required:true
    },
    PhoneNumber:{
        type:String,
        required:true
    },

     Percentage:{
        type:String,
        required:true
    },
    Backlogs:{
        type:String,
        required:true
    },
    RegId:{
        type:String,
        required:true
    },
     collegeId:{
        type:String,
        required:true
    },
    Files:{
        type:[Object]
    }

})



const AdminuserSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    Name:{
        type:String,
        required:true
    },
    PhoneNumber:{
        type:String,
        required:true
    },
     collegeId:{
        type:String,
        required:true
    },
    Role:{
        type:String,
        required:true
    },

})



const  PostSchema = new mongoose.Schema({
    collegeId:{
        type:String,
        required:true
    },
    ApplyLink:{
        type:String,
        required:true
    },
    lastDate:{
        type:String,
        required:true
    },
  
    Salary:{
        type:String,
        required:true
    },
  
    Logo:{
        type:String,
        required:true
    },
    CompanyName:{
        type:String,
        required:true
    },
     PostedDate:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true

    },
    PostId:{
        type:String,
        required:true

    },
  

})

 


const  ApplySchema = new mongoose.Schema({
    Id:{
        type:String,
        required:true
    },
    Name:{
        type:String,
        required:true
    },
    Branch:{
        type:String,
        required:true
    },
    PhoneNumber:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    CollegeId:{
        type:String,
        required:true
    },
    CompanyName:{
        type:String,
        required:true
    },
    LastDate:{
        type:String,
        required:true
    },
    AppliedDate:{
        type:String,
        required:true
    },
    PostedDate:{
        type:String,
        required:true
    },
    PostId:{
        type:String,
        required:true

    },
    StudentResume:{
        type:String,
        
    }
})

userSchema.pre('save',function(next){
    const user = this;
    if(!user.isModified('password')){
        return next()
    }
    bcrypt.genSalt(10,(err,salt)=>{
        if(err){
            return next(err)
        }
     bcrypt.hash(user.password,salt,(err,hash)=>{
         if(err){
             return next(err)
         }
         user.password = hash;
         next()
     })

    })

})


AdminuserSchema.pre('save',function(next){
    const user = this;
    if(!user.isModified('password')){
        return next()
    }
    bcrypt.genSalt(10,(err,salt)=>{
        if(err){
            return next(err)
        }
     bcrypt.hash(user.password,salt,(err,hash)=>{
         if(err){
             return next(err)
         }
         user.password = hash;
         next()
     })

    })

})

userSchema.methods.comparePassword = function(candidatePassword) {
    const user = this;
    return new Promise((resolve,reject)=>{
        bcrypt.compare(candidatePassword,user.password,(err,isMatch)=>{
            if(err){
                return reject(err)
            }
            if (!isMatch){
                return reject(err)
            }
            resolve(true)
        })
    })

}



 AdminuserSchema.methods.comparePassword = function(candidatePassword) {
    const user = this;
    return new Promise((resolve,reject)=>{
        bcrypt.compare(candidatePassword,user.password,(err,isMatch)=>{
            if(err){
                return reject(err)
            }
            if (!isMatch){
                return reject(err)
            }
            resolve(true)
        })
    })

}


mongoose.model('User',userSchema);
mongoose.model('Posts',PostSchema);
mongoose.model('Apply',ApplySchema);
mongoose.model('AdminUser',AdminuserSchema);
mongoose.model('Demo',Demo);