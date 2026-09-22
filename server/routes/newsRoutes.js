const express = require("express");
const router = express.Router();

const News = require("../models/News");


// ========================================
// Get All News
// ========================================

router.get("/", async (req, res) => {

    try {

        const news = await News.find()
            .populate("party")
            .populate("candidate")
            .populate("election")
            .sort({ publishedDate: -1 });

        res.json(news);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});


// ========================================
// Search & Filter News
// ========================================

router.get("/search", async (req, res) => {

    try {

        const {
            title,
            party,
            state,
            category,
            candidate,
            year
        } = req.query;

        let query = {};

        if (title)
            query.title = {
                $regex: title,
                $options: "i"
            };

        if (party)
            query.partyName = {
                $regex: party,
                $options: "i"
            };

        if (state)
            query.state = {
                $regex: state,
                $options: "i"
            };

        if (category)
            query.category = {
                $regex: category,
                $options: "i"
            };

        if (candidate)
            query.candidateName = {
                $regex: candidate,
                $options: "i"
            };

        if (year)
            query.year = Number(year);

        const news = await News.find(query)
            .populate("party")
            .populate("candidate")
            .populate("election")
            .sort({ publishedDate: -1 });

        res.json(news);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});


// ========================================
// Trending News
// ========================================

router.get("/trending", async (req, res) => {

    try {

        const news = await News.find({
            isTrending: true
        })
        .sort({ views: -1 })
        .populate("party")
        .populate("candidate");

        res.json(news);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});


// ========================================
// Breaking News
// ========================================

router.get("/breaking", async (req, res) => {

    try {

        const news = await News.find({
            isBreaking: true
        })
        .sort({ publishedDate: -1 })
        .populate("party")
        .populate("candidate");

        res.json(news);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});


// ========================================
// Latest News
// ========================================

router.get("/latest", async (req, res) => {

    try {

        const news = await News.find()
            .sort({ publishedDate: -1 })
            .limit(10)
            .populate("party")
            .populate("candidate");

        res.json(news);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});


// ========================================
// Get News By ID
// ========================================

router.get("/:id", async (req, res) => {

    try {

        const news = await News.findById(req.params.id)
            .populate("party")
            .populate("candidate")
            .populate("election");

        if (!news) {

            return res.status(404).json({
                message: "News not found"
            });

        }

        res.json(news);

    }

    catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});

module.exports = router;