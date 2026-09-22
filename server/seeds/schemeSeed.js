const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config({
    path: path.join(__dirname, "../.env")
});

const Scheme = require("../models/Scheme");

// 2. Database connection
async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB Connected");
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}
const schemes = [
    {
    name: "Ayushman Bharat",

    shortName: "PM-JAY",

    description: "World's largest government-funded health insurance scheme providing financial protection for secondary and tertiary healthcare.",

    launchedYear: 2018,

    launchedDate: "23 September 2018",

    launchedBy: "Narendra Modi",

    government: "Government of India",

    party: "BJP",

    category: "Health",

    beneficiaries: [
        "Economically weaker families",
        "Rural households",
        "Poor urban families"
    ],

    eligibility: [
        "Families listed in SECC 2011",
        "Eligible poor households"
    ],

    benefits: [
        "₹5 lakh health insurance per family per year",
        "Cashless treatment",
        "Coverage in empanelled hospitals"
    ],

    requiredDocuments: [
        "Aadhaar Card",
        "Ration Card",
        "Mobile Number"
    ],

    applicationProcess: [
        "Check eligibility online",
        "Visit nearest CSC",
        "Receive Ayushman Card"
    ],

    budget: "₹7200 Crore",

    status: "Active",

    applicableStates: [
        "All India"
    ],

    officialWebsite: "https://pmjay.gov.in",

    image: "ayushman_bharat.jpg",

    faqs: [
        {
            question: "How much insurance cover is provided?",
            answer: "₹5 lakh per eligible family annually."
        }
    ]
},
{
    name: "Pradhan Mantri Kisan Samman Nidhi",

    shortName: "PM-KISAN",

    description: "Income support scheme providing financial assistance to eligible farmer families.",

    launchedYear: 2019,

    launchedDate: "24 February 2019",

    launchedBy: "Narendra Modi",

    government: "Government of India",

    party: "BJP",

    category: "Agriculture",

    beneficiaries: [
        "Eligible farmer families"
    ],

    eligibility: [
        "Indian farmers owning cultivable land"
    ],

    benefits: [
        "₹6000 annually",
        "Paid in three installments"
    ],

    requiredDocuments: [
        "Aadhaar Card",
        "Bank Account",
        "Land Records"
    ],

    applicationProcess: [
        "Register on PM-KISAN portal",
        "Verification by state authorities"
    ],

    budget: "₹60000 Crore",

    status: "Active",

    applicableStates: [
        "All India"
    ],

    officialWebsite: "https://pmkisan.gov.in",

    image: "pm_kisan.jpg",

    faqs: [
        {
            question: "How much money is given every year?",
            answer: "₹6000 in three equal installments."
        }
    ]
},{
    name: "Pradhan Mantri Awas Yojana",

    shortName: "PMAY",

    description: "Affordable housing scheme for economically weaker sections and middle-income families.",

    launchedYear: 2015,

    launchedDate: "25 June 2015",

    launchedBy: "Narendra Modi",

    government: "Government of India",

    party: "BJP",

    category: "Housing",

    beneficiaries: [
        "Economically Weaker Section",
        "Low Income Group",
        "Middle Income Group"
    ],

    eligibility: [
        "No permanent house",
        "Eligible income category"
    ],

    benefits: [
        "Housing subsidy",
        "Interest subsidy on home loans"
    ],

    requiredDocuments: [
        "Aadhaar Card",
        "Income Certificate",
        "Address Proof"
    ],

    applicationProcess: [
        "Apply online",
        "Verification",
        "Loan approval"
    ],

    budget: "₹79000 Crore",

    status: "Active",

    applicableStates: [
        "All India"
    ],

    officialWebsite: "https://pmaymis.gov.in",

    image: "pmay.jpg",

    faqs: [
        {
            question: "Who can apply?",
            answer: "Eligible families without a permanent house."
        }
    ]
},
{
    name: "Pradhan Mantri Ujjwala Yojana",

    shortName: "PMUY",

    description: "Provides free LPG connections to women from eligible households.",

    launchedYear: 2016,

    launchedDate: "1 May 2016",

    launchedBy: "Narendra Modi",

    government: "Government of India",

    party: "BJP",

    category: "Women Empowerment",

    beneficiaries: [
        "Women from eligible households"
    ],

    eligibility: [
        "Adult woman from BPL household"
    ],

    benefits: [
        "Free LPG connection",
        "Cleaner cooking fuel"
    ],

    requiredDocuments: [
        "Aadhaar Card",
        "Ration Card"
    ],

    applicationProcess: [
        "Apply through LPG distributor"
    ],

    budget: "₹8000 Crore",

    status: "Active",

    applicableStates: [
        "All India"
    ],

    officialWebsite: "https://www.pmuy.gov.in",

    image: "ujjwala.jpg",

    faqs: [
        {
            question: "Who receives the LPG connection?",
            answer: "Eligible adult women from qualifying households."
        }
    ]
},
{
    name: "Swachh Bharat Mission",

    shortName: "SBM",

    description: "National campaign to improve sanitation, cleanliness and eliminate open defecation.",

    launchedYear: 2014,

    launchedDate: "2 October 2014",

    launchedBy: "Narendra Modi",

    government: "Government of India",

    party: "BJP",

    category: "Sanitation",

    beneficiaries: [
        "All citizens"
    ],

    eligibility: [
        "Nationwide programme"
    ],

    benefits: [
        "Improved sanitation",
        "Construction of toilets",
        "Waste management"
    ],

    requiredDocuments: [],

    applicationProcess: [
        "Implemented through local authorities"
    ],

    budget: "Multiple budget allocations",

    status: "Active",

    applicableStates: [
        "All India"
    ],

    officialWebsite: "https://swachhbharatmission.gov.in",

    image: "swachh_bharat.jpg",

    faqs: [
        {
            question: "What is the main goal?",
            answer: "To improve sanitation and cleanliness across India."
        }
    ]
},
{
    name: "Jal Jeevan Mission",

    shortName: "JJM",

    description: "A flagship mission to provide Functional Household Tap Connections (FHTC) to every rural household.",

    launchedYear: 2019,

    launchedDate: "15 August 2019",

    launchedBy: "Narendra Modi",

    government: "Government of India",

    party: "BJP",

    category: "Water",

    beneficiaries: [
        "Rural households",
        "Villages across India"
    ],

    eligibility: [
        "Residents of rural India"
    ],

    benefits: [
        "Safe drinking water",
        "Tap water connection",
        "Improved sanitation"
    ],

    requiredDocuments: [],

    applicationProcess: [
        "Implemented through State Water Departments",
        "Village-level execution"
    ],

    budget: "₹3.6 Lakh Crore",

    status: "Active",

    applicableStates: [
        "All India"
    ],

    officialWebsite: "https://jaljeevanmission.gov.in",

    image: "jal_jeevan_mission.jpg",

    faqs: [
        {
            question: "What is the objective of Jal Jeevan Mission?",
            answer: "To provide safe tap drinking water to every rural household."
        }
    ]
},
{
    name: "Digital India",

    shortName: "Digital India",

    description: "A flagship programme to transform India into a digitally empowered society and knowledge economy.",

    launchedYear: 2015,

    launchedDate: "1 July 2015",

    launchedBy: "Narendra Modi",

    government: "Government of India",

    party: "BJP",

    category: "Digital",

    beneficiaries: [
        "Citizens",
        "Businesses",
        "Government Departments"
    ],

    eligibility: [
        "All Indian citizens"
    ],

    benefits: [
        "Online government services",
        "Digital infrastructure",
        "Digital literacy"
    ],

    requiredDocuments: [],

    applicationProcess: [
        "Available through government digital platforms"
    ],

    budget: "₹113000 Crore",

    status: "Active",

    applicableStates: [
        "All India"
    ],

    officialWebsite: "https://digitalindia.gov.in",

    image: "digital_india.jpg",

    faqs: [
        {
            question: "What is Digital India?",
            answer: "It aims to digitally empower citizens and improve online governance."
        }
    ]
},{
    name: "Startup India",

    shortName: "Startup India",

    description: "Initiative to promote entrepreneurship, innovation and startup ecosystem in India.",

    launchedYear: 2016,

    launchedDate: "16 January 2016",

    launchedBy: "Narendra Modi",

    government: "Government of India",

    party: "BJP",

    category: "Employment",

    beneficiaries: [
        "Entrepreneurs",
        "Startups",
        "Young Innovators"
    ],

    eligibility: [
        "DPIIT-recognized startups"
    ],

    benefits: [
        "Tax exemptions",
        "Funding support",
        "Startup recognition",
        "Mentorship"
    ],

    requiredDocuments: [
        "PAN Card",
        "Company Registration",
        "Startup Certificate"
    ],

    applicationProcess: [
        "Register on Startup India Portal",
        "Apply for DPIIT recognition"
    ],

    budget: "Government Supported",

    status: "Active",

    applicableStates: [
        "All India"
    ],

    officialWebsite: "https://www.startupindia.gov.in",

    image: "startup_india.jpg",

    faqs: [
        {
            question: "Who can register?",
            answer: "Eligible startups recognized by DPIIT."
        }
    ]
},
{
    name: "Skill India Mission",

    shortName: "Skill India",

    description: "National programme to provide skill training and improve employability of Indian youth.",

    launchedYear: 2015,

    launchedDate: "15 July 2015",

    launchedBy: "Narendra Modi",

    government: "Government of India",

    party: "BJP",

    category: "Employment",

    beneficiaries: [
        "Students",
        "Youth",
        "Job Seekers"
    ],

    eligibility: [
        "Indian citizens seeking skill development"
    ],

    benefits: [
        "Free skill training",
        "Industry certification",
        "Placement support"
    ],

    requiredDocuments: [
        "Aadhaar Card",
        "Educational Certificates"
    ],

    applicationProcess: [
        "Register at Skill India Portal",
        "Choose training centre"
    ],

    budget: "Government Funded",

    status: "Active",

    applicableStates: [
        "All India"
    ],

    officialWebsite: "https://www.skillindia.gov.in",

    image: "skill_india.jpg",

    faqs: [
        {
            question: "Who can join Skill India?",
            answer: "Eligible Indian citizens looking for skill development and employment."
        }
    ]
},
{
    name: "Beti Bachao Beti Padhao",

    shortName: "BBBP",

    description: "National campaign to improve the child sex ratio and promote education and empowerment of the girl child.",

    launchedYear: 2015,

    launchedDate: "22 January 2015",

    launchedBy: "Narendra Modi",

    government: "Government of India",

    party: "BJP",

    category: "Women Empowerment",

    beneficiaries: [
        "Girl Children",
        "Women",
        "Families"
    ],

    eligibility: [
        "Nationwide awareness and welfare programme"
    ],

    benefits: [
        "Awareness campaigns",
        "Support for girl education",
        "Women empowerment initiatives"
    ],

    requiredDocuments: [],

    applicationProcess: [
        "Implemented through Central and State Governments"
    ],

    budget: "Government Funded",

    status: "Active",

    applicableStates: [
        "All India"
    ],

    officialWebsite: "https://wcd.gov.in",

    image: "beti_bachao.jpg",

    faqs: [
        {
            question: "What is the main objective?",
            answer: "To protect, educate and empower the girl child."
        }
    ]
},
{
    name: "Pradhan Mantri Mudra Yojana",

    shortName: "PMMY",

    description: "Provides collateral-free loans to small businesses and entrepreneurs under Shishu, Kishore and Tarun categories.",

    launchedYear: 2015,

    launchedDate: "8 April 2015",

    launchedBy: "Narendra Modi",

    government: "Government of India",

    party: "BJP",

    category: "Finance",

    beneficiaries: [
        "Small business owners",
        "MSMEs",
        "Entrepreneurs"
    ],

    eligibility: [
        "Non-corporate small businesses",
        "Individuals starting businesses"
    ],

    benefits: [
        "Collateral-free loan up to ₹10 lakh",
        "Business expansion",
        "Employment generation"
    ],

    requiredDocuments: [
        "Aadhaar Card",
        "PAN Card",
        "Business Proof",
        "Bank Account"
    ],

    applicationProcess: [
        "Apply through banks or NBFCs",
        "Submit required documents",
        "Loan approval"
    ],

    budget: "Demand Driven",

    status: "Active",

    applicableStates: [
        "All India"
    ],

    officialWebsite: "https://www.mudra.org.in",

    image: "pm_mudra.jpg",

    faqs: [
        {
            question: "Is collateral required?",
            answer: "No, Mudra loans are collateral-free."
        }
    ]
},
{
    name: "PM Vishwakarma",

    shortName: "PM Vishwakarma",

    description: "Supports traditional artisans and craftspeople through financial assistance, training and modern tools.",

    launchedYear: 2023,

    launchedDate: "17 September 2023",

    launchedBy: "Narendra Modi",

    government: "Government of India",

    party: "BJP",

    category: "MSME",

    beneficiaries: [
        "Traditional artisans",
        "Craftspeople"
    ],

    eligibility: [
        "Recognized traditional artisans"
    ],

    benefits: [
        "Skill training",
        "Toolkit incentive",
        "Collateral-free loans",
        "Digital incentives"
    ],

    requiredDocuments: [
        "Aadhaar Card",
        "Mobile Number",
        "Bank Account"
    ],

    applicationProcess: [
        "Register through CSC",
        "Verification",
        "Training and loan assistance"
    ],

    budget: "₹13,000 Crore",

    status: "Active",

    applicableStates: [
        "All India"
    ],

    officialWebsite: "https://pmvishwakarma.gov.in",

    image: "pm_vishwakarma.jpg",

    faqs: [
        {
            question: "Who can apply?",
            answer: "Eligible traditional artisans and craftspeople."
        }
    ]
},{
    name: "Atal Pension Yojana",

    shortName: "APY",

    description: "A pension scheme for workers in the unorganized sector providing guaranteed pension after the age of 60.",

    launchedYear: 2015,

    launchedDate: "9 May 2015",

    launchedBy: "Narendra Modi",

    government: "Government of India",

    party: "BJP",

    category: "Social Welfare",

    beneficiaries: [
        "Workers in the unorganized sector"
    ],

    eligibility: [
        "Age between 18 and 40 years",
        "Savings bank account holder"
    ],

    benefits: [
        "Guaranteed pension",
        "Financial security after retirement"
    ],

    requiredDocuments: [
        "Aadhaar Card",
        "Bank Account",
        "Mobile Number"
    ],

    applicationProcess: [
        "Apply through participating bank",
        "Choose pension amount",
        "Monthly contribution starts"
    ],

    budget: "Government Supported",

    status: "Active",

    applicableStates: [
        "All India"
    ],

    officialWebsite: "https://npscra.nsdl.co.in",

    image: "atal_pension.jpg",

    faqs: [
        {
            question: "When does pension start?",
            answer: "After the subscriber reaches 60 years of age."
        }
    ]
},
{
    name: "Sukanya Samriddhi Yojana",

    shortName: "SSY",

    description: "Small savings scheme encouraging parents to save for the education and marriage expenses of a girl child.",

    launchedYear: 2015,

    launchedDate: "22 January 2015",

    launchedBy: "Narendra Modi",

    government: "Government of India",

    party: "BJP",

    category: "Women Empowerment",

    beneficiaries: [
        "Girl children"
    ],

    eligibility: [
        "Girl child below 10 years of age"
    ],

    benefits: [
        "High interest savings",
        "Tax benefits",
        "Financial security"
    ],

    requiredDocuments: [
        "Birth Certificate",
        "Aadhaar Card",
        "Guardian ID"
    ],

    applicationProcess: [
        "Open account in bank or post office",
        "Deposit annually"
    ],

    budget: "Government Savings Scheme",

    status: "Active",

    applicableStates: [
        "All India"
    ],

    officialWebsite: "https://www.nsiindia.gov.in",

    image: "sukanya.jpg",

    faqs: [
        {
            question: "Who can open the account?",
            answer: "Parents or legal guardians of an eligible girl child."
        }
    ]
},
{
    name: "Pradhan Mantri Suraksha Bima Yojana",

    shortName: "PMSBY",

    description: "Affordable accidental insurance scheme providing financial support in case of accidental death or disability.",

    launchedYear: 2015,

    launchedDate: "9 May 2015",

    launchedBy: "Narendra Modi",

    government: "Government of India",

    party: "BJP",

    category: "Insurance",

    beneficiaries: [
        "Bank account holders"
    ],

    eligibility: [
        "Age between 18 and 70 years",
        "Savings bank account"
    ],

    benefits: [
        "Accidental death insurance",
        "Disability insurance",
        "Low annual premium"
    ],

    requiredDocuments: [
        "Aadhaar Card",
        "Bank Account"
    ],

    applicationProcess: [
        "Enroll through bank",
        "Auto-debit annual premium"
    ],

    budget: "Government Supported",

    status: "Active",

    applicableStates: [
        "All India"
    ],

    officialWebsite: "https://jansuraksha.gov.in",

    image: "pmsby.jpg",

    faqs: [
        {
            question: "What is the annual premium?",
            answer: "The premium is determined by the scheme guidelines and may be revised over time."
        }
    ]
},
{
    name: "Pradhan Mantri Jeevan Jyoti Bima Yojana",

    shortName: "PMJJBY",

    description: "A government-backed life insurance scheme providing affordable life insurance coverage to citizens.",

    launchedYear: 2015,

    launchedDate: "9 May 2015",

    launchedBy: "Narendra Modi",

    government: "Government of India",

    party: "BJP",

    category: "Insurance",

    beneficiaries: [
        "Indian citizens",
        "Savings bank account holders"
    ],

    eligibility: [
        "Age between 18 and 50 years",
        "Bank account holder"
    ],

    benefits: [
        "Life insurance cover of ₹2 lakh",
        "Affordable annual premium"
    ],

    requiredDocuments: [
        "Aadhaar Card",
        "Bank Account",
        "Mobile Number"
    ],

    applicationProcess: [
        "Apply through participating bank",
        "Premium auto-debited annually"
    ],

    budget: "Government Supported",

    status: "Active",

    applicableStates: [
        "All India"
    ],

    officialWebsite: "https://jansuraksha.gov.in",

    image: "pmjjby.jpg",

    faqs: [
        {
            question: "How much life insurance is provided?",
            answer: "₹2 lakh life insurance cover."
        }
    ]
},
{
    name: "Pradhan Mantri Fasal Bima Yojana",

    shortName: "PMFBY",

    description: "Crop insurance scheme protecting farmers against crop losses due to natural calamities, pests and diseases.",

    launchedYear: 2016,

    launchedDate: "18 February 2016",

    launchedBy: "Narendra Modi",

    government: "Government of India",

    party: "BJP",

    category: "Agriculture",

    beneficiaries: [
        "Farmers"
    ],

    eligibility: [
        "Farmers growing notified crops"
    ],

    benefits: [
        "Crop insurance",
        "Financial support after crop loss",
        "Reduced premium"
    ],

    requiredDocuments: [
        "Aadhaar Card",
        "Land Records",
        "Bank Account"
    ],

    applicationProcess: [
        "Apply through banks or agriculture department",
        "Premium payment",
        "Insurance coverage starts"
    ],

    budget: "Government Funded",

    status: "Active",

    applicableStates: [
        "All India"
    ],

    officialWebsite: "https://pmfby.gov.in",

    image: "pmfby.jpg",

    faqs: [
        {
            question: "Who can apply?",
            answer: "Eligible farmers cultivating notified crops."
        }
    ]
},
{
    name: "Stand Up India",

    shortName: "Stand Up India",

    description: "Provides bank loans to SC/ST and women entrepreneurs for setting up new enterprises.",

    launchedYear: 2016,

    launchedDate: "5 April 2016",

    launchedBy: "Narendra Modi",

    government: "Government of India",

    party: "BJP",

    category: "Employment",

    beneficiaries: [
        "Women Entrepreneurs",
        "SC Entrepreneurs",
        "ST Entrepreneurs"
    ],

    eligibility: [
        "Women or SC/ST entrepreneurs above 18 years"
    ],

    benefits: [
        "Loans from ₹10 lakh to ₹1 crore",
        "Business support",
        "Employment generation"
    ],

    requiredDocuments: [
        "PAN Card",
        "Aadhaar Card",
        "Business Proposal"
    ],

    applicationProcess: [
        "Apply through Stand Up India Portal",
        "Bank verification",
        "Loan sanction"
    ],

    budget: "Demand Driven",

    status: "Active",

    applicableStates: [
        "All India"
    ],

    officialWebsite: "https://www.standupmitra.in",

    image: "standup_india.jpg",

    faqs: [
        {
            question: "Who is eligible?",
            answer: "Women and SC/ST entrepreneurs starting a new business."
        }
    ]
},
{
    name: "Make in India",

    shortName: "Make in India",

    description: "A national initiative to encourage manufacturing, investment and innovation in India.",

    launchedYear: 2014,

    launchedDate: "25 September 2014",

    launchedBy: "Narendra Modi",

    government: "Government of India",

    party: "BJP",

    category: "MSME",

    beneficiaries: [
        "Manufacturing Companies",
        "Entrepreneurs",
        "Investors"
    ],

    eligibility: [
        "Businesses investing in India"
    ],

    benefits: [
        "Investment promotion",
        "Ease of Doing Business",
        "Industrial growth"
    ],

    requiredDocuments: [],

    applicationProcess: [
        "Investment through approved channels",
        "Business registration"
    ],

    budget: "Government Initiative",

    status: "Active",

    applicableStates: [
        "All India"
    ],

    officialWebsite: "https://www.makeinindia.com",

    image: "make_in_india.jpg",

    faqs: [
        {
            question: "What is the aim of Make in India?",
            answer: "To promote manufacturing and attract investment in India."
        }
    ]
},
{
    name: "PM Surya Ghar Muft Bijli Yojana",

    shortName: "PM Surya Ghar",

    description: "A rooftop solar scheme encouraging households to install solar panels with government subsidy.",

    launchedYear: 2024,

    launchedDate: "13 February 2024",

    launchedBy: "Narendra Modi",

    government: "Government of India",

    party: "BJP",

    category: "Energy",

    beneficiaries: [
        "Residential households"
    ],

    eligibility: [
        "Indian households with suitable rooftops"
    ],

    benefits: [
        "Subsidy on rooftop solar installation",
        "Reduced electricity bills",
        "Clean energy generation"
    ],

    requiredDocuments: [
        "Aadhaar Card",
        "Electricity Bill",
        "Bank Account"
    ],

    applicationProcess: [
        "Register on the official portal",
        "Select vendor",
        "Install rooftop solar system",
        "Receive subsidy after verification"
    ],

    budget: "₹75,000 Crore",

    status: "Active",

    applicableStates: [
        "All India"
    ],

    officialWebsite: "https://pmsuryaghar.gov.in",

    image: "pm_surya_ghar.jpg",

    faqs: [
        {
            question: "Who can apply?",
            answer: "Eligible residential households across India."
        }
    ]
},
{
    name: "Soil Health Card Scheme",

    shortName: "SHC",

    description: "Provides farmers with soil health reports and recommendations to improve soil fertility and crop productivity.",

    launchedYear: 2015,

    launchedDate: "19 February 2015",

    launchedBy: "Narendra Modi",

    government: "Government of India",

    party: "BJP",

    category: "Agriculture",

    beneficiaries: [
        "Farmers"
    ],

    eligibility: [
        "All Indian farmers"
    ],

    benefits: [
        "Free soil testing",
        "Crop-wise fertilizer recommendations",
        "Improved agricultural productivity"
    ],

    requiredDocuments: [
        "Aadhaar Card",
        "Land Records"
    ],

    applicationProcess: [
        "Apply through Agriculture Department",
        "Submit soil sample",
        "Receive Soil Health Card"
    ],

    budget: "Government Funded",

    status: "Active",

    applicableStates: [
        "All India"
    ],

    officialWebsite: "https://soilhealth.dac.gov.in",

    image: "soil_health_card.jpg",

    faqs: [
        {
            question: "What is the purpose of this scheme?",
            answer: "To improve soil fertility and increase crop productivity."
        }
    ]
},
{
    name: "National Agriculture Market",

    shortName: "e-NAM",

    description: "An online trading platform integrating Agricultural Produce Market Committees (APMCs) across India.",

    launchedYear: 2016,

    launchedDate: "14 April 2016",

    launchedBy: "Narendra Modi",

    government: "Government of India",

    party: "BJP",

    category: "Agriculture",

    beneficiaries: [
        "Farmers",
        "Traders",
        "Commission Agents"
    ],

    eligibility: [
        "Registered farmers and traders"
    ],

    benefits: [
        "Transparent price discovery",
        "Online trading",
        "Better market access"
    ],

    requiredDocuments: [
        "Aadhaar Card",
        "Farmer Registration"
    ],

    applicationProcess: [
        "Register on e-NAM Portal",
        "Verify identity",
        "Start online trading"
    ],

    budget: "Government Funded",

    status: "Active",

    applicableStates: [
        "All India"
    ],

    officialWebsite: "https://enam.gov.in",

    image: "enam.jpg",

    faqs: [
        {
            question: "Who can use e-NAM?",
            answer: "Registered farmers and agricultural traders."
        }
    ]
},
{
    name: "BharatNet",

    shortName: "BharatNet",

    description: "National broadband project to provide high-speed internet connectivity to Gram Panchayats across India.",

    launchedYear: 2011,

    launchedDate: "25 October 2011",

    launchedBy: "Government of India",

    government: "Government of India",

    party: "BJP",

    category: "Digital",

    beneficiaries: [
        "Rural citizens",
        "Educational institutions",
        "Government offices"
    ],

    eligibility: [
        "Gram Panchayats across India"
    ],

    benefits: [
        "High-speed broadband",
        "Digital inclusion",
        "Improved e-Governance"
    ],

    requiredDocuments: [],

    applicationProcess: [
        "Implemented by Bharat Broadband Network Limited (BBNL)"
    ],

    budget: "₹61,109 Crore",

    status: "Active",

    applicableStates: [
        "All India"
    ],

    officialWebsite: "https://bbnl.nic.in",

    image: "bharatnet.jpg",

    faqs: [
        {
            question: "What is BharatNet?",
            answer: "A project to connect rural India with broadband internet."
        }
    ]
},
{
    name: "PM SHRI Schools",

    shortName: "PM SHRI",

    description: "A centrally sponsored scheme to develop selected schools into model institutions showcasing the National Education Policy 2020.",

    launchedYear: 2022,

    launchedDate: "5 September 2022",

    launchedBy: "Narendra Modi",

    government: "Government of India",

    party: "BJP",

    category: "Education",

    beneficiaries: [
        "Students",
        "Teachers",
        "Government Schools"
    ],

    eligibility: [
        "Selected government schools"
    ],

    benefits: [
        "Modern infrastructure",
        "Smart classrooms",
        "Quality education"
    ],

    requiredDocuments: [],

    applicationProcess: [
        "Schools selected by Central Government"
    ],

    budget: "₹27,360 Crore",

    status: "Active",

    applicableStates: [
        "All India"
    ],

    officialWebsite: "https://pmshrischools.education.gov.in",

    image: "pm_shri.jpg",

    faqs: [
        {
            question: "What are PM SHRI Schools?",
            answer: "Model schools implementing the National Education Policy."
        }
    ]
},
{
    name: "National Education Policy 2020",

    shortName: "NEP 2020",

    description: "Comprehensive education policy introducing reforms in school and higher education to improve quality, flexibility and accessibility.",

    launchedYear: 2020,

    launchedDate: "29 July 2020",

    launchedBy: "Narendra Modi",

    government: "Government of India",

    party: "BJP",

    category: "Education",

    beneficiaries: [
        "Students",
        "Teachers",
        "Educational Institutions"
    ],

    eligibility: [
        "Applicable to India's education system"
    ],

    benefits: [
        "Flexible curriculum",
        "Skill-based education",
        "Multidisciplinary learning",
        "Digital education"
    ],

    requiredDocuments: [],

    applicationProcess: [
        "Implemented through schools, colleges and universities"
    ],

    budget: "Implemented through Central and State Education Budgets",

    status: "Active",

    applicableStates: [
        "All India"
    ],

    officialWebsite: "https://www.education.gov.in",

    image: "nep2020.jpg",

    faqs: [
        {
            question: "What is the main objective of NEP 2020?",
            answer: "To transform India's education system and improve learning outcomes."
        }
    ]
},
{
    name: "Mukhyamantri Ladli Behna Yojana",

    shortName: "Ladli Behna",

    description: "Financial assistance scheme for women launched by the Government of Madhya Pradesh to improve their economic independence.",

    launchedYear: 2023,

    launchedDate: "10 June 2023",

    launchedBy: "Shivraj Singh Chouhan",

    government: "Government of Madhya Pradesh",

    party: "BJP",

    category: "Women Empowerment",

    beneficiaries: [
        "Women of Madhya Pradesh"
    ],

    eligibility: [
        "Married women",
        "Resident of Madhya Pradesh",
        "Age between 21 and 60 years"
    ],

    benefits: [
        "Monthly financial assistance",
        "Direct Benefit Transfer"
    ],

    requiredDocuments: [
        "Aadhaar Card",
        "Samagra ID",
        "Bank Account"
    ],

    applicationProcess: [
        "Apply through designated camps",
        "Verification",
        "DBT transfer"
    ],

    budget: "State Government Budget",

    status: "Active",

    applicableStates: [
        "Madhya Pradesh"
    ],

    officialWebsite: "https://cmladlibahna.mp.gov.in",

    image: "ladli_behna.jpg",

    faqs: [
        {
            question: "Who can apply?",
            answer: "Eligible married women residing in Madhya Pradesh."
        }
    ]
},
{
    name: "Kanyashree Prakalpa",

    shortName: "Kanyashree",

    description: "Scholarship scheme encouraging girls to continue education and delay early marriage.",

    launchedYear: 2013,

    launchedDate: "1 October 2013",

    launchedBy: "Mamata Banerjee",

    government: "Government of West Bengal",

    party: "TMC",

    category: "Education",

    beneficiaries: [
        "Girl students"
    ],

    eligibility: [
        "Girls aged 13–18 years",
        "Enrolled in educational institution"
    ],

    benefits: [
        "Annual scholarship",
        "One-time grant after turning 18"
    ],

    requiredDocuments: [
        "School Certificate",
        "Aadhaar Card",
        "Bank Account"
    ],

    applicationProcess: [
        "Apply through school",
        "Verification",
        "Scholarship transfer"
    ],

    budget: "State Government Budget",

    status: "Active",

    applicableStates: [
        "West Bengal"
    ],

    officialWebsite: "https://wbkanyashree.gov.in",

    image: "kanyashree.jpg",

    faqs: [
        {
            question: "What is the objective?",
            answer: "To support girls' education and prevent child marriage."
        }
    ]
},
{
    name: "Mohalla Clinic",

    shortName: "Mohalla Clinic",

    description: "Free primary healthcare service through neighborhood clinics across Delhi.",

    launchedYear: 2015,

    launchedDate: "7 July 2015",

    launchedBy: "Arvind Kejriwal",

    government: "Government of Delhi",

    party: "AAP",

    category: "Health",

    beneficiaries: [
        "Residents of Delhi"
    ],

    eligibility: [
        "Any resident needing primary healthcare"
    ],

    benefits: [
        "Free doctor consultation",
        "Free medicines",
        "Free diagnostic tests"
    ],

    requiredDocuments: [],

    applicationProcess: [
        "Visit nearest Mohalla Clinic"
    ],

    budget: "Delhi Government Budget",

    status: "Active",

    applicableStates: [
        "Delhi"
    ],

    officialWebsite: "https://health.delhi.gov.in",

    image: "mohalla_clinic.jpg",

    faqs: [
        {
            question: "Is treatment free?",
            answer: "Yes, consultation, medicines and many tests are free."
        }
    ]
},
{
    name: "Rythu Bandhu Scheme",

    shortName: "Rythu Bandhu",

    description: "Investment support scheme providing financial assistance to farmers before every crop season.",

    launchedYear: 2018,

    launchedDate: "10 May 2018",

    launchedBy: "K. Chandrashekar Rao",

    government: "Government of Telangana",

    party: "BRS",

    category: "Agriculture",

    beneficiaries: [
        "Farmers"
    ],

    eligibility: [
        "Land-owning farmers"
    ],

    benefits: [
        "Financial support for crop investment",
        "Direct Benefit Transfer"
    ],

    requiredDocuments: [
        "Land Records",
        "Aadhaar Card",
        "Bank Account"
    ],

    applicationProcess: [
        "Automatic transfer after verification"
    ],

    budget: "State Government Budget",

    status: "Active",

    applicableStates: [
        "Telangana"
    ],

    officialWebsite: "https://rythubandhu.telangana.gov.in",

    image: "rythu_bandhu.jpg",

    faqs: [
        {
            question: "Who receives the benefit?",
            answer: "Eligible land-owning farmers in Telangana."
        }
    ]
},
{
    name: "Kalaignar Magalir Urimai Thogai",

    shortName: "Magalir Urimai",

    description: "Monthly financial assistance scheme for eligible women heads of families in Tamil Nadu.",

    launchedYear: 2023,

    launchedDate: "15 September 2023",

    launchedBy: "M. K. Stalin",

    government: "Government of Tamil Nadu",

    party: "DMK",

    category: "Women Empowerment",

    beneficiaries: [
        "Women heads of families"
    ],

    eligibility: [
        "Eligible women residents of Tamil Nadu"
    ],

    benefits: [
        "₹1000 per month",
        "Direct Benefit Transfer"
    ],

    requiredDocuments: [
        "Aadhaar Card",
        "Family Card",
        "Bank Account"
    ],

    applicationProcess: [
        "Apply through government camps",
        "Verification",
        "Monthly transfer"
    ],

    budget: "State Government Budget",

    status: "Active",

    applicableStates: [
        "Tamil Nadu"
    ],

    officialWebsite: "https://www.tn.gov.in",

    image: "magalir_urimai.jpg",

    faqs: [
        {
            question: "How much assistance is provided?",
            answer: "₹1000 per month to eligible beneficiaries."
        }
    ]
},
{
    name: "Krushak Assistance for Livelihood and Income Augmentation",

    shortName: "KALIA",

    description: "A farmer welfare scheme providing financial assistance, livelihood support and insurance benefits to small and marginal farmers.",

    launchedYear: 2018,

    launchedDate: "21 December 2018",

    launchedBy: "Naveen Patnaik",

    government: "Government of Odisha",

    party: "BJD",

    category: "Agriculture",

    beneficiaries: [
        "Small farmers",
        "Marginal farmers",
        "Landless agricultural labourers"
    ],

    eligibility: [
        "Resident of Odisha",
        "Eligible farmer or agricultural labourer"
    ],

    benefits: [
        "Financial assistance",
        "Crop support",
        "Life insurance",
        "Interest-free crop loans"
    ],

    requiredDocuments: [
        "Aadhaar Card",
        "Bank Account",
        "Land Records"
    ],

    applicationProcess: [
        "Apply through Agriculture Department",
        "Verification",
        "Direct Benefit Transfer"
    ],

    budget: "State Government Budget",

    status: "Active",

    applicableStates: [
        "Odisha"
    ],

    officialWebsite: "https://kalia.odisha.gov.in",

    image: "kalia.jpg",

    faqs: [
        {
            question: "Who is eligible?",
            answer: "Eligible farmers and agricultural labourers of Odisha."
        }
    ]
},
{
    name: "Gruha Lakshmi Scheme",

    shortName: "Gruha Lakshmi",

    description: "Financial assistance scheme providing monthly support to women heads of families in Karnataka.",

    launchedYear: 2023,

    launchedDate: "30 August 2023",

    launchedBy: "Siddaramaiah",

    government: "Government of Karnataka",

    party: "INC",

    category: "Women Empowerment",

    beneficiaries: [
        "Women heads of households"
    ],

    eligibility: [
        "Resident of Karnataka",
        "Recognized as head of family"
    ],

    benefits: [
        "₹2,000 per month",
        "Direct Benefit Transfer"
    ],

    requiredDocuments: [
        "Aadhaar Card",
        "Bank Account",
        "Ration Card"
    ],

    applicationProcess: [
        "Apply online or through Seva Sindhu",
        "Verification",
        "Monthly payment"
    ],

    budget: "State Government Budget",

    status: "Active",

    applicableStates: [
        "Karnataka"
    ],

    officialWebsite: "https://sevasindhuservices.karnataka.gov.in",

    image: "gruha_lakshmi.jpg",

    faqs: [
        {
            question: "How much assistance is provided?",
            answer: "₹2,000 every month."
        }
    ]
},
{
    name: "Majhi Ladki Bahin Yojana",

    shortName: "Ladki Bahin",

    description: "Financial assistance scheme for eligible women in Maharashtra to improve their financial independence.",

    launchedYear: 2024,

    launchedDate: "28 June 2024",

    launchedBy: "Eknath Shinde",

    government: "Government of Maharashtra",

    party: "Shiv Sena",

    category: "Women Empowerment",

    beneficiaries: [
        "Eligible women of Maharashtra"
    ],

    eligibility: [
        "Resident of Maharashtra",
        "Eligible women aged 21 to 65 years"
    ],

    benefits: [
        "₹1,500 per month",
        "Direct Benefit Transfer"
    ],

    requiredDocuments: [
        "Aadhaar Card",
        "Bank Account",
        "Income Certificate"
    ],

    applicationProcess: [
        "Online registration",
        "Verification",
        "Monthly payment"
    ],

    budget: "State Government Budget",

    status: "Active",

    applicableStates: [
        "Maharashtra"
    ],

    officialWebsite: "https://ladakibahin.maharashtra.gov.in",

    image: "ladki_bahin.jpg",

    faqs: [
        {
            question: "Who can apply?",
            answer: "Eligible women residents of Maharashtra."
        }
    ]
},
{
    name: "Mukhyamantri Chiranjeevi Health Insurance Scheme",

    shortName: "Chiranjeevi",

    description: "Cashless health insurance scheme providing medical coverage to eligible families in Rajasthan.",

    launchedYear: 2021,

    launchedDate: "1 May 2021",

    launchedBy: "Ashok Gehlot",

    government: "Government of Rajasthan",

    party: "INC",

    category: "Health",

    beneficiaries: [
        "Families of Rajasthan"
    ],

    eligibility: [
        "Eligible residents of Rajasthan"
    ],

    benefits: [
        "Cashless treatment",
        "Health insurance coverage",
        "Hospitalization benefits"
    ],

    requiredDocuments: [
        "Jan Aadhaar Card",
        "Aadhaar Card"
    ],

    applicationProcess: [
        "Register through Jan Aadhaar Portal",
        "Verification"
    ],

    budget: "State Government Budget",

    status: "Active",

    applicableStates: [
        "Rajasthan"
    ],

    officialWebsite: "https://chiranjeevi.rajasthan.gov.in",

    image: "chiranjeevi.jpg",

    faqs: [
        {
            question: "Is treatment cashless?",
            answer: "Yes, eligible beneficiaries receive cashless treatment."
        }
    ]
},
{
    name: "Mukhyamantri Kanya Sumangala Yojana",

    shortName: "Kanya Sumangala",

    description: "A welfare scheme supporting the education and development of girl children through financial assistance at different stages of life.",

    launchedYear: 2019,

    launchedDate: "25 October 2019",

    launchedBy: "Yogi Adityanath",

    government: "Government of Uttar Pradesh",

    party: "BJP",

    category: "Women Empowerment",

    beneficiaries: [
        "Girl children in Uttar Pradesh"
    ],

    eligibility: [
        "Resident of Uttar Pradesh",
        "Eligible family income criteria"
    ],

    benefits: [
        "Financial assistance in six stages",
        "Support for education",
        "Promotion of girl child welfare"
    ],

    requiredDocuments: [
        "Birth Certificate",
        "Aadhaar Card",
        "Income Certificate",
        "Bank Account"
    ],

    applicationProcess: [
        "Apply through official portal",
        "Document verification",
        "Benefit transfer"
    ],

    budget: "State Government Budget",

    status: "Active",

    applicableStates: [
        "Uttar Pradesh"
    ],

    officialWebsite: "https://mksy.up.gov.in",

    image: "kanya_sumangala.jpg",

    faqs: [
        {
            question: "Who receives the benefit?",
            answer: "Eligible girl children from qualifying families in Uttar Pradesh."
        }
    ]
},
{
    name: "Jagananna Amma Vodi",

    shortName: "Amma Vodi",

    description: "Financial assistance scheme encouraging mothers to send their children to school by providing annual financial support.",

    launchedYear: 2020,

    launchedDate: "9 January 2020",

    launchedBy: "Y. S. Jagan Mohan Reddy",

    government: "Government of Andhra Pradesh",

    party: "YSRCP",

    category: "Education",

    beneficiaries: [
        "Mothers of school-going children"
    ],

    eligibility: [
        "Resident of Andhra Pradesh",
        "Child studying in recognized school"
    ],

    benefits: [
        "₹15,000 annual financial assistance",
        "Support for school education"
    ],

    requiredDocuments: [
        "Aadhaar Card",
        "Bank Account",
        "School Certificate"
    ],

    applicationProcess: [
        "Automatic verification through school records",
        "DBT payment"
    ],

    budget: "State Government Budget",

    status: "Active",

    applicableStates: [
        "Andhra Pradesh"
    ],

    officialWebsite: "https://navasakam.ap.gov.in",

    image: "amma_vodi.jpg",

    faqs: [
        {
            question: "How much assistance is provided?",
            answer: "₹15,000 annually."
        }
    ]
},
{
    name: "Mukhyamantri Kanya Utthan Yojana",

    shortName: "Kanya Utthan",

    description: "Scheme promoting higher education and empowerment of girls through financial assistance.",

    launchedYear: 2018,

    launchedDate: "24 April 2018",

    launchedBy: "Nitish Kumar",

    government: "Government of Bihar",

    party: "JDU",

    category: "Women Empowerment",

    beneficiaries: [
        "Girl students"
    ],

    eligibility: [
        "Resident of Bihar",
        "Eligible female students"
    ],

    benefits: [
        "Financial assistance",
        "Support for higher education"
    ],

    requiredDocuments: [
        "Aadhaar Card",
        "Educational Certificates",
        "Bank Account"
    ],

    applicationProcess: [
        "Apply through official education portal",
        "Verification"
    ],

    budget: "State Government Budget",

    status: "Active",

    applicableStates: [
        "Bihar"
    ],

    officialWebsite: "https://medhasoft.bih.nic.in",

    image: "kanya_utthan.jpg",

    faqs: [
        {
            question: "Who can apply?",
            answer: "Eligible female students of Bihar."
        }
    ]
},
{
    name: "Mukh Mantri Sehat Bima Yojana",

    shortName: "Sehat Bima",

    description: "Health insurance scheme providing cashless treatment to eligible families in Punjab.",

    launchedYear: 2019,

    launchedDate: "20 August 2019",

    launchedBy: "Government of Punjab",

    government: "Government of Punjab",

    party: "AAP",

    category: "Health",

    beneficiaries: [
        "Eligible families of Punjab"
    ],

    eligibility: [
        "Resident of Punjab"
    ],

    benefits: [
        "Cashless hospitalization",
        "Health insurance coverage"
    ],

    requiredDocuments: [
        "Aadhaar Card",
        "Health Card"
    ],

    applicationProcess: [
        "Register through government portal",
        "Hospital verification"
    ],

    budget: "State Government Budget",

    status: "Active",

    applicableStates: [
        "Punjab"
    ],

    officialWebsite: "https://sha.punjab.gov.in",

    image: "sehat_bima.jpg",

    faqs: [
        {
            question: "Is treatment cashless?",
            answer: "Yes."
        }
    ]
},
{
    name: "LIFE Mission",

    shortName: "LIFE Mission",

    description: "Housing scheme providing safe and permanent homes to homeless families in Kerala.",

    launchedYear: 2017,

    launchedDate: "1 March 2017",

    launchedBy: "Pinarayi Vijayan",

    government: "Government of Kerala",

    party: "CPI(M)",

    category: "Housing",

    beneficiaries: [
        "Homeless families"
    ],

    eligibility: [
        "Resident of Kerala",
        "Eligible homeless families"
    ],

    benefits: [
        "Financial assistance for house construction",
        "Permanent housing"
    ],

    requiredDocuments: [
        "Aadhaar Card",
        "Income Certificate"
    ],

    applicationProcess: [
        "Apply through local self-government institutions",
        "Verification"
    ],

    budget: "State Government Budget",

    status: "Active",

    applicableStates: [
        "Kerala"
    ],

    officialWebsite: "https://lifemission.kerala.gov.in",

    image: "life_mission.jpg",

    faqs: [
        {
            question: "Who can benefit?",
            answer: "Eligible homeless families in Kerala."
        }
    ]
},
{
    name: "Rajiv Gandhi Kisan Nyay Yojana",

    shortName: "RGKNY",

    description: "Income support scheme providing financial assistance to farmers to improve agricultural productivity.",

    launchedYear: 2020,

    launchedDate: "21 May 2020",

    launchedBy: "Bhupesh Baghel",

    government: "Government of Chhattisgarh",

    party: "INC",

    category: "Agriculture",

    beneficiaries: [
        "Farmers"
    ],

    eligibility: [
        "Resident farmers of Chhattisgarh"
    ],

    benefits: [
        "Income support",
        "Direct Benefit Transfer"
    ],

    requiredDocuments: [
        "Aadhaar Card",
        "Land Records",
        "Bank Account"
    ],

    applicationProcess: [
        "Registration through Agriculture Department",
        "Verification",
        "DBT payment"
    ],

    budget: "State Government Budget",

    status: "Active",

    applicableStates: [
        "Chhattisgarh"
    ],

    officialWebsite: "https://agriportal.cg.nic.in",

    image: "rgkny.jpg",

    faqs: [
        {
            question: "Who receives benefits?",
            answer: "Eligible farmers of Chhattisgarh."
        }
    ]
},
{
    name: "Parivar Pehchan Patra",

    shortName: "PPP",

    description: "A unique family identification system that enables citizens to access various government welfare schemes through a single family ID.",

    launchedYear: 2019,

    launchedDate: "15 July 2019",

    launchedBy: "Manohar Lal Khattar",

    government: "Government of Haryana",

    party: "BJP",

    category: "Governance",

    beneficiaries: [
        "Families residing in Haryana"
    ],

    eligibility: [
        "Permanent residents of Haryana"
    ],

    benefits: [
        "Single Family ID",
        "Easy access to welfare schemes",
        "Paperless verification"
    ],

    requiredDocuments: [
        "Aadhaar Card",
        "Family Details",
        "Mobile Number"
    ],

    applicationProcess: [
        "Register online",
        "Family verification",
        "Receive Family ID"
    ],

    budget: "State Government Budget",

    status: "Active",

    applicableStates: [
        "Haryana"
    ],

    officialWebsite: "https://meraparivar.haryana.gov.in",

    image: "ppp.jpg",

    faqs: [
        {
            question: "What is PPP?",
            answer: "It is a unique Family ID used to access government schemes."
        }
    ]
},
{
    name: "Orunodoi Scheme",

    shortName: "Orunodoi",

    description: "Financial assistance scheme providing monthly support to economically weaker women-led households.",

    launchedYear: 2020,

    launchedDate: "2 October 2020",

    launchedBy: "Sarbananda Sonowal",

    government: "Government of Assam",

    party: "BJP",

    category: "Women Empowerment",

    beneficiaries: [
        "Women from economically weaker families"
    ],

    eligibility: [
        "Permanent residents of Assam",
        "Eligible low-income households"
    ],

    benefits: [
        "Monthly financial assistance",
        "Direct Benefit Transfer"
    ],

    requiredDocuments: [
        "Aadhaar Card",
        "Bank Account",
        "Income Certificate"
    ],

    applicationProcess: [
        "Apply through district administration",
        "Verification",
        "Monthly transfer"
    ],

    budget: "State Government Budget",

    status: "Active",

    applicableStates: [
        "Assam"
    ],

    officialWebsite: "https://orunodoi.assam.gov.in",

    image: "orunodoi.jpg",

    faqs: [
        {
            question: "Who receives the benefit?",
            answer: "Eligible women-led households in Assam."
        }
    ]
},
{
    name: "Mukhyamantri Amrutum Yojana",

    shortName: "MA Yojana",

    description: "Health insurance scheme providing cashless treatment to economically weaker families in Gujarat.",

    launchedYear: 2012,

    launchedDate: "4 September 2012",

    launchedBy: "Narendra Modi",

    government: "Government of Gujarat",

    party: "BJP",

    category: "Health",

    beneficiaries: [
        "Economically weaker families"
    ],

    eligibility: [
        "Eligible BPL families",
        "Lower-income households"
    ],

    benefits: [
        "Cashless treatment",
        "Health insurance",
        "Coverage for major surgeries"
    ],

    requiredDocuments: [
        "Aadhaar Card",
        "Ration Card",
        "Income Certificate"
    ],

    applicationProcess: [
        "Apply through health department",
        "Verification",
        "Receive MA Card"
    ],

    budget: "State Government Budget",

    status: "Active",

    applicableStates: [
        "Gujarat"
    ],

    officialWebsite: "https://ma.gujarat.gov.in",

    image: "ma_yojana.jpg",

    faqs: [
        {
            question: "Is treatment cashless?",
            answer: "Yes, at empanelled hospitals."
        }
    ]
},
{
    name: "Savitribai Phule Kishori Samriddhi Yojana",

    shortName: "SPKSY",

    description: "Financial assistance scheme promoting education, nutrition and empowerment of adolescent girls.",

    launchedYear: 2019,

    launchedDate: "5 September 2019",

    launchedBy: "Hemant Soren",

    government: "Government of Jharkhand",

    party: "JMM",

    category: "Women Empowerment",

    beneficiaries: [
        "Girl students"
    ],

    eligibility: [
        "Girls studying in government schools",
        "Residents of Jharkhand"
    ],

    benefits: [
        "Financial assistance",
        "Support for education",
        "Reduced school dropout"
    ],

    requiredDocuments: [
        "School ID",
        "Aadhaar Card",
        "Bank Account"
    ],

    applicationProcess: [
        "Apply through schools",
        "Verification",
        "DBT payment"
    ],

    budget: "State Government Budget",

    status: "Active",

    applicableStates: [
        "Jharkhand"
    ],

    officialWebsite: "https://jharkhand.gov.in",

    image: "savitribai.jpg",

    faqs: [
        {
            question: "Who can apply?",
            answer: "Eligible girl students studying in Jharkhand."
        }
    ]
},
{
    name: "Himachal Health Care Scheme",

    shortName: "HIMCARE",

    description: "Health insurance scheme providing cashless treatment to eligible families in Himachal Pradesh.",

    launchedYear: 2019,

    launchedDate: "1 January 2019",

    launchedBy: "Jai Ram Thakur",

    government: "Government of Himachal Pradesh",

    party: "BJP",

    category: "Health",

    beneficiaries: [
        "Eligible families of Himachal Pradesh"
    ],

    eligibility: [
        "Residents not covered under Ayushman Bharat"
    ],

    benefits: [
        "Cashless hospitalization",
        "Medical treatment",
        "Health insurance coverage"
    ],

    requiredDocuments: [
        "Aadhaar Card",
        "Family ID",
        "Residence Certificate"
    ],

    applicationProcess: [
        "Register online",
        "Document verification",
        "Receive HIMCARE card"
    ],

    budget: "State Government Budget",

    status: "Active",

    applicableStates: [
        "Himachal Pradesh"
    ],

    officialWebsite: "https://himcare.hp.gov.in",

    image: "himcare.jpg",

    faqs: [
        {
            question: "Who is eligible?",
            answer: "Residents of Himachal Pradesh not covered under Ayushman Bharat."
        }
    ]
}
];
async function seedSchemes() {

    try {

        await connectDB();

        console.log("Deleting old schemes...");
        await Scheme.deleteMany();

        console.log("Inserting schemes...");
        await Scheme.insertMany(schemes);

        console.log(`✅ ${schemes.length} schemes inserted successfully`);

        process.exit(0);

    } catch (err) {

        console.log(err);

        process.exit(1);

    }

}

// 5. Run the seed
seedSchemes();