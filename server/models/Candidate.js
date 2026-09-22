const mongoose = require("mongoose");

/* =========================
   POLITICAL JOURNEY
========================= */

const politicalJourneySchema = new mongoose.Schema(
    {
        year: {
            type: String,
            required: true
        },

        title: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        }
    },
    { _id: false }
);


/* =========================
   POLITICAL PRIORITY
========================= */

const prioritySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        }
    },
    { _id: false }
);


/* =========================
   ELECTORAL RECORD
========================= */

const electoralRecordSchema = new mongoose.Schema(
    {
        year: Number,

        election: String,

        constituency: String,

        party: String,

        result: String,

        votes: Number,

        voteShare: Number
    },
    { _id: false }
);


/* =========================
   POSITIONS HELD
========================= */

const positionSchema = new mongoose.Schema(
    {
        position: String,

        from: String,

        to: String
    },
    { _id: false }
);


/* =========================
   CRITICISM
========================= */

const criticismSchema = new mongoose.Schema(
    {
        title: String,

        description: String,

        year: Number,

        category: String,

        response: String,

        source: String,

        sourceUrl: String
    },
    { _id: false }
);


/* =========================
   SOURCE
========================= */

const sourceSchema = new mongoose.Schema(
    {
        title: String,

        url: String
    },
    { _id: false }
);


/* =========================
   CANDIDATE
========================= */

const CandidateSchema = new mongoose.Schema(
    {

        /* ---------- BASIC INFORMATION ---------- */

        name: {
            type: String,
            required: true,
            trim: true
        },

        party: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Party"
        },

        state: {
            type: String,
            trim: true
        },

        constituency: {
            type: String,
            trim: true
        },

        position: {
            type: String,
            trim: true
        },

        age: Number,

        education: String,

        profession: String,

        experience: String,

        image: String,


        /* ---------- ABOUT ---------- */

        biography: String,

        earlyLife: String,


        /* ---------- POLITICAL JOURNEY ---------- */

        politicalJourney: {
            type: [politicalJourneySchema],
            default: []
        },


        /* ---------- PARTY ASSOCIATION ---------- */

        partyAssociation: String,

        partyReason: String,

        politicalMotivation: String,


        /* ---------- POLITICAL PRIORITIES ---------- */

        priorities: {
            type: [prioritySchema],
            default: []
        },


        /* ---------- ACHIEVEMENTS ---------- */

        achievements: {
            type: [String],
            default: []
        },


        /* ---------- ELECTORAL RECORD ---------- */

        electoralRecord: {
            type: [electoralRecordSchema],
            default: []
        },


        /* ---------- POSITIONS ---------- */

        positionsHeld: {
            type: [positionSchema],
            default: []
        },


        /* ---------- CRITICISM ---------- */

        criticisms: {
            type: [criticismSchema],
            default: []
        },


        /* ---------- CONTROVERSIES ---------- */

        controversies: {
            type: [String],
            default: []
        },


        /* ---------- PUBLICATIONS ---------- */

        publications: {
            type: [String],
            default: []
        },


        /* ---------- OFFICIAL WEBSITE ---------- */

        officialWebsite: String,


        /* ---------- SOCIAL MEDIA ---------- */

        socialMedia: {

            website: String,

            twitter: String,

            facebook: String,

            instagram: String,

            youtube: String
        },


        /* ---------- SOURCES ---------- */

        sources: {
            type: [sourceSchema],
            default: []
        }

    },

    {
        timestamps: true
    }
);


module.exports = mongoose.model("Candidate", CandidateSchema);