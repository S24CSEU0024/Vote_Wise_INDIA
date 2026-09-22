const express = require("express");
const router = express.Router();

const Party = require("../models/Party");
const Scheme = require("../models/Scheme");
const Manifesto = require("../models/Manifesto");
const Election = require("../models/Election");
const Timeline = require("../models/Timeline");
const News = require("../models/News");


// =====================================================
// Convert MongoDB document into searchable text
// =====================================================

function flattenObject(obj) {

    // Convert Mongoose document into a plain JavaScript object
    const plainObject = obj.toObject
        ? obj.toObject()
        : obj;

    let text = "";

    function walk(value, depth = 0) {

        // Safety limit to prevent infinite recursion
        if (depth > 10) {
            return;
        }

        if (value === null || value === undefined) {
            return;
        }

        // Ignore Mongoose/ObjectId internals
        if (
            typeof value === "string" ||
            typeof value === "number" ||
            typeof value === "boolean"
        ) {
            text += " " + String(value);
            return;
        }

        if (Array.isArray(value)) {

            value.forEach(item => {
                walk(item, depth + 1);
            });

            return;
        }

        if (typeof value === "object") {

            Object.entries(value).forEach(([key, item]) => {

                // Don't recursively inspect MongoDB internal fields
                if (
                    key === "_id" ||
                    key === "__v" ||
                    key === "$__" ||
                    key === "$isNew"
                ) {
                    return;
                }

                // Include the field name too
                text += " " + key;

                walk(item, depth + 1);

            });

        }

    }

    walk(plainObject);

    return text.toLowerCase();
}


// =====================================================
// Search documents
// =====================================================

function findRelevantDocuments(documents, message) {

    const query = message
        .toLowerCase()
        .replace(/[^\w\s-]/g, " ")
        .trim();

    const words = query
        .split(/\s+/)
        .filter(word => word.length >= 2);


    const results = documents.map(doc => {

        const text = flattenObject(doc);

        let score = 0;


        // Exact phrase gets a strong score
        if (text.includes(query)) {
            score += 10;
        }


        // Individual words
        words.forEach(word => {

            if (text.includes(word)) {
                score += 2;
            }

        });


        // Important political party keywords
        if (
            query.includes("bjp") &&
            text.includes("bjp")
        ) {
            score += 20;
        }


        if (
            query.includes("congress") &&
            (
                text.includes("congress") ||
                text.includes("inc")
            )
        ) {
            score += 20;
        }


        if (
            query.includes("aap") &&
            text.includes("aap")
        ) {
            score += 20;
        }


        return {
            doc,
            score
        };

    });


    return results

        .filter(item => item.score > 0)

        .sort((a, b) => b.score - a.score)

        .slice(0, 5)

        .map(item => item.doc);
}

// =====================================================
// Format MongoDB document
// =====================================================

function formatDocument(doc) {

    const data = doc.toObject
        ? doc.toObject()
        : doc;

    delete data._id;
    delete data.__v;

    let response = "";

    Object.entries(data).forEach(([key, value]) => {

        if (
            value === null ||
            value === undefined ||
            key === "createdAt" ||
            key === "updatedAt"
        ) {
            return;
        }


        const formattedKey = key
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, char => char.toUpperCase());


        if (Array.isArray(value)) {

            response +=
                `\n• ${formattedKey}: ${value.join(", ")}`;

        }

        else if (typeof value === "object") {

            response +=
                `\n• ${formattedKey}: ${JSON.stringify(value)}`;

        }

        else {

            response +=
                `\n• ${formattedKey}: ${value}`;

        }

    });

    return response;
}


// =====================================================
// SPECIAL KEYWORD DETECTION
// =====================================================

function detectCategory(message) {

    const query = message.toLowerCase();

    if (
        query.includes("bjp") ||
        query.includes("bharatiya janata")
    ) {
        return "party";
    }

    if (
        query.includes("congress") ||
        query.includes("inc") ||
        query.includes("indian national congress")
    ) {
        return "party";
    }

    if (
        query.includes("aap") ||
        query.includes("aam aadmi")
    ) {
        return "party";
    }

    if (
        query.includes("scheme") ||
        query.includes("yojana") ||
        query.includes("pm-kisan") ||
        query.includes("pm kisan") ||
        query.includes("ayushman")
    ) {
        return "scheme";
    }

    if (
        query.includes("manifesto") ||
        query.includes("manifestos")
    ) {
        return "manifesto";
    }

    if (
        query.includes("election") ||
        query.includes("lok sabha") ||
        query.includes("assembly")
    ) {
        return "election";
    }

    if (
        query.includes("history") ||
        query.includes("historical") ||
        query.includes("timeline")
    ) {
        return "timeline";
    }

    if (
        query.includes("news") ||
        query.includes("latest")
    ) {
        return "news";
    }

    return "all";
}


