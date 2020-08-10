var express = require("express");
var app = express();
var cors = require("cors");
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
const nodemon = require("nodemon");

class Server {
  constructor() {
    this.onInit();
  }
  onInit() {
    this.initDb();
    this.setServer();
    this.initRouter();
    this.initControllers()
  }
  initDb() {
    mongoose
      .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/reservation", {
        useNewUrlParser: true, useUnifiedTopology: true 
      })
      .then(() => {
        console.log("Database Connected");
      })
      .catch((err) => {
        console.log("Database is not connected " + err);
      });
     
  }
 async initControllers(){
    this.authController=require('./Controllers/authController.js')()
  }
  initRouter(){
    
    const userRoute=require('./Routers/authRouter')()
      app.use('/node/auth',userRoute.getRouter())

    const reservationRoute=require("./Routers/reservationRoute")()
      app.use('/node/reservation',reservationRoute.getRouter())
  }
  setServer() {
    let PORT=process.env.PORT || 9000
    app.use(bodyparser.json());
    // app.use(bodyparser.urlencoded({ extended: true }));
    app.use(cors());
    app.use(express.static("public"));
    app.use(bodyparser());
    app.listen(PORT, () => {
      console.log("listening....... 9000");

    });
  }
}
let server = new Server();
