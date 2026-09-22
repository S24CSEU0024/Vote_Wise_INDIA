const express = require("express");
const router = express.Router();

const Constituency = require("../models/Constituency");

// ======================================
// Get All Constituencies
// ======================================

router.get("/", async (req, res) => {

    try {

        const constituencies = await Constituency.find()
            .populate("currentMP")
            .populate("currentParty")
            .populate("previousMP")
            .populate("previousParty");

        res.json(constituencies);

    }

    catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});

// ======================================
// Search Constituencies
// ======================================

router.get("/search", async (req, res) => {

    try {

        const {
            name,
            state,
            district,
            type
        } = req.query;

        let query = {};

        if (name)
            query.name = {
                $regex: name,
                $options: "i"
            };

        if (state)
            query.state = {
                $regex: state,
                $options: "i"
            };

        if (district)
            query.district = {
                $regex: district,
                $options: "i"
            };

        if (type)
            query.type = type;

        const constituencies = await Constituency.find(query)
            .populate("currentMP")
            .populate("currentParty")
            .populate("previousMP")
            .populate("previousParty");

        res.json(constituencies);

    }

    catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});

// ======================================
// Get by State
// ======================================

router.get("/state/:state", async (req, res) => {

    try {

        const constituencies = await Constituency.find({

            state: {
                $regex: req.params.state,
                $options: "i"
            }

        })

        .populate("currentMP")
        .populate("currentParty");

        res.json(constituencies);

    }

    catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});

// ======================================
// Get by Reservation Type
// ======================================

router.get("/type/:type", async (req, res) => {

    try {

        const constituencies = await Constituency.find({

            type: req.params.type

        })

        .populate("currentMP")
        .populate("currentParty");

        res.json(constituencies);

    }

    catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});

// ======================================
// Get by ID
// ======================================

router.get("/:id", async (req, res) => {

    try {

        const constituency = await Constituency.findById(req.params.id)

            .populate("currentMP")
            .populate("currentParty")
            .populate("previousMP")
            .populate("previousParty");

        if (!constituency) {

            return res.status(404).json({

                message: "Constituency not found"

            });

        }

        res.json(constituency);

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

});

module.exports = router;