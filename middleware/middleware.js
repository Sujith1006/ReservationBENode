var jwt = require("jsonwebtoken");


module.exports = (req, res, next) => {
    var token = (req.headers.token)

    jwt.verify(token, "sujith", async (err, decode) => {
      if(err){
        console.log(err)
        res.send({code:400,msg:"Invalid Credential"})
      }
      else{
        // console.log(decode.payload)
        req.user=decode.payload.id;
        next()
      }
    })
  }