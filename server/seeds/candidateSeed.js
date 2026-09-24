const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

require("dotenv").config({
    path: path.join(__dirname, "../.env")
});

const Party = require("../models/Party");
const Candidate = require("../models/Candidate");


async function seedCandidates() {

    try {

        // =====================================================
        // CONNECT TO MONGODB
        // =====================================================

        await mongoose.connect(process.env.MONGO_URI);

        console.log("✅ MongoDB Connected");


        // =====================================================
        // CANDIDATE DATA FOLDER
        // =====================================================

        const folder = path.join(
            __dirname,
            "../data/candidates"
        );

        if (!fs.existsSync(folder)) {

            throw new Error(
                `Candidate folder not found: ${folder}`
            );
        }


        // =====================================================
        // GET ALL JSON FILES
        // =====================================================

        const files = fs
            .readdirSync(folder)
            .filter(file => file.endsWith(".json"));

        console.log(
            `📂 Found ${files.length} candidate files`
        );


        if (files.length === 0) {

            console.log(
                "❌ No candidate JSON files found."
            );

            return;
        }


        // =====================================================
        // CLEAR OLD CANDIDATES
        // =====================================================

        await Candidate.deleteMany({});

        console.log(
            "🗑️ Previous candidates deleted"
        );


        // =====================================================
        // CLEAR CANDIDATE REFERENCES FROM PARTIES
        // IMPORTANT:
        // We use updateMany instead of Party.save()
        // =====================================================

        await Party.updateMany(
            {},
            {
                $set: {
                    candidates: []
                }
            }
        );

        console.log(
            "🧹 Cleared candidate references from parties"
        );


        let insertedCount = 0;
        let skippedCount = 0;


        // =====================================================
        // PROCESS EVERY CANDIDATE FILE
        // =====================================================

        for (const file of files) {

            try {

                const filePath = path.join(
                    folder,
                    file
                );


                // -------------------------------------------------
                // READ JSON
                // -------------------------------------------------

                const raw = fs.readFileSync(
                    filePath,
                    "utf8"
                );

                const candidateData = JSON.parse(raw);


                console.log("\n--------------------------------");
                console.log(`📄 Processing: ${file}`);
                console.log(
                    `👤 Candidate: ${candidateData.name}`
                );
                console.log(
                    `🏛️ Party: ${candidateData.party}`
                );
                console.log("--------------------------------");


                // -------------------------------------------------
                // BASIC VALIDATION
                // -------------------------------------------------

                if (
                    !candidateData.name ||
                    !candidateData.party
                ) {

                    console.log(
                        `⚠️ Skipping ${file}: name or party missing`
                    );

                    skippedCount++;

                    continue;
                }


                // =================================================
                // FIND PARTY
                // =================================================

                const partyCode = candidateData.party
                    .toUpperCase()
                    .trim();


                let party = await Party.findOne({
                    $or: [

                        {
                            shortName: partyCode
                        },

                        {
                            shortName:
                                partyCode === "TMC"
                                    ? "AITC"
                                    : partyCode
                        },

                        {
                            shortName:
                                partyCode === "AITC"
                                    ? "TMC"
                                    : partyCode
                        },

                        {
                            name: new RegExp(
                                `^${partyCode}$`,
                                "i"
                            )
                        }

                    ]
                });


                // -------------------------------------------------
                // PARTY NOT FOUND
                // -------------------------------------------------

                if (!party) {

                    console.log(
                        `❌ Party not found: ${candidateData.party}`
                    );

                    skippedCount++;

                    continue;
                }


                console.log(
                    `✅ Party found: ${party.name} (${party.shortName})`
                );


                // =================================================
                // REMOVE PARTY STRING FROM CANDIDATE DATA
                // =================================================

                const {
                    party: ignoredParty,
                    ...candidateFields
                } = candidateData;


                // =================================================
                // CREATE CANDIDATE
                // =================================================

                const candidate = new Candidate({

                    ...candidateFields,

                    party: party._id

                });


                await candidate.save();


                // IMPORTANT:
                // Count candidate immediately after successful save
                insertedCount++;


                console.log(
                    `✅ Candidate inserted: ${candidate.name}`
                );


                // =================================================
                // ADD CANDIDATE TO PARTY
                //
                // DO NOT USE:
                //
                // party.candidates.push(...)
                // await party.save()
                //
                // because Party schema currently has validation
                // problems with majorSchemes/timeline.
                // =================================================

                await Party.updateOne(

                    {
                        _id: party._id
                    },

                    {
                        $addToSet: {
                            candidates: candidate._id
                        }
                    }

                );


                console.log(
                    `🔗 Linked ${candidate.name} → ${party.shortName}`
                );


            } catch (error) {

                console.error(
                    `❌ Error processing ${file}:`,
                    error.message
                );

                skippedCount++;

            }

        }


        // =====================================================
        // FINAL RESULTS
        // =====================================================

        console.log("\n======================================");
        console.log("🎉 CANDIDATE SEEDING COMPLETE");
        console.log("======================================");

        console.log(
            `📂 Total files: ${files.length}`
        );

        console.log(
            `✅ Successfully inserted: ${insertedCount}`
        );

        console.log(
            `⚠️ Skipped: ${skippedCount}`
        );


        // =====================================================
        // VERIFY DATABASE
        // =====================================================

        const totalCandidates =
            await Candidate.countDocuments();


        console.log(
            `📊 Candidates currently in MongoDB: ${totalCandidates}`
        );


        // =====================================================
        // DISPLAY ALL CANDIDATES
        // =====================================================

        const allCandidates =
            await Candidate
                .find({})
                .populate(
                    "party",
                    "name shortName"
                )
                .lean();


        console.log("\n👥 Candidates in database:");

        allCandidates.forEach(
            (candidate, index) => {

                console.log(
                    `${index + 1}. ${candidate.name} - ${candidate.party
                        ? candidate.party.shortName
                        : "No Party"
                    }`
                );

            }
        );


        // =====================================================
        // DISCONNECT
        // =====================================================

        await mongoose.disconnect();

        console.log(
            "\n🔌 MongoDB disconnected"
        );


    } catch (error) {

        console.error(
            "❌ Candidate seeding error:",
            error
        );

        await mongoose.disconnect();

        process.exit(1);
    }
}


seedCandidates();