const mongoose = require("mongoose");

const electionSchema = new mongoose.Schema(

{
    // Election Information
    year: {
        type: Number,
        required: true
    },

    electionType: {
        type: String,
        enum: [
            "Lok Sabha",
            "Rajya Sabha",
            "Assembly",
            "Municipal",
            "Panchayat"
        ],
        required: true
    },

    electionPhase: {
        type: Number,
        default: 1
    },

    electionDate: {
        type: String
    },

    state: {
        type: String,
        required: true
    },

    constituency: {
        type: String,
        required: true
    },

    constituencyType: {
        type: String,
        enum: [
            "General",
            "SC",
            "ST"
        ],
        default: "General"
    },

    // Winner
    winner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Candidate",
        required: true
    },

    winnerName: String,

    winnerParty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Party"
    },

    winnerPartyName: String,

    // Runner Up
    runnerUp: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Candidate"
    },

    runnerUpName: String,

    runnerUpParty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Party"
    },

    runnerUpPartyName: String,

    // Election Statistics
    totalCandidates: Number,

    totalVoters: Number,

    maleVoters: Number,

    femaleVoters: Number,

    otherVoters: Number,

    totalVotesPolled: Number,

    turnoutPercentage: Number,

    validVotes: Number,

    rejectedVotes: Number,

    margin: Number,

    voteDifference: Number,

    // Winner Statistics
    winnerVotes: Number,

    winnerVoteShare: Number,

    runnerUpVotes: Number,

    runnerUpVoteShare: Number,

    // Government
    governmentFormed: Boolean,

    rulingAlliance: String,

    chiefMinister: String,

    primeMinister: String,

    // Result Status
    resultStatus: {
        type: String,
        enum: [
            "Declared",
            "Counting",
            "Scheduled"
        ],
        default: "Declared"
    },

    // NOTA
    notaVotes: Number,

    notaPercentage: Number,

    // EVM
    evmUsed: Boolean,

    vvpatUsed: Boolean,

    // Miscellaneous
    pollingStations: Number,

    countingCenters: Number,

    electionCommission: {
        type: String,
        default: "Election Commission of India"
    },

    // Candidate Performance
    candidateResults: [

        {

            candidate: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Candidate"
            },

            candidateName: String,

            party: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Party"
            },

            partyName: String,

            votes: Number,

            voteShare: Number,

            position: Number

        }

    ],

    // News
    highlights: [
        String
    ],

    importantIssues: [
        String
    ],

    manifestoTopics: [
        String
    ],

    // Images
    gallery: [
        String
    ],

    // References
    officialResultPDF: String,

    officialWebsite: String

},

{
    timestamps: true
}

);

module.exports = mongoose.model("Election", electionSchema);