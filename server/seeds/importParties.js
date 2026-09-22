require("dotenv").config();

const mongoose = require("mongoose");

const Party = require("../models/Party");

const parties = require("./seed");


mongoose.connect(process.env.MONGO_URI)
.then(async()=>{


    console.log("MongoDB Connected");


    await Party.deleteMany();


    await Party.insertMany(parties);


    console.log(
        "✅ All parties imported successfully"
    );


    process.exit();


})
.catch(err=>{

    console.log(err);

});