const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/FinacCustomers" , {
    
}).then(() => {
    console.log('Connection Successful');
}).catch((e) => {
    console.log('No connection');
})