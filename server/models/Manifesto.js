const mongoose = require("mongoose");

const promiseSchema = new mongoose.Schema(
{
    title: String,
    description: String,
    status: {
        type: String,
        enum: [
            "Completed",
            "In Progress",
            "Partially Completed",
            "Not Started",
            "Unknown"
        ],
        default: "Unknown"
    }
},
{
    _id: false
});

const manifestoSchema = new mongoose.Schema({

    party: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Party"
    },

    partyName: {
        type: String,
        required: true
    },

    electionYear: {
        type: Number,
        required: true
    },

    electionType: {
        type: String,
        default: "Lok Sabha"
    },

    slogan: String,

    theme: String,

    vision: String,

    promises: [promiseSchema],

    focusAreas: [
        String
    ],

    achievementsClaimed: [
        String
    ],

    downloadablePdf: String,

    officialWebsite: String,

    releasedBy: String,

    releaseDate: String,

    image: String

},
{
    timestamps: true
});

module.exports = mongoose.model("Manifesto", manifestoSchema);