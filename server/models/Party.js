const mongoose = require("mongoose");

/*
|--------------------------------------------------------------------------
| Election Result
|--------------------------------------------------------------------------
*/

const electionSchema = new mongoose.Schema(
    {
        year: Number,

        electionType: String,

        alliance: String,

        seatsWon: Number,

        voteShare: Number,

        governmentFormed: Boolean
    },
    { _id: false }
);


/*
|--------------------------------------------------------------------------
| State Government
|--------------------------------------------------------------------------
*/

const stateSchema = new mongoose.Schema(
    {
        state: String,

        chiefMinister: String,

        status: String
    },
    { _id: false }
);


/*
|--------------------------------------------------------------------------
| FAQ
|--------------------------------------------------------------------------
*/

const faqSchema = new mongoose.Schema(
    {
        question: String,

        answer: String
    },
    { _id: false }
);


/*
|--------------------------------------------------------------------------
| Party Timeline
|--------------------------------------------------------------------------
| Example:
|
| {
|   year: "1980",
|   title: "Party Founded",
|   description: "..."
| }
|
*/

const timelineSchema = new mongoose.Schema(
    {
        year: String,

        title: String,

        description: String
    },
    { _id: false }
);


/*
|--------------------------------------------------------------------------
| Party Promise / Manifesto Commitment
|--------------------------------------------------------------------------
| Used for:
| - What the party promised
| - What action was taken
| - Current status
| - Evidence
| - Source
|
*/

const promiseSchema = new mongoose.Schema(
    {
        year: Number,

        election: String,

        category: String,

        title: String,

        promise: String,

        actionTaken: String,

        status: {
            type: String,

            enum: [
                "Completed",
                "Partially Completed",
                "In Progress",
                "Not Started",
                "Unable to Verify"
            ],

            default: "Unable to Verify"
        },

        evidence: String,

        source: String,

        sourceUrl: String,

        lastVerified: Date
    },
    { _id: false }
);


/*
|--------------------------------------------------------------------------
| Major Scheme / Policy
|--------------------------------------------------------------------------
| Allows both a simple name and a detailed description.
|--------------------------------------------------------------------------
*/

const schemeSchema = new mongoose.Schema(
    {
        name: String,

        title: String,

        description: String,

        year: Number,

        category: String,

        status: String,

        source: String,

        sourceUrl: String
    },
    { _id: false }
);


/*
|--------------------------------------------------------------------------
| State / Political Dispute
|--------------------------------------------------------------------------
*/

const protestSchema = new mongoose.Schema(
    {
        title: String,

        year: Number,

        description: String,

        issue: String,

        outcome: String,

        source: String,

        sourceUrl: String
    },
    { _id: false }
);


/*
|--------------------------------------------------------------------------
| Party Criticism
|--------------------------------------------------------------------------
*/

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


/*
|--------------------------------------------------------------------------
| Social Media
|--------------------------------------------------------------------------
*/

const socialMediaSchema = new mongoose.Schema(
    {
        website: String,

        twitter: String,

        facebook: String,

        instagram: String,

        youtube: String
    },
    { _id: false }
);


/*
|--------------------------------------------------------------------------
| Main Party Schema
|--------------------------------------------------------------------------
*/

const partySchema = new mongoose.Schema(
    {

        /*
        |--------------------------------------------------------------------------
        | Basic Information
        |--------------------------------------------------------------------------
        */

        name: {
            type: String,
            required: true,
            trim: true
        },

        shortName: {
            type: String,
            trim: true
        },

        description: {
            type: String
        },


        /*
        |--------------------------------------------------------------------------
        | Branding
        |--------------------------------------------------------------------------
        */

        logo: String,

        partyFlag: String,

        symbolName: String,

        symbolImage: String,

        themeColor: String,


        /*
        |--------------------------------------------------------------------------
        | History
        |--------------------------------------------------------------------------
        */

        founded: String,

        founders: [String],

        headquarters: String,


        /*
        |--------------------------------------------------------------------------
        | Contact / Official Information
        |--------------------------------------------------------------------------
        */

        website: String,

        email: String,

        phone: String,


        /*
        |--------------------------------------------------------------------------
        | Current Leadership
        |--------------------------------------------------------------------------
        */

        currentLeader: String,

        alliance: String,

        ideology: [String],

        currentPMCandidate: String,


        /*
        |--------------------------------------------------------------------------
        | Ministers
        |--------------------------------------------------------------------------
        */

        ministers: {

            primeMinister: String,

            homeMinister: String,

            financeMinister: String,

            defenceMinister: String,

            educationMinister: String,

            externalAffairsMinister: String
        },


        /*
        |--------------------------------------------------------------------------
        | Major Achievements
        |--------------------------------------------------------------------------
        */

        achievements: [String],


        /*
        |--------------------------------------------------------------------------
        | Criticisms
        |--------------------------------------------------------------------------
        */

        criticisms: [String],


        /*
        |--------------------------------------------------------------------------
        | Protests / Political Disputes
        |--------------------------------------------------------------------------
        */

        protests: [String],


        /*
        |--------------------------------------------------------------------------
        | Major Schemes
        |--------------------------------------------------------------------------
        */

        majorSchemes: [schemeSchema],


        /*
        |--------------------------------------------------------------------------
        | Party Timeline
        |--------------------------------------------------------------------------
        */

        timeline: [timelineSchema],


        /*
        |--------------------------------------------------------------------------
        | Manifesto Promises
        |--------------------------------------------------------------------------
        */

        promises: [promiseSchema],


        /*
        |--------------------------------------------------------------------------
        | Election Results
        |--------------------------------------------------------------------------
        */

        electionResults: [electionSchema],


        /*
        |--------------------------------------------------------------------------
        | States Governed
        |--------------------------------------------------------------------------
        */

        statesGoverned: [stateSchema],


        /*
        |--------------------------------------------------------------------------
        | Media
        |--------------------------------------------------------------------------
        */

        gallery: [String],

        videos: [String],


        /*
        |--------------------------------------------------------------------------
        | Frequently Asked Questions
        |--------------------------------------------------------------------------
        */

        faqs: [faqSchema],


        /*
        |--------------------------------------------------------------------------
        | Candidates
        |--------------------------------------------------------------------------
        */

        candidates: [
            {
                type: mongoose.Schema.Types.ObjectId,

                ref: "Candidate"
            }
        ],


        /*
        |--------------------------------------------------------------------------
        | Social Media
        |--------------------------------------------------------------------------
        */

        socialMedia: socialMediaSchema

    },

    {
        timestamps: true
    }
);


/*
|--------------------------------------------------------------------------
| Export
|--------------------------------------------------------------------------
*/

module.exports = mongoose.model("Party", partySchema);