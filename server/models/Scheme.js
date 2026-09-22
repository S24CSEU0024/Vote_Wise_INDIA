const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema(
    {
        question: {
            type: String
        },

        answer: {
            type: String
        }
    },
    {
        _id: false
    }
);

const schemeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        shortName: {
            type: String,
            trim: true
        },

        description: {
            type: String,
            required: true
        },

        launchedYear: {
            type: Number
        },

        launchedDate: {
            type: String
        },

        launchedBy: {
            type: String
        },

        government: {
            type: String
        },

        party: {
            type: String
        },

        category: {
            type: String,
            enum: [
                "Health",
                "Education",
                "Agriculture",
                "Housing",
                "Women Empowerment",
                "Employment",
                "Insurance",
                "Pension",
                "Finance",
                "Digital",
                "Energy",
                "Water",
                "Sanitation",
                "Social Welfare",
                "MSME",
                "Governance",
                "Infrastructure",
                "Skill Development",
                "Other"
            ],
            default: "Other"
        },

        beneficiaries: [
            {
                type: String
            }
        ],

        eligibility: [
            {
                type: String
            }
        ],

        benefits: [
            {
                type: String
            }
        ],

        requiredDocuments: [
            {
                type: String
            }
        ],

        applicationProcess: [
            {
                type: String
            }
        ],

        budget: {
            type: String
        },

        status: {
            type: String,
            enum: [
                "Active",
                "Inactive",
                "Discontinued"
            ],
            default: "Active"
        },

        applicableStates: [
            {
                type: String
            }
        ],

        officialWebsite: {
            type: String
        },

        image: {
            type: String
        },

        faqs: [faqSchema]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Scheme", schemeSchema);