// =====================================================
// POST /api/ai/chat
// =====================================================

router.post("/chat", async (req, res) => {

    try {

        const { message } = req.body;


        // ---------------------------------------------
        // Validate message
        // ---------------------------------------------

        if (
            !message ||
            typeof message !== "string" ||
            !message.trim()
        ) {

            return res.status(400).json({

                success: false,

                message: "Please enter a question."

            });

        }


        const query = message.trim().toLowerCase();


        console.log("🤖 User Question:", message);


        // ---------------------------------------------
        // Detect category
        // ---------------------------------------------

        const category = detectCategory(query);

        console.log("🔎 Detected category:", category);


        // ---------------------------------------------
        // Load database
        // ---------------------------------------------

        let parties = [];
        let schemes = [];
        let manifestos = [];
        let elections = [];
        let timelines = [];
        let news = [];


        if (category === "party" || category === "all") {

            parties = await Party.find()
                .limit(200);

        }


        if (category === "scheme" || category === "all") {

            schemes = await Scheme.find()
                .limit(200);

        }


        if (category === "manifesto" || category === "all") {

            manifestos = await Manifesto.find()
                .limit(200);

        }


        if (category === "election" || category === "all") {

            elections = await Election.find()
                .limit(200);

        }


        if (category === "timeline" || category === "all") {

            timelines = await Timeline.find()
                .limit(500);

        }


        if (category === "news" || category === "all") {

            news = await News.find()
                .limit(200);

        }


        // ---------------------------------------------
        // Search
        // ---------------------------------------------

        let results = [];


        if (parties.length) {

            results.push(
                ...findRelevantDocuments(parties, query)
                    .map(doc => ({
                        type: "🏛️ Political Party",
                        doc
                    }))
            );

        }


        if (schemes.length) {

            results.push(
                ...findRelevantDocuments(schemes, query)
                    .map(doc => ({
                        type: "🏦 Government Scheme",
                        doc
                    }))
            );

        }


        if (manifestos.length) {

            results.push(
                ...findRelevantDocuments(manifestos, query)
                    .map(doc => ({
                        type: "📜 Party Manifesto",
                        doc
                    }))
            );

        }


        if (elections.length) {

            results.push(
                ...findRelevantDocuments(elections, query)
                    .map(doc => ({
                        type: "🗳️ Election",
                        doc
                    }))
            );

        }


        if (timelines.length) {

            results.push(
                ...findRelevantDocuments(timelines, query)
                    .map(doc => ({
                        type: "📅 Political History",
                        doc
                    }))
            );

        }


        if (news.length) {

            results.push(
                ...findRelevantDocuments(news, query)
                    .map(doc => ({
                        type: "📰 Political News",
                        doc
                    }))
            );

        }


        // ---------------------------------------------
        // Remove duplicate documents
        // ---------------------------------------------

        const used = new Set();

        results = results.filter(result => {

            const id = result.doc._id?.toString();

            if (!id) {
                return true;
            }

            if (used.has(id)) {
                return false;
            }

            used.add(id);

            return true;

        });


        // ---------------------------------------------
        // Nothing found
        // ---------------------------------------------

        if (results.length === 0) {

            return res.json({

                success: true,

                reply:
`🇮🇳 VoteWise AI

I couldn't find this information in the VoteWise India database.

You can ask me about:

🏛️ Political parties
📜 Party manifestos
🏦 Government schemes
🗳️ Elections
📰 Political news
📅 Political history
⚖️ Party comparisons

Try:

• Tell me about BJP
• What is PM-KISAN?
• Tell me about the BJP manifesto
• Tell me about the 2024 election
• Show political history`

            });

        }


        // ---------------------------------------------
        // Build answer
        // ---------------------------------------------

        let reply =
`🇮🇳 VoteWise AI

Based on the information available in the VoteWise India database:

`;


        results
            .slice(0, 5)
            .forEach(result => {

                reply +=
                    `\n\n### ${result.type}\n`;

                reply +=
                    formatDocument(result.doc);

            });


        reply +=
`

---
📚 Source: VoteWise India database`;


        console.log("✅ AI Response Generated");


        return res.json({

            success: true,

            reply

        });


    }

    catch (error) {

        console.error(
            "❌ VoteWise AI Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "VoteWise AI is currently unavailable.",

            error:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : undefined

        });

    }

});


module.exports = router;