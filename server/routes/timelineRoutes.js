const express = require("express");
const router = express.Router();

const Timeline = require("../models/Timeline");

// ==========================================
// Search By Keyword
// GET /api/timeline/search/keyword?keyword=Modi
// ==========================================
router.get("/search/keyword", async (req, res) => {
    try {

        const keyword = req.query.keyword;

        const events = await Timeline.find({
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
                { tags: { $regex: keyword, $options: "i" } }
            ]
        });

        res.json(events);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ==========================================
// Important Events
// ==========================================
router.get("/important/all", async (req, res) => {
    try {

        const events = await Timeline.find({
            isImportant: true
        }).sort({ year: 1 });

        res.json(events);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ==========================================
// Search By Year
// ==========================================
router.get("/year/:year", async (req, res) => {
    try {

        const events = await Timeline.find({
            year: Number(req.params.year)
        });

        res.json(events);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ==========================================
// Search By Category
// ==========================================
router.get("/category/:category", async (req, res) => {
    try {

        const events = await Timeline.find({
            category: req.params.category
        });

        res.json(events);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ==========================================
// Get All Timeline Events
// ==========================================
router.get("/", async (req, res) => {
    try {

        const timeline = await Timeline.find().sort({ year: 1 });

        res.json(timeline);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ==========================================
// Get Event By ID
// KEEP THIS LAST
// ==========================================
router.get("/:id", async (req, res) => {
    try {

        const event = await Timeline.findById(req.params.id);

        if (!event) {
            return res.status(404).json({
                message: "Timeline event not found"
            });
        }

        res.json(event);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;