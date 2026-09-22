const mongoose = require("mongoose");

const nationalElectionSchema = new mongoose.Schema(
    {
        year: {
            type: Number,
            required: true,
            unique: true
        },

        electionName: {
            type: String,
            required: true
        },

        electionType: {
            type: String,
            default: "Lok Sabha"
        },

        totalSeats: {
            type: Number,
            default: 543
        },

        totalVoters: Number,

        votesPolled: Number,

        turnoutPercentage: Number,

        winningParty: String,

        winningPartySeats: Number,

        winningAlliance: String,

        primeMinister: String,

        governmentFormed: String,

        majorParties: [
            {
                party: String,
                seats: Number,
                voteShare: Number
            }
        ],

        majorIssues: [
            String
        ],

        highlights: [
            String
        ],

        historicalSignificance: String,

        officialWebsite: String
    },
    {
        timestamps: true
    }
);

module.exports =
    mongoose.model("NationalElection", nationalElectionSchema);
