const Party = require("../models/Party");


// Get all parties

exports.getAllParties = async (req,res)=>{

    try{

        const parties = await Party.find();

        res.json(parties);

    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};




// Get single party

exports.getPartyByName = async(req,res)=>{

    try{

        const party = await Party.findOne({
            shortName:req.params.shortName.toUpperCase()
        });


        if(!party){

            return res.status(404).json({
                message:"Party not found"
            });

        }


        res.json(party);

    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};




// Search parties

exports.searchParty = async(req,res)=>{

    try{

        const keyword=req.query.name;


        const parties =
        await Party.find({

            name:{
                $regex:keyword,
                $options:"i"
            }

        });


        res.json(parties);

    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};




// Filter by state

exports.getPartyByState = async(req,res)=>{

    try{

        const parties =
        await Party.find({

            "statesGoverned.state":
            {
                $regex:req.params.state,
                $options:"i"
            }

        });


        res.json(parties);

    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};