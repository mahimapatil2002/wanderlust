const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL= "mongodb://127.0.0.1:27017/wanderlust";

main()
.then(() => {
    console.log("connected to DB");
})
.catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
};

const initDB = async() =>{                             // ek function banaya initDB jisme purane data ko delete karege fir new data ko insert karene 
    await Listing.deleteMany({});                      
    await Listing.insertMany(initData.data);                //initData ek object h jisme hum (.data) ko initialize kar kar h 
    console.log("data was initialized");

};

initDB();                    //pure function ko call karenge