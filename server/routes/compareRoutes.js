const express = require("express");
const router = express.Router();

const Party = require("../models/Party");
const Manifesto = require("../models/Manifesto");
const Scheme = require("../models/Scheme");
const Election = require("../models/Election");

// ==========================================
// COMPARE TWO PARTIES
// GET /api/compare/parties?party1=BJP&party2=INC
// ==========================================

router.get("/parties", async (req, res) => {

    try {

        const { party1, party2 } = req.query;

        if (!party1 || !party2) {
            return res.status(400).json({
                message: "Please provide party1 and party2"
            });
        }

        // Find parties
        const firstParty = await Party.findOne({
            shortName: {
                $regex: `^${party1}$`,
                $options: "i"
            }
        });

        const secondParty = await Party.findOne({
            shortName: {
                $regex: `^${party2}$`,
                $options: "i"
            }
        });

        if (!firstParty || !secondParty) {
            return res.status(404).json({
                message: "One or both parties not found"
            });
        }

        // Find manifestos
        const firstManifestos = await Manifesto.find({
            party: firstParty._id
        }).sort({ electionYear: -1 });

        const secondManifestos = await Manifesto.find({
            party: secondParty._id
        }).sort({ electionYear: -1 });

        // Find schemes associated with each party
        const firstSchemes = await Scheme.find({
            party: {
                $regex: `^${firstParty.shortName}$`,
                $options: "i"
            }
        });

        const secondSchemes = await Scheme.find({
            party: {
                $regex: `^${secondParty.shortName}$`,
                $options: "i"
            }
        });

        res.json({

            comparison: {

                party1: {
                    details: firstParty,
                    manifesto: firstManifestos,
                    schemes: firstSchemes
                },

                party2: {
                    details: secondParty,
                    manifesto: secondManifestos,
                    schemes: secondSchemes
                }

            }

        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: err.message
        });

    }

});

module.exports = router;