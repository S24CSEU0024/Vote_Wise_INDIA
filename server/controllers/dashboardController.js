const Party = require("../models/Party");
const Candidate = require("../models/Candidate");
const Election = require("../models/Election");

exports.getDashboard = async (req, res) => {
    try {

        const totalParties = await Party.countDocuments();

        const totalCandidates = await Candidate.countDocuments();

        const totalElections = await Election.countDocuments();

        const latestElection = await Election.findOne()
            .sort({ year: -1 })
            .select("year electionType state constituency winnerName");

        const totalStates = await Party.distinct("statesGoverned.state");

        const parties = await Party.find();

        // ✅ New correct logic
let largestParty = null;
let maxSeats = -1;

for (const party of parties) {

    const totalSeats = party.electionResults.reduce(
        (sum, election) => sum + (election.seatsWon || 0),
        0
    );

    if (totalSeats > maxSeats) {
        maxSeats = totalSeats;
        largestParty = party;
    }
}

        const pmParty = await Party.findOne({
            "ministers.primeMinister": { $exists: true, $ne: "" }
        });

        const currentPrimeMinister =
            pmParty?.ministers?.primeMinister || "";

        // ======================
// Alliance Statistics
// ======================

// Get all parties
const allParties = await Party.find({}, "alliance");

let nda = 0;
let india = 0;
let other = 0;

allParties.forEach((party) => {

    const alliance = (party.alliance || "").trim().toLowerCase();

    if (
        alliance === "nda" ||
        alliance.includes("national democratic alliance")
    ) {

        nda++;

    } else if (
        alliance === "india" ||
        alliance.includes("indian national developmental") ||
        alliance.includes("india alliance")
    ) {

        india++;

    } else {

        other++;

    }

});

const allianceCount = {
    NDA: nda,
    INDIA: india,
    Other: other
};

        res.json({

            summary: {

                totalParties,

                totalCandidates,

                totalElections,

                totalStates: totalStates.length

            },

            government: {

                currentPrimeMinister,

                largestParty: largestParty?.name || "",

                allianceCount

            },

            latestElection

        });

    }

    catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};