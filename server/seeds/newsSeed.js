const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config({
    path: path.join(__dirname, "../.env")
});
console.log(process.env.MONGO_URI);

const News = require("../models/News");
const Party = require("../models/Party");
const Candidate = require("../models/Candidate");
const Election = require("../models/Election");

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB Connected");

        await seedNews();

    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

connectDB();
async function seedNews() {

    try {

        await News.deleteMany();

        // Find Party
        const bjp = await Party.findOne({ shortName: "BJP" });
        const congress = await Party.findOne({ shortName: "INC" });

        // Find Candidates
        const modi = await Candidate.findOne({
            name: "Narendra Modi"
        });

        const ajayRai = await Candidate.findOne({
            name: "Ajay Rai"
        });

        // Find Election
        const election = await Election.findOne({
            year: 2024,
            constituency: "Varanasi"
        });

        const news = [

            {
                title: "Narendra Modi Wins Varanasi Lok Sabha Election 2024",

                shortDescription:
                "Narendra Modi secured victory from Varanasi for the third consecutive term.",

                content:
                "Prime Minister Narendra Modi won the Varanasi Lok Sabha constituency in the 2024 General Elections with a huge margin against Congress candidate Ajay Rai.",

                party: bjp ? bjp._id : null,
                partyName: "BJP",

                candidate: modi ? modi._id : null,
                candidateName: "Narendra Modi",

                election: election ? election._id : null,

                year: 2024,

                state: "Uttar Pradesh",

                constituency: "Varanasi",

                category: "Election",

                source: "Election Commission of India",

                author: "VoteWise India",

                image: "modi_varanasi.jpg",

                gallery: [
                    "varanasi1.jpg",
                    "varanasi2.jpg"
                ],

                video: "https://youtube.com",

                tags: [
                    "BJP",
                    "Modi",
                    "Election2024",
                    "Varanasi"
                ],

                isTrending: true,

                isBreaking: true,

                likes: 5400,

                views: 185000,

                shares: 2100,

                commentsCount: 650,

                language: "English",

                status: "Published",

                officialLink: "https://results.eci.gov.in",

                pdf: ""
            },

            {
                title: "Congress Campaign Intensifies in Uttar Pradesh",

                shortDescription:
                "Congress leaders hold major public rallies across Uttar Pradesh.",

                content:
                "The Indian National Congress has intensified its election campaign with several rallies led by senior leaders across Uttar Pradesh.",

                party: congress ? congress._id : null,
                partyName: "INC",

                candidate: ajayRai ? ajayRai._id : null,
                candidateName: "Ajay Rai",

                year: 2024,

                state: "Uttar Pradesh",

                constituency: "Varanasi",

                category: "Campaign",

                source: "VoteWise India",

                author: "Editorial Team",

                image: "ajay_rai.jpg",

                gallery: [],

                video: "",

                tags: [
                    "Congress",
                    "Campaign",
                    "UP"
                ],

                isTrending: false,

                isBreaking: false,

                likes: 1200,

                views: 34000,

                shares: 350,

                commentsCount: 140,

                language: "English",

                status: "Published",

                officialLink: "",

                pdf: ""
            }

        ];

        await News.insertMany(news);

        console.log("✅ News Seeded Successfully");

        process.exit();

    }

    catch(err){

        console.log(err);

        process.exit();

    }

}

