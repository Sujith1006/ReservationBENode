const Reservation = require("../models/reservation");

class ReservationController {
  constructor() {}
  createReservation(data) {
    return new Promise(async (resolve, reject) => {
      try {
        //  console.log(data)
        let { name, noofguests, userId, dateTime, typeOfFood } = data;
        const createReservation = await Reservation.create({
          name,
          noofguests,
          userId,
          dateTime,
          typeOfFood,
        });
        resolve({ code: 200, msg: " Reservation Created Successfully" });
      } catch (err) {
        reject(err);
      }
    });
  }
  fetchAllReservation() {
    return new Promise(async (resolve, reject) => {
      try {
        const allReservation = await Reservation.find({});
        resolve({ code: 200, data: allReservation });
      } catch (err) {
        reject(err);
      }
    });
  }

  fetchUsersReservation(userId) {
    return new Promise(async (resolve, reject) => {
      try {
        const usersReservation = await Reservation.find({ userId });
        resolve({ code: 200, data: usersReservation });
      } catch (err) {
        reject(err);
      }
    });
  }

  updateReservation(data, id) {
    return new Promise(async (resolve, reject) => {
      try {
        let updateReservation = await Reservation.update(
          { _id: id },
          {
            name: data.name,
            noofguests: data.noofguests,
            typeOfFood: data.typeOfFood,
            dateTime: data.dateTime,
          }
        );
        resolve({ code: 200, msg: " Reservation Updated Successfully" });
      } catch (err) {
        reject(err);
      }
    });
  }


  deleteReservation(id){
    return new Promise(async(resolve,reject)=>{
      try{
        const deleteReservation=await Reservation.deleteOne({_id:id})
        resolve({code:200,msg:"Deleted Successfully"})
      }
      catch(err){
        reject(err)
      }
    })
  }
}
module.exports = () => {
  return new ReservationController();
};
