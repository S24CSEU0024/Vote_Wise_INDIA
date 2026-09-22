const fs = require("fs");
const path = require("path");


// Path of party JSON folder

const partiesFolder = path.join(
    __dirname,
    "../data/parties"
);


// Read all files

const partyFiles = fs.readdirSync(partiesFolder);


// Store all parties

const parties = [];


// Load every JSON file

partyFiles.forEach((file)=>{

    if(file.endsWith(".json") && file !== "template.json"){

        const filePath = path.join(
            partiesFolder,
            file
        );


        const partyData = JSON.parse(
            fs.readFileSync(filePath,"utf-8")
        );


        parties.push(partyData);

    }

});


// Export all parties

module.exports = parties;