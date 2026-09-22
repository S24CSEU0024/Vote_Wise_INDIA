const mongoose = require("mongoose");
require("dotenv").config();

const Constituency = require("../models/Constituency");
const Candidate = require("../models/Candidate");
const Party = require("../models/Party");

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log(err));

async function seedConstituencies() {

    try {

        await Constituency.deleteMany();

        // ======================
        // Find Parties
        // ======================

        const bjp = await Party.findOne({ shortName: "BJP" });
        const congress = await Party.findOne({ shortName: "INC" });

        // ======================
        // Find Candidates
        // ======================

        const modi = await Candidate.findOne({
            name: "Narendra Modi"
        });

        const rahul = await Candidate.findOne({
            name: "Rahul Gandhi"
        });

        const constituencies = [

            {
                name: "Varanasi",

                state: "Uttar Pradesh",

                district: "Varanasi",

                constituencyNumber: 80,

                type: "General",

                lokSabhaSeats: 1,

                assemblySegments: [
                    "Rohaniya",
                    "Varanasi North",
                    "Varanasi South",
                    "Varanasi Cantt",
                    "Sevapuri"
                ],

                population: 3800000,

                totalVoters: 2056000,

                maleVoters: 1100000,

                femaleVoters: 955000,

                otherVoters: 1000,

                pollingStations: 1900,

                currentMP: modi ? modi._id : null,

                currentParty: bjp ? bjp._id : null,

                previousMP: modi ? modi._id : null,

                previousParty: bjp ? bjp._id : null,

                literacyRate: 78.5,

                area: 1535,

                majorIssues: [
                    "Employment",
                    "Infrastructure",
                    "Tourism",
                    "Traffic"
                ],

                famousPlaces: [
                    "Kashi Vishwanath Temple",
                    "Dashashwamedh Ghat",
                    "Sarnath"
                ],

                majorIndustries: [
                    "Silk",
                    "Tourism",
                    "Handicrafts"
                ],

                mapImage: "varanasi_map.jpg",

                gallery: [
                    "varanasi1.jpg",
                    "varanasi2.jpg"
                ]
            },

            {
                name: "Amethi",

                state: "Uttar Pradesh",

                district: "Amethi",

                constituencyNumber: 37,

                type: "General",

                lokSabhaSeats: 1,

                assemblySegments: [
                    "Amethi",
                    "Tiloi",
                    "Salon",
                    "Jagdishpur",
                    "Gauriganj"
                ],

                population: 2200000,

                totalVoters: 1700000,

                maleVoters: 900000,

                femaleVoters: 798000,

                otherVoters: 2000,

                pollingStations: 1600,

                currentMP: rahul ? rahul._id : null,

                currentParty: congress ? congress._id : null,

                previousMP: rahul ? rahul._id : null,

                previousParty: congress ? congress._id : null,

                literacyRate: 72.3,

                area: 3063,

                majorIssues: [
                    "Agriculture",
                    "Employment",
                    "Roads"
                ],

                famousPlaces: [
                    "Amethi Fort"
                ],

                majorIndustries: [
                    "Agriculture"
                ],

                mapImage: "amethi.jpg",

                gallery: [
                    "amethi1.jpg"
                ]
            }

        ];

        await Constituency.insertMany(constituencies);

        console.log("✅ Constituencies Seeded Successfully");

        process.exit();

    }

    catch (err) {

        console.log(err);

        process.exit();

    }

}

seedConstituencies();