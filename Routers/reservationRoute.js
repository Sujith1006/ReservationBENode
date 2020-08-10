let router = require("express").Router();
let middleware = require("../middleware/middleware");
const Reservation = require("../models/reservation");
const reservationController = require("../Controllers/reservationController")();
class ReservationRoute {
  constructor() {
    this.onInit();
  }
  onInit() {
    router.use("/", async (req, res, next) => {
      next();
    });
    router.post("/create", middleware, async (req, res) => {
      try {
        req.body.userId = req.user;
        const response = await reservationController.createReservation(
          req.body
        );
        res.send({ code: response.code, msg: response.msg });
      } catch (err) {
        console.log(err);
        res.send({ code: 400, msg: "Reservation Failed" });
      }
    });

    router.get("/allreservation", middleware, async (req, res) => {
      try {
        const response = await reservationController.fetchAllReservation();
        res.send({ code: response.code, data: response.data });
      } catch (err) {
        console.log(err);
        res.send({ code: 400, msg: "Fetch Failed" });
      }
    });

    router.put("/update", middleware, async (req, res) => {
      try {
        const response = await reservationController.updateReservation(
          req.body.data,
          req.body.id
        );
        res.send({ code: response.code, msg: response.msg });
      } catch(err) {
        console.log(err);
        res.send({ code: 400, msg: "Update Failed" });
      }
    });

    router.get("/myreservation", middleware, async (req, res) => {
      try {
        const response=await reservationController.fetchUsersReservation(req.user)
        res.send({code: response.code ,data: response.data})
      } catch (err) {
        console.log(err);
        res.send({ code: 400, msg: "Fetch Failed" });
      }
    });

    router.delete('/delete',middleware,async(req,res)=>{
      try{
        const response=await reservationController.deleteReservation(req.body.id)
        res.send({code: response.code, msg:response.msg})
      }
      catch(err){
        console.log(err)
        res.send({ code: 400, msg: "Delete Failed" })
      }
    })
  }
  getRouter() {
    return router;
  }
}
module.exports = () => {
  return new ReservationRoute();
};
