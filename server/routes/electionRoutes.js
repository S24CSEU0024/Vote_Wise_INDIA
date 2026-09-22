const express = require("express");
const router = express.Router();

const Election = require("../models/Election");

// ======================
// Get all elections
// ======================
router.get("/", async (req, res) => {
    try {

        const elections = await Election.find()
            .populate("winner")
            .populate("runnerUp")
            .populate("winnerParty")
            .populate("runnerUpParty")
            .populate("candidateResults.candidate")
            .populate("candidateResults.party");

        res.json(elections);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
});
router.get("/search", async (req, res) => {

    try {

        const {
            year,
            state,
            constituency,
            type,
            party,
            winner
        } = req.query;

        let query = {};

        if (year)
            query.year = Number(year);

        if (state)
            query.state = {
                $regex: state,
                $options: "i"
            };

        if (constituency)
            query.constituency = {
                $regex: constituency,
                $options: "i"
            };

        if (type)
            query.electionType = {
                $regex: type,
                $options: "i"
            };

        if (party) {
    query.$or = [
        {
            winnerPartyName: {
                $regex: party,
                $options: "i"
            }
        },
        {
            runnerUpPartyName: {
                $regex: party,
                $options: "i"
            }
        }
    ];
}

        if (winner)
            query.winnerName = {
                $regex: winner,
                $options: "i"
            };

        const elections = await Election.find(query)
            .populate("winner")
            .populate("runnerUp")
            .populate("winnerParty")
            .populate("runnerUpParty")
            .populate("candidateResults.candidate")
            .populate("candidateResults.party");

        res.json(elections);

    }

    catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});

// ======================
// Get Election By ID
// ======================
router.get("/:id", async (req, res) => {

    try {

        const election = await Election.findById(req.params.id)
            .populate("winner")
            .populate("runnerUp")
            .populate("winnerParty")
            .populate("runnerUpParty")
            .populate("candidateResults.candidate")
            .populate("candidateResults.party");

        if (!election) {
            return res.status(404).json({
                message: "Election not found"
            });
        }

        res.json(election);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});

module.exports = router;