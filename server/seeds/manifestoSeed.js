const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config({
    path: path.join(__dirname, "../.env")
});

const Manifesto = require("../models/Manifesto");
const Party = require("../models/Party");

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB Connected");
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

async function seedManifestos() {

    try {

        await connectDB();

        await Manifesto.deleteMany();

        const bjp = await Party.findOne({ shortName: "BJP" });
const congress = await Party.findOne({ shortName: "INC" });
const aap = await Party.findOne({ shortName: "AAP" });
const sp = await Party.findOne({ shortName: "SP" });
const bsp = await Party.findOne({ shortName: "BSP" });
const cpi = await Party.findOne({ shortName: "CPI" });
const cpim = await Party.findOne({ shortName: "CPIM" });
const tmc = await Party.findOne({ shortName: "TMC" });
const dmk = await Party.findOne({ shortName: "DMK" });
const aiadmk = await Party.findOne({ shortName: "AIADMK" });
const ncp = await Party.findOne({ shortName: "NCP" });
const shivsena = await Party.findOne({ shortName: "SHIV SENA" });
const jdu = await Party.findOne({ shortName: "JDU" });
const rjd = await Party.findOne({ shortName: "RJD" });
const bjd = await Party.findOne({ shortName: "BJD" });
const tdp = await Party.findOne({ shortName: "TDP" });
const ysrcp = await Party.findOne({ shortName: "YSRCP" });
const aimim = await Party.findOne({ shortName: "AIMIM" });
const brs = await Party.findOne({ shortName: "BRS" });
const jmm = await Party.findOne({ shortName: "JMM" });
const agp = await Party.findOne({ shortName: "AGP" });
const npp = await Party.findOne({ shortName: "NPP" });
const sad = await Party.findOne({ shortName: "SAD" });
const aiudf = await Party.findOne({ shortName: "AIUDF" });
const jjp = await Party.findOne({ shortName: "JJP" });
        const manifestos = [

            // =====================================================
            // BJP 2024
            // =====================================================

            {
                party: bjp ? bjp._id : null,

                partyName: "BJP",

                electionYear: 2024,

                electionType: "Lok Sabha",

                slogan: "Modi Ki Guarantee",

                theme: "Viksit Bharat 2047",

                vision:
                    "Transform India into a developed nation by 2047 through economic growth, infrastructure, technology, national security and inclusive welfare.",

                promises: [

                    {
                        title: "Free Ration",
                        description:
                            "Continue free food grains for 80 crore beneficiaries.",
                        status: "In Progress"
                    },

                    {
                        title: "PM Awas Yojana",
                        description:
                            "Provide 3 crore additional houses for poor families.",
                        status: "In Progress"
                    },

                    {
                        title: "Women Empowerment",
                        description:
                            "Implementation of Nari Shakti initiatives and women reservation.",
                        status: "In Progress"
                    },

                    {
                        title: "Farmers",
                        description:
                            "Expand irrigation, MSP support and agricultural technology.",
                        status: "In Progress"
                    },

                    {
                        title: "Digital India",
                        description:
                            "Further expansion of digital governance and UPI ecosystem.",
                        status: "Completed"
                    }

                ],

                focusAreas: [

                    "Economy",
                    "Infrastructure",
                    "Employment",
                    "National Security",
                    "Technology",
                    "Agriculture",
                    "Healthcare"

                ],

                achievementsClaimed: [

                    "Ayushman Bharat",
                    "Article 370 Abrogation",
                    "Ram Mandir",
                    "UPI Revolution",
                    "GST",
                    "Digital India"

                ],

                downloadablePdf:
                    "https://www.bjp.org",

                officialWebsite:
                    "https://www.bjp.org",

                releasedBy:
                    "J. P. Nadda",

                releaseDate:
                    "14 April 2024",

                image:
                    "bjp_manifesto_2024.jpg"
            },

            // =====================================================
            // INC 2024
            // =====================================================

            {
                party: congress ? congress._id : null,

                partyName: "INC",

                electionYear: 2024,

                electionType: "Lok Sabha",

                slogan: "Nyay Patra",

                theme: "Justice, Equality and Employment",

                vision:
                    "Promote social justice, employment generation, constitutional values and inclusive economic development.",

                promises: [

                    {
                        title: "Yuva Nyay",
                        description:
                            "Employment opportunities and apprenticeship for youth.",
                        status: "Unknown"
                    },

                    {
                        title: "Nari Nyay",
                        description:
                            "Financial assistance to women from poor families.",
                        status: "Unknown"
                    },

                    {
                        title: "Farmer Welfare",
                        description:
                            "Legal guarantee for MSP.",
                        status: "Unknown"
                    },

                    {
                        title: "Caste Census",
                        description:
                            "Conduct nationwide caste census.",
                        status: "Unknown"
                    }

                ],

                focusAreas: [

                    "Employment",
                    "Women",
                    "Farmers",
                    "Education",
                    "Healthcare"

                ],

                achievementsClaimed: [

                    "MGNREGA",
                    "Right to Education",
                    "Right to Information"

                ],

                downloadablePdf:
                    "https://www.inc.in",

                officialWebsite:
                    "https://www.inc.in",

                releasedBy:
                    "Mallikarjun Kharge",

                releaseDate:
                    "5 April 2024",

                image:
                    "inc_manifesto_2024.jpg"
            },

            // =====================================================
            // AAP 2024
            // =====================================================

            {
                party: aap ? aap._id : null,

                partyName: "AAP",

                electionYear: 2024,

                electionType: "Lok Sabha",

                slogan: "Guarantee of Good Governance",

                theme:
                    "Education, Health and Anti-Corruption",

                vision:
                    "Improve public education, healthcare, electricity and governance transparency.",

                promises: [

                    {
                        title: "Free Quality Education",
                        description:
                            "Improve government schools nationwide.",
                        status: "Unknown"
                    },

                    {
                        title: "Healthcare",
                        description:
                            "Expand Mohalla Clinics.",
                        status: "Unknown"
                    },

                    {
                        title: "Employment",
                        description:
                            "Create new employment opportunities.",
                        status: "Unknown"
                    }

                ],

                focusAreas: [

                    "Education",
                    "Health",
                    "Governance",
                    "Employment"

                ],

                achievementsClaimed: [

                    "Delhi Government Schools",
                    "Mohalla Clinics",
                    "Free Electricity"

                ],

                downloadablePdf:
                    "https://aamaadmiparty.org",

                officialWebsite:
                    "https://aamaadmiparty.org",

                releasedBy:
                    "Arvind Kejriwal",

                releaseDate:
                    "2024",

                image:
                    "aap_manifesto_2024.jpg"
            },
            {
    party: sp ? sp._id : null,

    partyName: "SP",

    electionYear: 2024,

    electionType: "Lok Sabha",

    slogan: "Samajik Nyay aur Vikas",

    theme: "Social Justice",

    vision:
        "Strengthen farmers, youth, women and backward communities through inclusive development.",

    promises: [

        {
            title: "Employment",
            description: "Generate large-scale employment opportunities for youth.",
            status: "Unknown"
        },

        {
            title: "Farmer Support",
            description: "Increase MSP and waive farmer loans.",
            status: "Unknown"
        },

        {
            title: "Education",
            description: "Improve public schools and higher education.",
            status: "Unknown"
        },

        {
            title: "Healthcare",
            description: "Improve government hospitals.",
            status: "Unknown"
        }

    ],

    focusAreas: [
        "Farmers",
        "Youth",
        "Education",
        "Healthcare"
    ],

    achievementsClaimed: [
        "Lucknow Metro",
        "Agra-Lucknow Expressway"
    ],

    downloadablePdf: "https://www.samajwadiparty.in",

    officialWebsite: "https://www.samajwadiparty.in",

    releasedBy: "Akhilesh Yadav",

    releaseDate: "2024",

    image: "sp_manifesto.jpg"
},
{
    party: bsp ? bsp._id : null,

    partyName: "BSP",

    electionYear: 2024,

    electionType: "Lok Sabha",

    slogan: "Bahujan Hitay",

    theme: "Social Equality",

    vision:
        "Promote equality, constitutional rights and social justice.",

    promises: [

        {
            title: "Reservation",
            description: "Protect reservation policies.",
            status: "Unknown"
        },

        {
            title: "Employment",
            description: "Increase government recruitment.",
            status: "Unknown"
        },

        {
            title: "Law and Order",
            description: "Strengthen public safety.",
            status: "Unknown"
        }

    ],

    focusAreas: [
        "SC/ST Welfare",
        "Employment",
        "Education"
    ],

    achievementsClaimed: [
        "Social Welfare Programmes"
    ],

    downloadablePdf: "https://www.bspindia.org",

    officialWebsite: "https://www.bspindia.org",

    releasedBy: "Mayawati",

    releaseDate: "2024",

    image: "bsp_manifesto.jpg"
},
{
    party: tmc ? tmc._id : null,

    partyName: "TMC",

    electionYear: 2024,

    electionType: "Lok Sabha",

    slogan: "Ma Mati Manush",

    theme: "People First",

    vision:
        "Focus on welfare, education, healthcare and federalism.",

    promises: [

        {
            title: "Women's Welfare",
            description: "Expand Lakshmir Bhandar scheme.",
            status: "Unknown"
        },

        {
            title: "Employment",
            description: "Support MSMEs and startups.",
            status: "Unknown"
        },

        {
            title: "Education",
            description: "Improve schools and colleges.",
            status: "Unknown"
        }

    ],

    focusAreas: [
        "Women",
        "Healthcare",
        "Education"
    ],

    achievementsClaimed: [
        "Lakshmir Bhandar",
        "Kanyashree"
    ],

    downloadablePdf: "https://aitcofficial.org",

    officialWebsite: "https://aitcofficial.org",

    releasedBy: "Mamata Banerjee",

    releaseDate: "2024",

    image: "tmc_manifesto.jpg"
},
{
    party: dmk ? dmk._id : null,

    partyName: "DMK",

    electionYear: 2024,

    electionType: "Lok Sabha",

    slogan: "Dravidian Model",

    theme: "Social Welfare",

    vision:
        "Strengthen education, welfare and social justice.",

    promises: [

        {
            title: "Education",
            description: "Improve public education.",
            status: "Unknown"
        },

        {
            title: "Healthcare",
            description: "Expand healthcare services.",
            status: "Unknown"
        },

        {
            title: "Women Welfare",
            description: "Financial support programmes.",
            status: "Unknown"
        }

    ],

    focusAreas: [
        "Education",
        "Healthcare",
        "Women"
    ],

    achievementsClaimed: [
        "Pudhumai Penn",
        "Breakfast Scheme"
    ],

    downloadablePdf: "https://www.dmk.in",

    officialWebsite: "https://www.dmk.in",

    releasedBy: "M. K. Stalin",

    releaseDate: "2024",

    image: "dmk_manifesto.jpg"
},
{
    party: aiadmk ? aiadmk._id : null,

    partyName: "AIADMK",

    electionYear: 2024,

    electionType: "Lok Sabha",

    slogan: "People's Welfare",

    theme: "Development",

    vision:
        "Ensure welfare, employment and infrastructure development.",

    promises: [

        {
            title: "Employment",
            description: "Increase job opportunities.",
            status: "Unknown"
        },

        {
            title: "Infrastructure",
            description: "Develop roads and transport.",
            status: "Unknown"
        },

        {
            title: "Healthcare",
            description: "Improve hospitals.",
            status: "Unknown"
        }

    ],

    focusAreas: [
        "Infrastructure",
        "Healthcare",
        "Employment"
    ],

    achievementsClaimed: [
        "Amma Canteens",
        "Public Welfare Schemes"
    ],

    downloadablePdf: "https://aiadmk.com",

    officialWebsite: "https://aiadmk.com",

    releasedBy: "Edappadi K. Palaniswami",

    releaseDate: "2024",

    image: "aiadmk_manifesto.jpg"
},
{
    party: cpim ? cpim._id : null,

    partyName: "CPI(M)",

    electionYear: 2024,

    electionType: "Lok Sabha",

    slogan: "Save Democracy, Save Constitution",

    theme: "Socialism and Equality",

    vision:
        "Strengthen public institutions, protect workers' rights and reduce economic inequality.",

    promises: [

        {
            title: "Employment",
            description: "Create large-scale public sector employment.",
            status: "Unknown"
        },

        {
            title: "Healthcare",
            description: "Universal free healthcare.",
            status: "Unknown"
        },

        {
            title: "Education",
            description: "Increase education spending.",
            status: "Unknown"
        },

        {
            title: "Labour Rights",
            description: "Strengthen labour laws and minimum wages.",
            status: "Unknown"
        }

    ],

    focusAreas: [
        "Workers",
        "Healthcare",
        "Education",
        "Agriculture"
    ],

    achievementsClaimed: [
        "Kerala Healthcare Model",
        "Public Education"
    ],

    downloadablePdf: "https://cpim.org",

    officialWebsite: "https://cpim.org",

    releasedBy: "Sitaram Yechury",

    releaseDate: "2024",

    image: "cpim_manifesto.jpg"
},
{
    party: cpi ? cpi._id : null,

    partyName: "CPI",

    electionYear: 2024,

    electionType: "Lok Sabha",

    slogan: "People First",

    theme: "Equality",

    vision:
        "Protect constitutional rights and strengthen public welfare.",

    promises: [

        {
            title: "Universal Healthcare",
            description: "Affordable healthcare for every citizen.",
            status: "Unknown"
        },

        {
            title: "Education",
            description: "Increase government spending on education.",
            status: "Unknown"
        },

        {
            title: "Employment",
            description: "More public sector jobs.",
            status: "Unknown"
        }

    ],

    focusAreas: [
        "Education",
        "Healthcare",
        "Workers"
    ],

    achievementsClaimed: [
        "Trade Union Movement"
    ],

    downloadablePdf: "https://www.communistparty.in",

    officialWebsite: "https://www.communistparty.in",

    releasedBy: "D. Raja",

    releaseDate: "2024",

    image: "cpi_manifesto.jpg"
},
{
    party: jdu ? jdu._id : null,

    partyName: "JD(U)",

    electionYear: 2024,

    electionType: "Lok Sabha",

    slogan: "Development with Justice",

    theme: "Good Governance",

    vision:
        "Promote education, women's empowerment and infrastructure.",

    promises: [

        {
            title: "Women's Reservation",
            description: "Increase opportunities for women.",
            status: "Unknown"
        },

        {
            title: "Road Development",
            description: "Improve highways and rural roads.",
            status: "Unknown"
        },

        {
            title: "Education",
            description: "Strengthen government schools.",
            status: "Unknown"
        }

    ],

    focusAreas: [
        "Infrastructure",
        "Education",
        "Women"
    ],

    achievementsClaimed: [
        "Road Connectivity",
        "Bicycle Scheme"
    ],

    downloadablePdf: "https://jdu.org.in",

    officialWebsite: "https://jdu.org.in",

    releasedBy: "Nitish Kumar",

    releaseDate: "2024",

    image: "jdu_manifesto.jpg"
},
{
    party: rjd ? rjd._id : null,

    partyName: "RJD",

    electionYear: 2024,

    electionType: "Lok Sabha",

    slogan: "Social Justice",

    theme: "Inclusive Development",

    vision:
        "Ensure equal opportunities through social justice and welfare.",

    promises: [

        {
            title: "Government Jobs",
            description: "Increase public sector recruitment.",
            status: "Unknown"
        },

        {
            title: "Education",
            description: "Improve schools and colleges.",
            status: "Unknown"
        },

        {
            title: "Farmers",
            description: "Support agriculture with subsidies.",
            status: "Unknown"
        }

    ],

    focusAreas: [
        "Employment",
        "Agriculture",
        "Education"
    ],

    achievementsClaimed: [
        "Social Justice Initiatives"
    ],

    downloadablePdf: "https://rjd.co.in",

    officialWebsite: "https://rjd.co.in",

    releasedBy: "Lalu Prasad Yadav",

    releaseDate: "2024",

    image: "rjd_manifesto.jpg"
},
{
    party: bjd ? bjd._id : null,

    partyName: "BJD",

    electionYear: 2024,

    electionType: "Lok Sabha",

    slogan: "Odisha First",

    theme: "Development",

    vision:
        "Focus on disaster management, healthcare and rural development.",

    promises: [

        {
            title: "Healthcare",
            description: "Expand Biju Swasthya Kalyan Yojana.",
            status: "Unknown"
        },

        {
            title: "Women",
            description: "Increase women self-help groups.",
            status: "Unknown"
        },

        {
            title: "Agriculture",
            description: "Support small farmers.",
            status: "Unknown"
        }

    ],

    focusAreas: [
        "Healthcare",
        "Women",
        "Agriculture"
    ],

    achievementsClaimed: [
        "Mission Shakti",
        "BSKY"
    ],

    downloadablePdf: "https://bjdodisha.com",

    officialWebsite: "https://bjdodisha.com",

    releasedBy: "Naveen Patnaik",

    releaseDate: "2024",

    image: "bjd_manifesto.jpg"
},
{
    party: shivsena ? shivsena._id : null,

    partyName: "Shiv Sena",

    electionYear: 2024,

    electionType: "Lok Sabha",

    slogan: "Pride of Maharashtra",

    theme: "Development and Marathi Identity",

    vision:
        "Strengthen infrastructure, employment, healthcare and protect the interests of Maharashtra.",

    promises: [

        {
            title: "Employment",
            description: "Priority jobs for local youth.",
            status: "Unknown"
        },

        {
            title: "Infrastructure",
            description: "Expand Mumbai Metro and highways.",
            status: "Unknown"
        },

        {
            title: "Healthcare",
            description: "Modernize public hospitals.",
            status: "Unknown"
        },

        {
            title: "Women Safety",
            description: "Strengthen safety measures for women.",
            status: "Unknown"
        }

    ],

    focusAreas: [
        "Infrastructure",
        "Employment",
        "Women",
        "Healthcare"
    ],

    achievementsClaimed: [
        "Mumbai Infrastructure",
        "Public Welfare"
    ],

    downloadablePdf: "https://shivsena.in",

    officialWebsite: "https://shivsena.in",

    releasedBy: "Eknath Shinde",

    releaseDate: "2024",

    image: "shivsena_manifesto.jpg"
},
{
    party: ncp ? ncp._id : null,

    partyName: "NCP",

    electionYear: 2024,

    electionType: "Lok Sabha",

    slogan: "Progress Through Unity",

    theme: "Agriculture and Development",

    vision:
        "Promote agriculture, employment and cooperative development.",

    promises: [

        {
            title: "Farmer Welfare",
            description: "Increase agricultural support.",
            status: "Unknown"
        },

        {
            title: "Employment",
            description: "Skill-based employment programmes.",
            status: "Unknown"
        },

        {
            title: "Healthcare",
            description: "Affordable healthcare for all.",
            status: "Unknown"
        }

    ],

    focusAreas: [
        "Agriculture",
        "Healthcare",
        "Employment"
    ],

    achievementsClaimed: [
        "Cooperative Sector Reforms"
    ],

    downloadablePdf: "https://www.ncpparty.com",

    officialWebsite: "https://www.ncpparty.com",

    releasedBy: "Ajit Pawar",

    releaseDate: "2024",

    image: "ncp_manifesto.jpg"
},
{
    party: aimim ? aimim._id : null,

    partyName: "AIMIM",

    electionYear: 2024,

    electionType: "Lok Sabha",

    slogan: "Justice For All",

    theme: "Constitutional Rights",

    vision:
        "Protect constitutional rights, education and equal opportunities.",

    promises: [

        {
            title: "Education",
            description: "Improve education infrastructure.",
            status: "Unknown"
        },

        {
            title: "Healthcare",
            description: "Affordable healthcare services.",
            status: "Unknown"
        },

        {
            title: "Minority Welfare",
            description: "Equal opportunities for all communities.",
            status: "Unknown"
        }

    ],

    focusAreas: [
        "Education",
        "Healthcare",
        "Social Justice"
    ],

    achievementsClaimed: [
        "Community Welfare Initiatives"
    ],

    downloadablePdf: "https://aimim.org",

    officialWebsite: "https://aimim.org",

    releasedBy: "Asaduddin Owaisi",

    releaseDate: "2024",

    image: "aimim_manifesto.jpg"
},
{
    party: tdp ? tdp._id : null,

    partyName: "TDP",

    electionYear: 2024,

    electionType: "Lok Sabha",

    slogan: "Vision Andhra",

    theme: "Technology and Development",

    vision:
        "Modernize Andhra Pradesh through technology, industry and education.",

    promises: [

        {
            title: "Employment",
            description: "Create new IT jobs.",
            status: "Unknown"
        },

        {
            title: "Infrastructure",
            description: "Develop Amaravati and transport.",
            status: "Unknown"
        },

        {
            title: "Education",
            description: "Improve digital education.",
            status: "Unknown"
        },

        {
            title: "Agriculture",
            description: "Support farmers with modern technology.",
            status: "Unknown"
        }

    ],

    focusAreas: [
        "Technology",
        "Education",
        "Infrastructure",
        "Agriculture"
    ],

    achievementsClaimed: [
        "IT Development",
        "e-Governance"
    ],

    downloadablePdf: "https://www.telugudesam.org",

    officialWebsite: "https://www.telugudesam.org",

    releasedBy: "N. Chandrababu Naidu",

    releaseDate: "2024",

    image: "tdp_manifesto.jpg"
},
{
    party: ysrcp ? ysrcp._id : null,

    partyName: "YSRCP",

    electionYear: 2024,

    electionType: "Lok Sabha",

    slogan: "Navaratnalu",

    theme: "Welfare and Development",

    vision:
        "Strengthen welfare programmes, education and healthcare for all citizens.",

    promises: [

        {
            title: "Education",
            description: "Improve schools and provide scholarships.",
            status: "Unknown"
        },

        {
            title: "Healthcare",
            description: "Expand Aarogyasri healthcare scheme.",
            status: "Unknown"
        },

        {
            title: "Women Welfare",
            description: "Financial assistance to women.",
            status: "Unknown"
        },

        {
            title: "Farmers",
            description: "Increase agricultural subsidies.",
            status: "Unknown"
        }

    ],

    focusAreas: [
        "Healthcare",
        "Education",
        "Women",
        "Agriculture"
    ],

    achievementsClaimed: [
        "Navaratnalu",
        "Aarogyasri"
    ],

    downloadablePdf: "https://www.ysrcongress.com",

    officialWebsite: "https://www.ysrcongress.com",

    releasedBy: "Y. S. Jagan Mohan Reddy",

    releaseDate: "2024",

    image: "ysrcp_manifesto.jpg"
},
{
    party: brs ? brs._id : null,

    partyName: "BRS",

    electionYear: 2024,

    electionType: "Lok Sabha",

    slogan: "Ab Ki Baar Kisan Sarkar",

    theme: "Farmer Welfare",

    vision:
        "Build a prosperous India through farmer welfare, irrigation and economic growth.",

    promises: [

        {
            title: "Farmer Income",
            description: "Expand direct financial assistance for farmers.",
            status: "Unknown"
        },

        {
            title: "Irrigation",
            description: "Increase investment in irrigation projects.",
            status: "Unknown"
        },

        {
            title: "Employment",
            description: "Create new jobs in industries.",
            status: "Unknown"
        },

        {
            title: "Healthcare",
            description: "Strengthen government hospitals.",
            status: "Unknown"
        }

    ],

    focusAreas: [
        "Agriculture",
        "Irrigation",
        "Employment",
        "Healthcare"
    ],

    achievementsClaimed: [
        "Mission Bhagiratha",
        "Rythu Bandhu"
    ],

    downloadablePdf: "https://brsparty.com",

    officialWebsite: "https://brsparty.com",

    releasedBy: "K. Chandrashekar Rao",

    releaseDate: "2024",

    image: "brs_manifesto.jpg"
},{
    party: jmm ? jmm._id : null,

    partyName: "JMM",

    electionYear: 2024,

    electionType: "Lok Sabha",

    slogan: "Jal, Jungle, Zameen",

    theme: "Tribal Welfare",

    vision:
        "Protect tribal rights while promoting education, healthcare and employment.",

    promises: [

        {
            title: "Tribal Rights",
            description: "Protect forest rights and land ownership.",
            status: "Unknown"
        },

        {
            title: "Education",
            description: "Scholarships for tribal students.",
            status: "Unknown"
        },

        {
            title: "Healthcare",
            description: "Improve rural healthcare.",
            status: "Unknown"
        }

    ],

    focusAreas: [
        "Tribal Welfare",
        "Education",
        "Healthcare"
    ],

    achievementsClaimed: [
        "Tribal Welfare Programmes"
    ],

    downloadablePdf: "https://jmm.co.in",

    officialWebsite: "https://jmm.co.in",

    releasedBy: "Hemant Soren",

    releaseDate: "2024",

    image: "jmm_manifesto.jpg"
},{
    party: sad ? sad._id : null,

    partyName: "SAD",

    electionYear: 2024,

    electionType: "Lok Sabha",

    slogan: "Punjab First",

    theme: "Agriculture and Federalism",

    vision:
        "Promote Punjab's development while protecting farmers and federal values.",

    promises: [

        {
            title: "MSP Guarantee",
            description: "Legal guarantee for Minimum Support Price.",
            status: "Unknown"
        },

        {
            title: "Drug Control",
            description: "Combat drug abuse in Punjab.",
            status: "Unknown"
        },

        {
            title: "Employment",
            description: "Increase industrial investment.",
            status: "Unknown"
        }

    ],

    focusAreas: [
        "Agriculture",
        "Industry",
        "Youth"
    ],

    achievementsClaimed: [
        "Farmer Welfare Initiatives"
    ],

    downloadablePdf: "https://www.sadindia.org",

    officialWebsite: "https://www.sadindia.org",

    releasedBy: "Sukhbir Singh Badal",

    releaseDate: "2024",

    image: "sad_manifesto.jpg"
},{
    party: npp ? npp._id : null,

    partyName: "NPP",

    electionYear: 2024,

    electionType: "Lok Sabha",

    slogan: "Voice of the North East",

    theme: "Regional Development",

    vision:
        "Accelerate infrastructure, tourism and employment across North-East India.",

    promises: [

        {
            title: "Infrastructure",
            description: "Improve road and airport connectivity.",
            status: "Unknown"
        },

        {
            title: "Tourism",
            description: "Boost eco-tourism and local businesses.",
            status: "Unknown"
        },

        {
            title: "Youth",
            description: "Skill development programmes.",
            status: "Unknown"
        }

    ],

    focusAreas: [
        "Infrastructure",
        "Tourism",
        "Employment"
    ],

    achievementsClaimed: [
        "Regional Development Projects"
    ],

    downloadablePdf: "https://nppindia.in",

    officialWebsite: "https://nppindia.in",

    releasedBy: "Conrad Sangma",

    releaseDate: "2024",

    image: "npp_manifesto.jpg"
},
{
    party: agp ? agp._id : null,

    partyName: "AGP",

    electionYear: 2024,

    electionType: "Lok Sabha",

    slogan: "Assam First",

    theme: "Regional Development",

    vision:
        "Protect Assamese identity while promoting development and employment.",

    promises: [

        {
            title: "Employment",
            description: "More jobs for local youth.",
            status: "Unknown"
        },

        {
            title: "Flood Control",
            description: "Strengthen flood management projects.",
            status: "Unknown"
        },

        {
            title: "Education",
            description: "Improve government educational institutions.",
            status: "Unknown"
        }

    ],

    focusAreas: [
        "Education",
        "Infrastructure",
        "Employment"
    ],

    achievementsClaimed: [
        "Regional Development"
    ],

    downloadablePdf: "https://agp.org.in",

    officialWebsite: "https://agp.org.in",

    releasedBy: "Atul Bora",

    releaseDate: "2024",

    image: "agp_manifesto.jpg"
}

        ];

        await Manifesto.insertMany(manifestos);

        console.log(`✅ ${manifestos.length} Manifestos Seeded Successfully`);

        process.exit();

    } catch (err) {

        console.log(err);

        process.exit(1);

    }

}

seedManifestos();