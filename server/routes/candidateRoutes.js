const express = require("express");
const router = express.Router();

const Candidate = require("../models/Candidate");


/* =====================================================
   GET ALL CANDIDATES
   GET /api/candidates
===================================================== */

router.get("/", async (req, res) => {

    try {

        const candidates = await Candidate.find()
            .populate("party")
            .lean();

        res.json(candidates);

    } catch (error) {

        console.error("Error fetching candidates:", error);

        res.status(500).json({
            message: "Unable to load candidates",
            error: error.message
        });
    }
});


/* =====================================================
   GET SINGLE CANDIDATE
   GET /api/candidates/:id
===================================================== */

router.get("/:id", async (req, res) => {

    try {

        const candidate = await Candidate.findById(req.params.id)
            .populate("party")
            .lean();

        if (!candidate) {

            return res.status(404).json({
                message: "Candidate not found"
            });
        }

        res.json(candidate);

    } catch (error) {

        console.error("Error fetching candidate:", error);

        res.status(500).json({
            message: "Unable to load candidate",
            error: error.message
        });
    }
});


/* =====================================================
   SEARCH CANDIDATES
   GET /api/candidates/search/:keyword
===================================================== */

router.get("/search/:keyword", async (req, res) => {

    try {

        const keyword = req.params.keyword;

        const candidates = await Candidate.find({
            $or: [
                {
                    name: {
                        $regex: keyword,
                        $options: "i"
                    }
                },
                {
                    state: {
                        $regex: keyword,
                        $options: "i"
                    }
                },
                {
                    constituency: {
                        $regex: keyword,
                        $options: "i"
                    }
                }
            ]
        })
            .populate("party")
            .lean();

        res.json(candidates);

    } catch (error) {

        console.error("Candidate search error:", error);

        res.status(500).json({
            message: "Search failed",
            error: error.message
        });
    }
});


module.exports = router;