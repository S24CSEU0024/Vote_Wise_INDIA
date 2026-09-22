const Candidate = require("../models/Candidate");
const Party = require("../models/Party");

// Add Candidate
exports.addCandidate = async (req, res) => {
    try {
        const candidate = await Candidate.create(req.body);
        res.status(201).json(candidate);
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};

// Get All Candidates
exports.getAllCandidates = async (req, res) => {
    try {
        const candidates = await Candidate.find().populate("party");
        res.json(candidates);
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};

// Get Candidate By ID
exports.getCandidateById = async (req, res) => {
    try {
        const candidate = await Candidate.findById(req.params.id).populate("party");

        if (!candidate) {
            return res.status(404).json({
                message: "Candidate not found"
            });
        }

        res.json(candidate);

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};

// Search Candidate by Name
exports.searchCandidates = async (req, res) => {
    try {
        const candidates = await Candidate.find({
            name: {
                $regex: req.query.name,
                $options: "i"
            }
        }).populate("party");

        res.json(candidates);

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};

// Filter by State
exports.getCandidatesByState = async (req, res) => {
    try {
        const candidates = await Candidate.find({
            state: req.params.state
        }).populate("party");

        res.json(candidates);

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};

// Filter by Party (using shortName like BJP, AAP, INC)
exports.getCandidatesByParty = async (req, res) => {
    try {

        const party = await Party.findOne({
            shortName: req.params.party
        });

        if (!party) {
            return res.status(404).json({
                message: "Party not found"
            });
        }

        const candidates = await Candidate.find({
            party: party._id
        }).populate("party");

        res.json(candidates);

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};

// Filter by Position
exports.getCandidatesByPosition = async (req, res) => {
    try {

        const candidates = await Candidate.find({
            position: req.params.position
        }).populate("party");

        res.json(candidates);

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};

// Filter by Constituency
exports.getCandidatesByConstituency = async (req, res) => {
    try {

        const candidates = await Candidate.find({
            constituency: req.params.constituency
        }).populate("party");

        res.json(candidates);

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};

// Filter by Age
exports.getCandidatesByAge = async (req, res) => {
    try {

        const candidates = await Candidate.find({
            age: req.params.age
        }).populate("party");

        res.json(candidates);

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};