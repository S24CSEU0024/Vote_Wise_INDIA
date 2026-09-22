const mongoose = require("mongoose");

const constituencySchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    state: {
        type: String,
        required: true
    },

    district: String,

    constituencyNumber: Number,

    type: {
        type: String,
        enum: ["General", "SC", "ST"],
        default: "General"
    },

    lokSabhaSeats: {
        type: Number,
        default: 1
    },

    assemblySegments: [
        {
            type: String
        }
    ],

    population: Number,

    totalVoters: Number,

    maleVoters: Number,

    femaleVoters: Number,

    otherVoters: Number,

    pollingStations: Number,

    currentMP: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Candidate"
    },

    currentParty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Party"
    },

    previousMP: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Candidate"
    },

    previousParty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Party"
    },

    literacyRate: Number,

    area: Number,

    majorIssues: [
        String
    ],

    famousPlaces: [
        String
    ],

    majorIndustries: [
        String
    ],

    mapImage: String,

    gallery: [
        String
    ]

}, { timestamps: true });

module.exports = mongoose.model("Constituency", constituencySchema);