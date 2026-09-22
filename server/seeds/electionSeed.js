const mongoose = require("mongoose");
require("dotenv").config();

const Election = require("../models/Election");
const Party = require("../models/Party");
const Candidate = require("../models/Candidate");

async function getParty(shortName) {
    const party = await Party.findOne({ shortName });

    if (!party) {
        throw new Error(`Party not found: ${shortName}`);
    }

    return party;
}

async function getCandidate({
    name,
    party,
    state,
    constituency
}) {

    let candidate = await Candidate.findOne({
        name,
        constituency
    });

    if (!candidate) {

        candidate = await Candidate.create({
            name,
            party: party?._id,
            state,
            constituency
        });

        console.log(`👤 Candidate created: ${name}`);
    }

    return candidate;
}


async function seedElection() {

    try {

        await mongoose.connect(process.env.MONGO_URI);

        console.log("✅ MongoDB Connected");

        // --------------------------------
        // Clear existing election records
        // --------------------------------

        await Election.deleteMany({});

        console.log("🗑️ Old election data removed");


        // --------------------------------
        // Parties
        // --------------------------------

        const bjp = await getParty("BJP");
        const congress = await getParty("INC");


        // --------------------------------
        // Candidates
        // --------------------------------

        const modi = await getCandidate({
            name: "Narendra Modi",
            party: bjp,
            state: "Uttar Pradesh",
            constituency: "Varanasi"
        });


        const ajayRai = await getCandidate({
            name: "Ajay Rai",
            party: congress,
            state: "Uttar Pradesh",
            constituency: "Varanasi"
        });


        // ==========================================
        // ELECTION DATA
        // ==========================================

        const elections = [

            // ------------------------------------------
            // 2024
            // ------------------------------------------

            {
                year: 2024,

                electionType: "Lok Sabha",

                electionPhase: 7,

                electionDate: "1 June 2024",

                state: "Uttar Pradesh",

                constituency: "Varanasi",

                constituencyType: "General",

                winner: modi._id,

                winnerName: "Narendra Modi",

                winnerParty: bjp._id,

                winnerPartyName: "Bharatiya Janata Party",

                runnerUp: ajayRai._id,

                runnerUpName: "Ajay Rai",

                runnerUpParty: congress._id,

                runnerUpPartyName:
                    "Indian National Congress",

                totalCandidates: 8,

                totalVoters: 2056000,

                totalVotesPolled: 1130000,

                turnoutPercentage: 61.7,

                validVotes: 1125000,

                rejectedVotes: 5000,

                winnerVotes: 612970,

                winnerVoteShare: 54.24,

                runnerUpVotes: 460457,

                runnerUpVoteShare: 40.78,

                margin: 152513,

                voteDifference: 152513,

                governmentFormed: true,

                rulingAlliance: "NDA",

                primeMinister: "Narendra Modi",

                chiefMinister: "Yogi Adityanath",

                resultStatus: "Declared",

                notaVotes: 15000,

                notaPercentage: 1.3,

                evmUsed: true,

                vvpatUsed: true,

                pollingStations: 1900,

                electionCommission:
                    "Election Commission of India",

                candidateResults: [

                    {
                        candidate: modi._id,
                        candidateName: "Narendra Modi",
                        party: bjp._id,
                        partyName: "BJP",
                        votes: 612970,
                        voteShare: 54.24,
                        position: 1
                    },

                    {
                        candidate: ajayRai._id,
                        candidateName: "Ajay Rai",
                        party: congress._id,
                        partyName: "Indian National Congress",
                        votes: 460457,
                        voteShare: 40.78,
                        position: 2
                    }

                ],

                highlights: [

                    "Narendra Modi won Varanasi for the third consecutive time.",

                    "Varanasi remained one of the most closely watched constituencies.",

                    "The election was part of the 2024 Indian general election."

                ],

                importantIssues: [

                    "Infrastructure",
                    "Employment",
                    "Development",
                    "Tourism"

                ],

                manifestoTopics: [

                    "Digital India",
                    "Infrastructure",
                    "Employment"

                ],

                officialWebsite:
                    "https://results.eci.gov.in"

            },


            // ------------------------------------------
            // 2019
            // ------------------------------------------

            {
                year: 2019,

                electionType: "Lok Sabha",

                electionPhase: 7,

                electionDate: "19 May 2019",

                state: "Uttar Pradesh",

                constituency: "Varanasi",

                constituencyType: "General",

                winner: modi._id,

                winnerName: "Narendra Modi",

                winnerParty: bjp._id,

                winnerPartyName:
                    "Bharatiya Janata Party",

                runnerUp: null,

                runnerUpName: "Shalini Yadav",

                runnerUpParty: congress._id,

                runnerUpPartyName:
                    "Indian National Congress",

                totalCandidates: 26,

                totalVotesPolled: 1049929,

                turnoutPercentage: 57.13,

                winnerVotes: 674664,

                winnerVoteShare: 63.62,

                runnerUpVotes: 195159,

                runnerUpVoteShare: 18.40,

                margin: 479505,

                voteDifference: 479505,

                governmentFormed: true,

                rulingAlliance: "NDA",

                primeMinister: "Narendra Modi",

                resultStatus: "Declared",

                evmUsed: true,

                vvpatUsed: true,

                electionCommission:
                    "Election Commission of India",

                highlights: [

                    "Narendra Modi won Varanasi by a large margin.",

                    "The BJP-led NDA formed the government at the national level."

                ],

                importantIssues: [

                    "National security",
                    "Development",
                    "Employment",
                    "Infrastructure"

                ],

                manifestoTopics: [

                    "National security",
                    "Economic development",
                    "Infrastructure"

                ],

                officialWebsite:
                    "https://results.eci.gov.in"

            }

        ];


        // --------------------------------
        // Insert
        // --------------------------------

        await Election.insertMany(elections);

        console.log(
            `✅ ${elections.length} Elections Seeded Successfully`
        );

        process.exit(0);

    }

    catch (error) {

        console.error(
            "❌ Election Seed Error:",
            error
        );

        process.exit(1);

    }

}

seedElection();