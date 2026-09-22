const path = require("path");

require("dotenv").config({
    path: path.join(__dirname, ".env")
});
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const candidateRoutes = require("./routes/candidateRoutes");
const partyRoutes = require("./routes/partyRoutes");
const electionRoutes = require("./routes/electionRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const constituencyRoutes = require("./routes/constituencyRoutes");
const newsRoutes = require("./routes/newsRoutes");
const schemeRoutes = require("./routes/schemeRoutes");
const manifestoRoutes = require("./routes/manifestoRoutes");
const timelineRoutes = require("./routes/timelineRoutes");
const compareRoutes = require("./routes/compareRoutes");
const aiRoutes = require("./routes/aiRoutes");
const nationalElectionRoutes = require("./routes/nationalElectionRoutes");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


// Import party seed database
const parties = require("./seeds/seed");


const app = express();


// Middleware
app.use(cors());
app.use(express.json());



// Home Route
app.get("/", (req, res) => {

    res.send("VoteWise India Backend Running");

});



// ===============================
// AUTH ROUTES
// ===============================

app.use("/api/auth", authRoutes);



// ===============================
// CANDIDATE ROUTES
// ===============================

app.use("/api/candidates", candidateRoutes);



// ===============================
// PARTY ROUTES (MongoDB)
// ===============================

app.use("/api/parties", partyRoutes);
app.use("/api/elections", electionRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/constituencies", constituencyRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/schemes", schemeRoutes);
app.use("/api/manifestos", manifestoRoutes);
app.use("/api/timeline", timelineRoutes);
app.use("/api/compare", compareRoutes);
app.use("/api/ai", aiRoutes);
app.use(
    "/api/national-elections",
    nationalElectionRoutes
);


// ===============================
// SEEDED PARTY DATA ROUTES
// ===============================


// Get all parties from JSON seeds

app.get("/api/seed/parties", (req,res)=>{

    res.json(parties);

});




// Get single party by shortName

app.get("/api/seed/party/:shortName",(req,res)=>{


    const party = parties.find(
        p => 
        p.shortName.toLowerCase() === 
        req.params.shortName.toLowerCase()
    );


    if(!party){

        return res.status(404).json({
            message:"Party not found"
        });

    }


    res.json(party);


});




// Search party

app.get("/api/seed/search/:keyword",(req,res)=>{


    const keyword =
    req.params.keyword.toLowerCase();


    const result = parties.filter(
        party =>
        party.name
        .toLowerCase()
        .includes(keyword)
    );


    res.json(result);


});




// Filter by state

app.get("/api/seed/state/:state",(req,res)=>{


    const state =
    req.params.state.toLowerCase();


    const result = parties.filter(party =>

        party.statesGoverned?.some(
            item =>
            item.state
            .toLowerCase()
            .includes(state)
        )

    );


    res.json(result);


});




// ===============================
// PROFILE ROUTE
// ===============================

app.get("/api/profile", authMiddleware, (req, res) => {

    res.json({

        message:"Protected Route",

        user:req.user

    });

});
// ===============================
// MONGODB CONNECTION + SERVER START
// ===============================

const PORT = process.env.PORT || 8000;

async function startServer() {
    try {

        await mongoose.connect(process.env.MONGO_URI);

        console.log("✅ MongoDB Connected");

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });

    } catch (error) {

        console.error("❌ MongoDB Connection Failed");
        console.error(error.message);

        process.exit(1);
    }
}

startServer();



