const express = require("express");
const router = express.Router();

const Manifesto = require("../models/Manifesto");

// ======================================
// GET ALL MANIFESTOS
// ======================================
router.get("/", async (req, res) => {

    try {

        const manifestos = await Manifesto.find()
            .populate("party");

        res.json(manifestos);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});

// ======================================
// SEARCH MANIFESTOS
// ======================================
router.get("/search", async (req, res) => {

    try {

        const {
            year,
            party,
            type,
            theme
        } = req.query;

        let query = {};

        if (year)
            query.electionYear = Number(year);

        if (party)
            query.partyName = {
                $regex: party,
                $options: "i"
            };

        if (type)
            query.electionType = {
                $regex: type,
                $options: "i"
            };

        if (theme)
            query.theme = {
                $regex: theme,
                $options: "i"
            };

        const manifestos = await Manifesto.find(query)
            .populate("party");

        res.json(manifestos);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});

// ======================================
// GET LATEST MANIFESTOS
// ======================================
router.get("/latest", async (req, res) => {

    try {

        const manifestos = await Manifesto.find()
            .sort({
                electionYear: -1
            })
            .limit(10)
            .populate("party");

        res.json(manifestos);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});

// ======================================
// GET MANIFESTOS BY PARTY
// ======================================
router.get("/party/:partyName", async (req, res) => {

    try {

        const manifestos = await Manifesto.find({

            partyName: {
                $regex: `^${req.params.partyName}$`,
                $options: "i"
            }

        }).populate("party");

        res.json(manifestos);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});

// ======================================
// GET MANIFESTOS BY YEAR
// ======================================
router.get("/year/:year", async (req, res) => {

    try {

        const manifestos = await Manifesto.find({

            electionYear: Number(req.params.year)

        }).populate("party");

        res.json(manifestos);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});

// ======================================
// GET SINGLE MANIFESTO
// ======================================
router.get("/:id", async (req, res) => {

    try {

        const manifesto = await Manifesto.findById(req.params.id)
            .populate("party");

        if (!manifesto) {

            return res.status(404).json({
                message: "Manifesto not found"
            });

        }

        res.json(manifesto);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});

module.exports = router;