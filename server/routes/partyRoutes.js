const express = require("express");
const router = express.Router();

const Party = require("../models/Party");


// Get all parties
router.get("/", async (req, res) => {
    try {
        const parties = await Party.find();
        res.json(parties);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


// Get party by ID
router.get("/:id", async (req, res) => {
    try {

        const party = await Party.findById(req.params.id);

        if (!party) {
            return res.status(404).json({
                message: "Party not found"
            });
        }

        res.json(party);

    } catch(error) {

        res.status(500).json({
            message: error.message
        });

    }
});


module.exports = router;