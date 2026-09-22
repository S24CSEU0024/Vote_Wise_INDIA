const mongoose = require("mongoose");
require("dotenv").config();

const NationalElection =
    require("../models/NationalElection");

const elections = [

    {
        year: 1951,

        electionName:
            "First Lok Sabha General Election",

        electionType: "Lok Sabha",

        totalSeats: 489,

        winningParty:
            "Indian National Congress",

        winningPartySeats: 364,

        winningAlliance:
            "Indian National Congress",

        primeMinister:
            "Jawaharlal Nehru",

        governmentFormed:
            "Indian National Congress government",

        majorIssues: [
            "Nation building",
            "Economic development",
            "Democracy",
            "Partition and rehabilitation"
        ],

        highlights: [
            "First general election of independent India.",
            "India conducted its first nationwide democratic election.",
            "Jawaharlal Nehru became Prime Minister."
        ],

        historicalSignificance:
            "Established electoral democracy in independent India.",

        officialWebsite:
            "https://eci.gov.in"
    },


    {
        year: 1957,

        electionName:
            "Second Lok Sabha General Election",

        electionType: "Lok Sabha",

        totalSeats: 494,

        winningParty:
            "Indian National Congress",

        winningPartySeats: 371,

        winningAlliance:
            "Indian National Congress",

        primeMinister:
            "Jawaharlal Nehru",

        governmentFormed:
            "Indian National Congress government",

        majorIssues: [
            "Economic planning",
            "Industrialisation",
            "Development",
            "Five Year Plans"
        ],

        highlights: [
            "Congress retained power.",
            "The Second Lok Sabha was constituted.",
            "The second Five Year Plan period began."
        ],

        historicalSignificance:
            "Strengthened India's parliamentary democratic system.",

        officialWebsite:
            "https://eci.gov.in"
    },


    {
        year: 1962,

        electionName:
            "Third Lok Sabha General Election",

        electionType: "Lok Sabha",

        totalSeats: 494,

        winningParty:
            "Indian National Congress",

        winningPartySeats: 361,

        winningAlliance:
            "Indian National Congress",

        primeMinister:
            "Jawaharlal Nehru",

        governmentFormed:
            "Indian National Congress government",

        majorIssues: [
            "Economic development",
            "Industrialisation",
            "National security",
            "Agriculture"
        ],

        highlights: [
            "Congress retained its parliamentary majority.",
            "Jawaharlal Nehru led the government."
        ],

        historicalSignificance:
            "The last general election held during Jawaharlal Nehru's tenure as Prime Minister.",

        officialWebsite:
            "https://eci.gov.in"
    },


    {
        year: 1967,

        electionName:
            "Fourth Lok Sabha General Election",

        electionType: "Lok Sabha",

        totalSeats: 520,

        winningParty:
            "Indian National Congress",

        winningPartySeats: 283,

        winningAlliance:
            "Indian National Congress",

        primeMinister:
            "Indira Gandhi",

        governmentFormed:
            "Indian National Congress government",

        majorIssues: [
            "Economic difficulties",
            "Food shortages",
            "Inflation",
            "Political competition"
        ],

        highlights: [
            "Congress won nationally but lost power in several states.",
            "The election marked increased competition from opposition parties."
        ],

        historicalSignificance:
            "Marked a major turning point in India's electoral politics.",

        officialWebsite:
            "https://eci.gov.in"
    },


    {
        year: 1971,

        electionName:
            "Fifth Lok Sabha General Election",

        electionType: "Lok Sabha",

        totalSeats: 518,

        winningParty:
            "Indian National Congress",

        winningPartySeats: 352,

        winningAlliance:
            "Congress (R)",

        primeMinister:
            "Indira Gandhi",

        governmentFormed:
            "Indian National Congress government",

        majorIssues: [
            "Garibi Hatao",
            "Poverty",
            "Economic development",
            "Social welfare"
        ],

        highlights: [
            "Indira Gandhi's Congress won a large majority.",
            "The election campaign prominently featured the Garibi Hatao slogan."
        ],

        historicalSignificance:
            "Strengthened Indira Gandhi's leadership of the Congress party.",

        officialWebsite:
            "https://eci.gov.in"
    },


    {
        year: 1977,

        electionName:
            "Sixth Lok Sabha General Election",

        electionType: "Lok Sabha",

        totalSeats: 542,

        winningParty:
            "Janata Party",

        winningPartySeats: 295,

        winningAlliance:
            "Janata Party",

        primeMinister:
            "Morarji Desai",

        governmentFormed:
            "Janata Party government",

        majorIssues: [
            "Emergency",
            "Democracy",
            "Civil liberties",
            "Political accountability"
        ],

        highlights: [
            "The Janata Party defeated Congress nationally.",
            "Morarji Desai became Prime Minister."
        ],

        historicalSignificance:
            "First time Congress lost power at the national level after independence.",

        officialWebsite:
            "https://eci.gov.in"
    },


    {
        year: 1980,

        electionName:
            "Seventh Lok Sabha General Election",

        electionType: "Lok Sabha",

        totalSeats: 542,

        winningParty:
            "Indian National Congress (I)",

        winningPartySeats: 353,

        winningAlliance:
            "Congress (I)",

        primeMinister:
            "Indira Gandhi",

        governmentFormed:
            "Indian National Congress government",

        majorIssues: [
            "Political instability",
            "Economic issues",
            "National governance"
        ],

        highlights: [
            "Indira Gandhi returned to power.",
            "The Janata government was replaced."
        ],

        historicalSignificance:
            "Marked the return of Indira Gandhi to the Prime Minister's office.",

        officialWebsite:
            "https://eci.gov.in"
    },


    {
        year: 1984,

        electionName:
            "Eighth Lok Sabha General Election",

        electionType: "Lok Sabha",

        totalSeats: 514,

        winningParty:
            "Indian National Congress",

        winningPartySeats: 404,

        winningAlliance:
            "Congress",

        primeMinister:
            "Rajiv Gandhi",

        governmentFormed:
            "Indian National Congress government",

        majorIssues: [
            "National security",
            "Political stability",
            "Economic development"
        ],

        highlights: [
            "Congress won an exceptionally large majority.",
            "Rajiv Gandhi became Prime Minister."
        ],

        historicalSignificance:
            "One of the largest parliamentary victories achieved by Congress.",

        officialWebsite:
            "https://eci.gov.in"
    },


    {
        year: 1989,

        electionName:
            "Ninth Lok Sabha General Election",

        electionType: "Lok Sabha",

        totalSeats: 529,

        winningParty:
            "Indian National Congress",

        winningPartySeats: 197,

        winningAlliance:
            "National Front",

        primeMinister:
            "V. P. Singh",

        governmentFormed:
            "National Front government",

        majorIssues: [
            "Corruption",
            "Social justice",
            "Bofors controversy",
            "Political reform"
        ],

        highlights: [
            "Congress lost its parliamentary majority.",
            "V. P. Singh became Prime Minister."
        ],

        historicalSignificance:
            "Marked the beginning of the coalition era in Indian national politics.",

        officialWebsite:
            "https://eci.gov.in"
    },


    {
        year: 1991,

        electionName:
            "Tenth Lok Sabha General Election",

        electionType: "Lok Sabha",

        totalSeats: 521,

        winningParty:
            "Indian National Congress",

        winningPartySeats: 232,

        winningAlliance:
            "Congress",

        primeMinister:
            "P. V. Narasimha Rao",

        governmentFormed:
            "Indian National Congress government",

        majorIssues: [
            "Economic crisis",
            "Economic reforms",
            "National security",
            "Political stability"
        ],

        highlights: [
            "P. V. Narasimha Rao became Prime Minister.",
            "The government introduced major economic reforms."
        ],

        historicalSignificance:
            "The election preceded India's major economic liberalisation programme.",

        officialWebsite:
            "https://eci.gov.in"
    },


    {
        year: 1996,

        electionName:
            "Eleventh Lok Sabha General Election",

        electionType: "Lok Sabha",

        totalSeats: 543,

        winningParty:
            "Bharatiya Janata Party",

        winningPartySeats: 161,

        winningAlliance:
            "BJP",

        primeMinister:
            "Atal Bihari Vajpayee",

        governmentFormed:
            "BJP government followed by United Front government",

        majorIssues: [
            "Economic reforms",
            "Coalition politics",
            "Governance"
        ],

        highlights: [
            "BJP emerged as the largest party.",
            "Atal Bihari Vajpayee briefly served as Prime Minister."
        ],

        historicalSignificance:
            "Demonstrated the growing importance of coalition governments.",

        officialWebsite:
            "https://eci.gov.in"
    },


    {
        year: 1998,

        electionName:
            "Twelfth Lok Sabha General Election",

        electionType: "Lok Sabha",

        totalSeats: 543,

        winningParty:
            "Bharatiya Janata Party",

        winningPartySeats: 182,

        winningAlliance:
            "NDA",

        primeMinister:
            "Atal Bihari Vajpayee",

        governmentFormed:
            "NDA government",

        majorIssues: [
            "Coalition politics",
            "National security",
            "Economic development"
        ],

        highlights: [
            "BJP emerged as the largest party.",
            "Atal Bihari Vajpayee formed the government."
        ],

        historicalSignificance:
            "Strengthened the role of the BJP-led NDA in national politics.",

        officialWebsite:
            "https://eci.gov.in"
    },


    {
        year: 1999,

        electionName:
            "Thirteenth Lok Sabha General Election",

        electionType: "Lok Sabha",

        totalSeats: 543,

        winningParty:
            "Bharatiya Janata Party",

        winningPartySeats: 182,

        winningAlliance:
            "NDA",

        primeMinister:
            "Atal Bihari Vajpayee",

        governmentFormed:
            "NDA government",

        majorIssues: [
            "National security",
            "Kargil War",
            "Economic development",
            "Coalition stability"
        ],

        highlights: [
            "NDA formed a stable coalition government.",
            "Atal Bihari Vajpayee continued as Prime Minister."
        ],

        historicalSignificance:
            "Marked the establishment of a relatively stable coalition government.",

        officialWebsite:
            "https://eci.gov.in"
    },


    {
        year: 2004,

        electionName:
            "Fourteenth Lok Sabha General Election",

        electionType: "Lok Sabha",

        totalSeats: 543,

        winningParty:
            "Indian National Congress",

        winningPartySeats: 145,

        winningAlliance:
            "UPA",

        primeMinister:
            "Manmohan Singh",

        governmentFormed:
            "UPA government",

        majorIssues: [
            "Rural development",
            "Employment",
            "Economic growth",
            "Social welfare"
        ],

        highlights: [
            "Congress-led UPA formed the government.",
            "Manmohan Singh became Prime Minister."
        ],

        historicalSignificance:
            "Marked the beginning of the first UPA government.",

        officialWebsite:
            "https://eci.gov.in"
    },


    {
        year: 2009,

        electionName:
            "Fifteenth Lok Sabha General Election",

        electionType: "Lok Sabha",

        totalSeats: 543,

        winningParty:
            "Indian National Congress",

        winningPartySeats: 206,

        winningAlliance:
            "UPA",

        primeMinister:
            "Manmohan Singh",

        governmentFormed:
            "UPA government",

        majorIssues: [
            "Economic development",
            "Inclusive growth",
            "Social welfare",
            "National security"
        ],

        highlights: [
            "Congress increased its seat count.",
            "Manmohan Singh returned as Prime Minister."
        ],

        historicalSignificance:
            "UPA returned to power for a second consecutive term.",

        officialWebsite:
            "https://eci.gov.in"
    },


    {
        year: 2014,

        electionName:
            "Sixteenth Lok Sabha General Election",

        electionType: "Lok Sabha",

        totalSeats: 543,

        winningParty:
            "Bharatiya Janata Party",

        winningPartySeats: 282,

        winningAlliance:
            "NDA",

        primeMinister:
            "Narendra Modi",

        governmentFormed:
            "NDA government",

        majorIssues: [
            "Development",
            "Employment",
            "Corruption",
            "Governance"
        ],

        highlights: [
            "BJP won a single-party majority.",
            "Narendra Modi became Prime Minister."
        ],

        historicalSignificance:
            "First time since 1984 that a single party won a parliamentary majority on its own.",

        officialWebsite:
            "https://eci.gov.in"
    },


    {
        year: 2019,

        electionName:
            "Seventeenth Lok Sabha General Election",

        electionType: "Lok Sabha",

        totalSeats: 543,

        winningParty:
            "Bharatiya Janata Party",

        winningPartySeats: 303,

        winningAlliance:
            "NDA",

        primeMinister:
            "Narendra Modi",

        governmentFormed:
            "NDA government",

        majorIssues: [
            "National security",
            "Development",
            "Employment",
            "Welfare schemes"
        ],

        highlights: [
            "BJP increased its parliamentary majority.",
            "Narendra Modi returned as Prime Minister."
        ],

        historicalSignificance:
            "BJP became the first party after Congress in 1984 to win consecutive single-party majorities.",

        officialWebsite:
            "https://eci.gov.in"
    },


    {
        year: 2024,

        electionName:
            "Eighteenth Lok Sabha General Election",

        electionType: "Lok Sabha",

        totalSeats: 543,

        winningParty:
            "Bharatiya Janata Party",

        winningPartySeats: 240,

        winningAlliance:
            "NDA",

        primeMinister:
            "Narendra Modi",

        governmentFormed:
            "NDA government",

        majorIssues: [
            "Employment",
            "Economic development",
            "Welfare",
            "Infrastructure",
            "National security"
        ],

        highlights: [
            "BJP emerged as the largest party.",
            "NDA formed the government.",
            "Narendra Modi began a third consecutive term as Prime Minister."
        ],

        historicalSignificance:
            "Narendra Modi became one of the few Indian Prime Ministers to begin a third consecutive term.",

        officialWebsite:
            "https://eci.gov.in"
    }

];


async function seed() {

    try {

        await mongoose.connect(process.env.MONGO_URI);

        console.log("✅ MongoDB Connected");

        await NationalElection.deleteMany({});

        await NationalElection.insertMany(elections);

        console.log(
            `✅ ${elections.length} National Elections Seeded Successfully`
        );

        process.exit(0);

    } catch (error) {

        console.error(
            "❌ National Election Seed Error:",
            error
        );

        process.exit(1);
    }
}

seed();
