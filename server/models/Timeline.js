const mongoose = require("mongoose");

const timelineSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    shortDescription: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    year: {
        type: Number,
        required: true,
        index: true
    },

    exactDate: String,

    category: {
        type: String,
        enum: [
            "Politics",
        "Election",
        "Government",
        "Constitution",
        "Economy",
        "Judiciary",
        "War",
        "Defence",
        "Science",
        "Technology",
        "Space",
        "Agriculture",
        "Health",
        "Education",
        "Social",
        "Freedom Movement",
        "International",
        "Infrastructure",
        "Environment",
        "Culture",
        "Sports",
        "Leadership",
        "Security",
        "Scheme",
        "Other"
        ],
        default: "Other"
    },

    people: [
        {
            type: String
        }
    ],

    parties: [
        {
            type: String
        }
    ],

    state: String,

    impact: String,

    significance: String,

    image: String,

    gallery: [String],

    video: String,

    references: [String],

    tags: [String],

    isImportant: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Timeline", timelineSchema);