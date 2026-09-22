const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    shortDescription: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    party: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Party"
    },

    partyName: {
        type: String
    },

    candidate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Candidate"
    },

    candidateName: {
        type: String
    },

    election: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Election"
    },

    year: Number,

    state: String,

    constituency: String,

    category: {
        type: String,
        enum: [
            "Election",
            "Politics",
            "Government",
            "Manifesto",
            "Scheme",
            "Campaign",
            "Parliament",
            "Cabinet",
            "Economy",
            "Education",
            "Health",
            "International",
            "Other"
        ],
        default: "Politics"
    },

    source: String,

    author: String,

    image: String,

    gallery: [String],

    video: String,

    tags: [String],

    publishedDate: {
        type: Date,
        default: Date.now
    },

    isTrending: {
        type: Boolean,
        default: false
    },

    isBreaking: {
        type: Boolean,
        default: false
    },

    likes: {
        type: Number,
        default: 0
    },

    views: {
        type: Number,
        default: 0
    },

    shares: {
        type: Number,
        default: 0
    },

    commentsCount: {
        type: Number,
        default: 0
    },

    language: {
        type: String,
        default: "English"
    },

    status: {
        type: String,
        enum: [
            "Published",
            "Draft",
            "Archived"
        ],
        default: "Published"
    },

    officialLink: String,

    pdf: String

},
{
    timestamps: true
});

module.exports = mongoose.model("News", newsSchema);