const mongoose = require("mongoose")

const dbconnect = ()=>{
    try {
        mongoose.connect("mongodb://localhost:27017/crud")
        console.log("database connected");
    } catch (error) {
        console.log("not connected");
    }
}



module.exports = dbconnect