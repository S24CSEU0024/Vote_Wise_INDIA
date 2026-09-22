const express = require("express");
const router = express.Router();

const Scheme = require("../models/Scheme");

// ==========================================
// GET ALL SCHEMES
// ==========================================
router.get("/", async (req, res) => {

    try {

        const schemes = await Scheme.find();

        res.json(schemes);

    }

    catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});

// ==========================================
// SEARCH SCHEMES
// ==========================================
router.get("/search", async (req, res) => {

    try {

        const {
            name,
            state,
            category,
            party,
            year
        } = req.query;

        let query = {};

        if (name) {

            query.name = {
                $regex: name,
                $options: "i"
            };

        }

        if (state) {

            query.applicableStates = {
                $regex: state,
                $options: "i"
            };

        }

        if (category) {

            query.category = {
                $regex: category,
                $options: "i"
            };

        }

        if (party) {

            query.party = {
                $regex: party,
                $options: "i"
            };

        }

        if (year) {

            query.launchedYear = Number(year);

        }

        const schemes = await Scheme.find(query);

        res.json(schemes);

    }

    catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});

// ==========================================
// LATEST SCHEMES
// ==========================================
router.get("/latest", async (req, res) => {

    try {

        const schemes = await Scheme.find()
            .sort({
                launchedYear: -1
            })
            .limit(10);

        res.json(schemes);

    }

    catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});

// ==========================================
// CATEGORY
// ==========================================
router.get("/category/:category", async (req, res) => {

    try {

        const schemes = await Scheme.find({

            category: {
                $regex: req.params.category,
                $options: "i"
            }

        });

        res.json(schemes);

    }

    catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});

// ==========================================
// PARTY
// ==========================================
router.get("/party/:party", async (req, res) => {

    try {

        const schemes = await Scheme.find({

            party: {
                $regex: req.params.party,
                $options: "i"
            }

        });

        res.json(schemes);

    }

    catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});

// ==========================================
// STATE
// ==========================================
router.get("/state/:state", async (req, res) => {

    try {

        const schemes = await Scheme.find({

            applicableStates: {
                $regex: req.params.state,
                $options: "i"
            }

        });

        res.json(schemes);

    }

    catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});

// ==========================================
// GET SCHEME BY ID
// ==========================================
router.get("/:id", async (req, res) => {

    try {

        const scheme = await Scheme.findById(req.params.id);

        if (!scheme) {

            return res.status(404).json({
                message: "Scheme not found"
            });

        }

        res.json(scheme);

    }

    catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});

module.exports = router;