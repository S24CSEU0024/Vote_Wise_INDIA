const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const Party = require("../models/Party");
const Candidate = require("../models/Candidate");

mongoose.connect(process.env.MONGO_URI)
.then(async () => {

    console.log("✅ MongoDB Connected");

    // Remove previous candidates
    await Candidate.deleteMany({});

    // Optional: clear candidate references from all parties
    await Party.updateMany({}, { $set: { candidates: [] } });

    const folder = path.join(__dirname, "../data/candidates");

    const files = fs.readdirSync(folder);

    for (const file of files) {

        const candidateData = JSON.parse(
            fs.readFileSync(path.join(folder, file), "utf-8")
        );

        // Find the party using shortName
        const party = await Party.findOne({
            shortName: candidateData.party
        });

        if (!party) {
            console.log(`❌ Party not found for ${candidateData.name}`);
            continue;
        }

        const candidate = await Candidate.create({

            name: candidateData.name,
            party: party._id,
            state: candidateData.state,
            constituency: candidateData.constituency,
            position: candidateData.position,
            age: candidateData.age,
            education: candidateData.education,
            experience: candidateData.experience,
            achievements: candidateData.achievements,
            image: candidateData.image

        });

        party.candidates.push(candidate._id);

        await party.save();

        console.log(`✅ ${candidate.name} added to ${party.shortName}`);

    }

    console.log("🎉 Candidate seeding completed");

    mongoose.disconnect();

})
.catch(err => console.log(err));