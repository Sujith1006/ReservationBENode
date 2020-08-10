const router = require("express").Router();
const Authcontroller=require('../Controllers/authController')()
class Authroute {
  constructor() {
    this.controller = Authcontroller;
    this.onInit();
  }
  onInit() {
    router.use("/", async (req, res, next) => {
      next();
    });

    router.post("/signup", async (req, res) => {
      try {
        const response =await this.controller.signup(req.body)
        res.send({ code: 200, msg: "SignedUpsuccessfully" });
      } catch (err) {
        console.log(err)
        res.send({ code: 500, msg: "Signup Failed", error: err });
      }
    });
    router.post('/login',async(req,res)=>{
      try{
        const response=await this.controller.login(req.body);
        console.log(response)
        res.send({ code: 200, msg:response.msg,token:response.token });
      }
     catch(err){
       console.log(err)
       res.send({code :400 ,msg:"Failed Login", err:err})
     }
    })
    
    
  }

  getRouter(){
    return router
  }
}
module.exports = () => {
 return new Authroute();
};
