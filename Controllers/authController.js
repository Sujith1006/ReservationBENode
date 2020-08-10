let users = require("../models/user");
let validate=require('../middleware/validateEmail')
let bcrypt=require('bcrypt')
let jwt=require('jsonwebtoken')
class AuthController {
  constructor() {}
  signup(credentials) {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(credentials)
        let { email ,password} = credentials;
        const emailErr = validate.validateEmail(email)
        if(!emailErr.isValid){
            reject("Enter the correct e-mail")
        }
        const isAlreadyPresent = await users.find({email});
        console.log(isAlreadyPresent)
        if (isAlreadyPresent.length>0) {
          reject("Email Aready Present");
        } else {
          let hashPassword= await bcrypt.hashSync(password,10)
          credentials.password=hashPassword
          const createUser = await users.create(credentials);
          resolve({ code: 200, msg: "SignedUp Successfully" });
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  login(credentials){
    return new Promise(async(resolve,reject)=>{
      try{
        let{ email ,password}=credentials
        const isPresent=await users.find({email:email})
        if(isPresent .length >0){
          console.log(isPresent)
          let comparePass=bcrypt.compareSync(password,isPresent[0].password)
          if(comparePass){
            let payload={
              id:isPresent[0].id
            }
            const token=await jwt.sign({payload},"sujith",{expiresIn:'1h'})
            resolve({ code: 200,msg:"Logged In",token:token})
          }
          else{
            reject("Invalid Password")
          }
        }
        else{
          reject("Create an account")
        }
       
      }
      catch(err){
        reject(err)
      }
    })
  }
}
module.exports=()=>{
return new AuthController()
}