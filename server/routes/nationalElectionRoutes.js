const express = require("express");

const router = express.Router();

const NationalElection =
    require("../models/NationalElection");


// GET ALL
router.get("/", async (req, res) => {

    try {

        const elections =
            await NationalElection
                .find()
                .sort({ year: 1 });

        res.json(elections);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});


// GET BY YEAR
router.get("/year/:year", async (req, res) => {

    try {

        const election =
            await NationalElection.findOne({
                year: Number(req.params.year)
            });

        if (!election) {

            return res.status(404).json({
                success: false,
                message: "Election not found"
            });

        }

        res.json(election);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});


// GET BY PARTY
router.get("/party/:party", async (req, res) => {

    try {

        const elections =
            await NationalElection.find({
                winningParty: {
                    $regex: req.params.party,
                    $options: "i"
                }
            });

        res.json(elections);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});


module.exports = router;
