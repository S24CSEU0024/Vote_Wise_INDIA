const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config({
    path: path.join(__dirname, "../.env")
});

const Timeline = require("../models/Timeline");

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB Connected");
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

const timelineEvents = [
    {
    title: "India Became Independent",

    shortDescription:
        "India gained independence from British rule.",

    description:
        "India became an independent nation on 15 August 1947 after nearly two centuries of British rule.",

    year: 1947,

    exactDate: "15 August 1947",

    category: "Government",

    people: [
        "Jawaharlal Nehru",
        "Mahatma Gandhi",
        "Sardar Vallabhbhai Patel"
    ],

    parties: [
        "Indian National Congress"
    ],

    impact:
        "Birth of independent India.",

    significance:
        "Beginning of democratic governance.",

    image: "1947_independence.jpg",

    gallery: [],

    video: "",

    references: [
        "https://www.india.gov.in"
    ],

    tags: [
        "Independence",
        "1947"
    ],

    isImportant: true
},{
    title: "Constitution of India Came into Force",

    shortDescription:
        "India officially became a Republic.",

    description:
        "The Constitution of India came into effect on 26 January 1950 making India a sovereign democratic republic.",

    year: 1950,

    exactDate: "26 January 1950",

    category: "Constitution",

    people: [
        "Dr. B. R. Ambedkar",
        "Rajendra Prasad"
    ],

    parties: [],

    impact:
        "Established constitutional democracy.",

    significance:
        "Republic Day of India.",

    image: "constitution.jpg",

    gallery: [],

    video: "",

    references: [],

    tags: [
        "Constitution"
    ],

    isImportant: true
},{
    title: "First General Election",

    shortDescription:
        "India conducted its first democratic election.",

    description:
        "The first Lok Sabha election was held during 1951–52 under the Election Commission of India.",

    year: 1951,

    exactDate: "1951",

    category: "Election",

    people: [
        "Jawaharlal Nehru"
    ],

    parties: [
        "INC"
    ],

    impact:
        "Beginning of parliamentary democracy.",

    significance:
        "Largest democratic election at that time.",

    image: "1951_election.jpg",

    gallery: [],

    video: "",

    references: [],

    tags: [
        "Election"
    ],

    isImportant: true
},{
    title: "Green Revolution",

    shortDescription:
        "Agricultural reforms transformed food production.",

    description:
        "The Green Revolution introduced high-yield crop varieties and modern farming methods.",

    year: 1967,

    exactDate: "1967",

    category: "Economy",

    people: [
        "M. S. Swaminathan"
    ],

    parties: [],

    impact:
        "Boosted food grain production.",

    significance:
        "Reduced food shortages.",

    image: "green_revolution.jpg",

    gallery: [],

    video: "",

    references: [],

    tags: [
        "Agriculture"
    ],

    isImportant: true
},{
    title: "Emergency Declared",

    shortDescription:
        "National Emergency imposed in India.",

    description:
        "Emergency was declared on 25 June 1975 leading to suspension of civil liberties.",

    year: 1975,

    exactDate: "25 June 1975",

    category: "Government",

    people: [
        "Indira Gandhi"
    ],

    parties: [
        "INC"
    ],

    impact:
        "Major constitutional and political event.",

    significance:
        "One of India's most debated political periods.",

    image: "emergency.jpg",

    gallery: [],

    video: "",

    references: [],

    tags: [
        "Emergency"
    ],

    isImportant: true
},
{
    title: "Formation of Maharashtra and Gujarat",

    shortDescription: "Bombay State was divided into Maharashtra and Gujarat.",

    description: "On 1 May 1960, the bilingual Bombay State was reorganized into Maharashtra and Gujarat on linguistic lines.",

    year: 1960,

    exactDate: "1 May 1960",

    category: "Government",

    people: [],

    parties: [],

    impact: "Created two separate states.",

    significance: "Major linguistic reorganization.",

    image: "maharashtra_gujarat.jpg",

    gallery: [],

    video: "",

    references: [],

    tags: ["State Reorganisation"],

    isImportant: true
},{
    title: "India-China War",

    shortDescription: "Border conflict between India and China.",

    description: "India and China fought a brief but significant border war in 1962.",

    year: 1962,

    exactDate: "1962",

    category: "War",

    people: ["Jawaharlal Nehru"],

    parties: ["INC"],

    impact: "Changed India's defence strategy.",

    significance: "Major military conflict.",

    image: "india_china_war.jpg",

    gallery: [],

    video: "",

    references: [],

    tags: ["War"],

    isImportant: true
},{
    title: "India-Pakistan War 1965",

    shortDescription: "Second major war between India and Pakistan.",

    description: "The 1965 war was fought over Kashmir and ended after international mediation.",

    year: 1965,

    exactDate: "1965",

    category: "War",

    people: ["Lal Bahadur Shastri"],

    parties: ["INC"],

    impact: "Strengthened India's military preparedness.",

    significance: "Important defence milestone.",

    image: "1965_war.jpg",

    gallery: [],

    video: "",

    references: [],

    tags: ["War"],

    isImportant: true
},{
    title: "Bank Nationalisation",

    shortDescription: "Major commercial banks nationalised.",

    description: "The Government of India nationalised 14 major commercial banks in 1969.",

    year: 1969,

    exactDate: "19 July 1969",

    category: "Economy",

    people: ["Indira Gandhi"],

    parties: ["INC"],

    impact: "Expanded banking access.",

    significance: "Major economic reform.",

    image: "bank_nationalisation.jpg",

    gallery: [],

    video: "",

    references: [],

    tags: ["Economy"],

    isImportant: true
},{
    title: "Bangladesh Liberation War",

    shortDescription: "India supported Bangladesh's liberation.",

    description: "India played a key role in the 1971 war that led to the creation of Bangladesh.",

    year: 1971,

    exactDate: "1971",

    category: "War",

    people: ["Indira Gandhi"],

    parties: ["INC"],

    impact: "Creation of Bangladesh.",

    significance: "Historic military victory.",

    image: "bangladesh_war.jpg",

    gallery: [],

    video: "",

    references: [],

    tags: ["War"],

    isImportant: true
},{
    title: "First Non-Congress Government",

    shortDescription: "Janata Party formed the government.",

    description: "Following the 1977 election, the Janata Party formed India's first non-Congress government at the Centre.",

    year: 1977,

    exactDate: "1977",

    category: "Election",

    people: ["Morarji Desai"],

    parties: ["Janata Party"],

    impact: "Change in national political leadership.",

    significance: "Historic election outcome.",

    image: "janata_party.jpg",

    gallery: [],

    video: "",

    references: [],

    tags: ["Election"],

    isImportant: true
},{
    title: "Operation Blue Star",

    shortDescription: "Military operation at the Golden Temple.",

    description: "The Indian Army carried out Operation Blue Star in June 1984.",

    year: 1984,

    exactDate: "June 1984",

    category: "Government",

    people: ["Indira Gandhi"],

    parties: ["INC"],

    impact: "Major political and security consequences.",

    significance: "Important event in modern Indian history.",

    image: "blue_star.jpg",

    gallery: [],

    video: "",

    references: [],

    tags: ["Security"],

    isImportant: true
},{
    title: "Assassination of Indira Gandhi",

    shortDescription: "Prime Minister Indira Gandhi was assassinated.",

    description: "Prime Minister Indira Gandhi was assassinated on 31 October 1984.",

    year: 1984,

    exactDate: "31 October 1984",

    category: "Leadership",

    people: ["Indira Gandhi"],

    parties: ["INC"],

    impact: "Led to political transition.",

    significance: "Major national event.",

    image: "indira_assassination.jpg",

    gallery: [],

    video: "",

    references: [],

    tags: ["Prime Minister"],

    isImportant: true
},{
    title: "Economic Liberalisation",

    shortDescription: "Major economic reforms introduced.",

    description: "In 1991, India introduced significant economic reforms aimed at liberalisation and opening the economy.",

    year: 1991,

    exactDate: "1991",

    category: "Economy",

    people: ["P. V. Narasimha Rao", "Manmohan Singh"],

    parties: ["INC"],

    impact: "Changed India's economic policy.",

    significance: "Landmark economic reform.",

    image: "liberalisation.jpg",

    gallery: [],

    video: "",

    references: [],

    tags: ["Economy"],

    isImportant: true
},{
    title: "Pokhran-II Nuclear Tests",

    shortDescription: "India conducted nuclear tests.",

    description: "India carried out a series of nuclear tests at Pokhran in May 1998.",

    year: 1998,

    exactDate: "May 1998",

    category: "Government",

    people: ["Atal Bihari Vajpayee"],

    parties: ["BJP"],

    impact: "Strengthened India's strategic capability.",

    significance: "Major defence milestone.",

    image: "pokhran.jpg",

    gallery: [],

    video: "",

    references: [],

    tags: ["Nuclear"],

    isImportant: true
},{
    title: "Formation of Chhattisgarh, Jharkhand and Uttarakhand",

    shortDescription: "Three new Indian states were created.",

    description: "In 2000, Chhattisgarh, Jharkhand and Uttarakhand were formed after reorganisation.",

    year: 2000,

    exactDate: "2000",

    category: "Government",

    people: [],

    parties: [],

    impact: "Administrative reorganisation.",

    significance: "Major state formation.",

    image: "new_states.jpg",

    gallery: [],

    video: "",

    references: [],

    tags: ["States"],

    isImportant: true
},{
    title: "Right to Information Act",

    shortDescription: "RTI Act came into force.",

    description: "The RTI Act was enacted to promote transparency and accountability in governance.",

    year: 2005,

    exactDate: "2005",

    category: "Government",

    people: ["Manmohan Singh"],

    parties: ["INC"],

    impact: "Improved transparency.",

    significance: "Landmark governance reform.",

    image: "rti.jpg",

    gallery: [],

    video: "",

    references: [],

    tags: ["RTI"],

    isImportant: true
},{
    title: "Formation of Telangana",

    shortDescription: "Telangana became India's 29th state.",

    description: "Telangana was officially formed on 2 June 2014 after being separated from Andhra Pradesh.",

    year: 2014,

    exactDate: "2 June 2014",

    category: "Government",

    people: [],

    parties: [],

    impact: "Creation of a new state.",

    significance: "Major administrative change.",

    image: "telangana.jpg",

    gallery: [],

    video: "",

    references: [],

    tags: ["State Formation"],

    isImportant: true
},{
    title: "Goods and Services Tax Implemented",

    shortDescription: "GST became effective across India.",

    description: "GST was introduced on 1 July 2017 to create a unified indirect tax system.",

    year: 2017,

    exactDate: "1 July 2017",

    category: "Economy",

    people: ["Narendra Modi"],

    parties: ["BJP"],

    impact: "Unified indirect taxation.",

    significance: "Major tax reform.",

    image: "gst.jpg",

    gallery: [],

    video: "",

    references: [],

    tags: ["GST"],

    isImportant: true
},{
    title: "Chandrayaan-3 Lunar Landing",

    shortDescription: "India successfully landed near the Moon's south pole.",

    description: "On 23 August 2023, ISRO's Chandrayaan-3 mission achieved a successful soft landing on the Moon.",

    year: 2023,

    exactDate: "23 August 2023",

    category: "Government",

    people: [],

    parties: [],

    impact: "Strengthened India's global space achievements.",

    significance: "Historic scientific milestone.",

    image: "chandrayaan3.jpg",

    gallery: [],

    video: "",

    references: [],

    tags: ["ISRO", "Space"],

    isImportant: true
},{
    title: "States Reorganisation Act",

    shortDescription: "Indian states reorganised on linguistic basis.",

    description: "The States Reorganisation Act reorganised India's state boundaries primarily on linguistic lines.",

    year: 1956,

    exactDate: "1 November 1956",

    category: "Government",

    people: ["Jawaharlal Nehru"],

    parties: ["INC"],

    impact: "Created modern state boundaries.",

    significance: "Largest administrative reorganisation.",

    image: "states_reorganisation.jpg",

    gallery: [],

    video: "",

    references: [],

    tags: ["States"],

    isImportant: true
},{
    title: "Liberation of Goa",

    shortDescription: "Goa became part of India.",

    description: "Indian Armed Forces liberated Goa from Portuguese rule.",

    year: 1961,

    exactDate: "19 December 1961",

    category: "War",

    people: ["Jawaharlal Nehru"],

    parties: ["INC"],

    impact: "Goa integrated into India.",

    significance: "End of Portuguese rule.",

    image: "goa_liberation.jpg",

    gallery: [],

    video: "",

    references: [],

    tags: ["Goa"],

    isImportant: true
},{
    title: "Pokhran-I Nuclear Test",

    shortDescription: "India's first nuclear explosion.",

    description: "India conducted its first successful nuclear test named 'Smiling Buddha'.",

    year: 1974,

    exactDate: "18 May 1974",

    category: "Defence",

    people: ["Indira Gandhi"],

    parties: ["INC"],

    impact: "India became a nuclear-capable nation.",

    significance: "Historic defence milestone.",

    image: "pokhran1.jpg",

    gallery: [],

    video: "",

    references: [],

    tags: ["Nuclear"],

    isImportant: true
},{
    title: "Mandal Commission Reservation",

    shortDescription: "OBC reservation implemented.",

    description: "The Government implemented the Mandal Commission recommendations for OBC reservations.",

    year: 1990,

    exactDate: "7 August 1990",

    category: "Government",

    people: ["V. P. Singh"],

    parties: ["Janata Dal"],

    impact: "Expanded reservation policy.",

    significance: "Major social justice reform.",

    image: "mandal.jpg",

    gallery: [],

    video: "",

    references: [],

    tags: ["Reservation"],

    isImportant: true
},{
    title: "Babri Masjid Demolition",

    shortDescription: "Babri Masjid demolished in Ayodhya.",

    description: "The demolition led to major political and social developments across India.",

    year: 1992,

    exactDate: "6 December 1992",

    category: "Politics",

    people: [],

    parties: [],

    impact: "Significant political and social consequences.",

    significance: "Major event in modern Indian politics.",

    image: "babri.jpg",

    gallery: [],

    video: "",

    references: [],

    tags: ["Ayodhya"],

    isImportant: true
},{
    title: "Kargil War",

    shortDescription: "India fought Pakistan in Kargil.",

    description: "Indian Armed Forces successfully recaptured occupied positions during the Kargil conflict.",

    year: 1999,

    exactDate: "26 July 1999",

    category: "War",

    people: ["Atal Bihari Vajpayee"],

    parties: ["BJP"],

    impact: "Military victory for India.",

    significance: "Remembered as Kargil Vijay Diwas.",

    image: "kargil.jpg",

    gallery: [],

    video: "",

    references: [],

    tags: ["Army"],

    isImportant: true
},{
    title: "Attack on Indian Parliament",

    shortDescription: "Terrorist attack on Parliament.",

    description: "The Indian Parliament was attacked by terrorists in New Delhi.",

    year: 2001,

    exactDate: "13 December 2001",

    category: "Security",

    people: [],

    parties: [],

    impact: "Strengthened national security measures.",

    significance: "Major security incident.",

    image: "parliament_attack.jpg",

    gallery: [],

    video: "",

    references: [],

    tags: ["Parliament"],

    isImportant: true
},{
    title: "MGNREGA Launched",

    shortDescription: "Employment guarantee programme started.",

    description: "The Mahatma Gandhi National Rural Employment Guarantee Act came into force.",

    year: 2006,

    exactDate: "2 February 2006",

    category: "Scheme",

    people: ["Manmohan Singh"],

    parties: ["INC"],

    impact: "Guaranteed rural employment.",

    significance: "Largest employment programme.",

    image: "mgnrega.jpg",

    gallery: [],

    video: "",

    references: [],

    tags: ["Employment"],

    isImportant: true
},{
    title: "26/11 Mumbai Attacks",

    shortDescription: "Terror attacks in Mumbai.",

    description: "Multiple terrorist attacks took place across Mumbai causing heavy casualties.",

    year: 2008,

    exactDate: "26 November 2008",

    category: "Security",

    people: [],

    parties: [],

    impact: "Major changes in national security.",

    significance: "One of India's worst terror attacks.",

    image: "2611.jpg",

    gallery: [],

    video: "",

    references: [],

    tags: ["Terrorism"],

    isImportant: true
},{
    title: "Aadhaar Programme Started",

    shortDescription: "Unique identity programme launched.",

    description: "The Aadhaar project began to provide unique identification numbers to residents.",

    year: 2009,

    exactDate: "2009",

    category: "Technology",

    people: ["Nandan Nilekani"],

    parties: [],

    impact: "Digital identity for residents.",

    significance: "Largest biometric identity system.",

    image: "aadhaar.jpg",

    gallery: [],

    video: "",

    references: [],

    tags: ["Digital"],

    isImportant: true
},{
    title: "Green Revolution",

    shortDescription: "Agricultural revolution increased food production.",

    description: "Introduction of high-yielding crop varieties, irrigation and fertilizers transformed Indian agriculture.",

    year: 1965,

    exactDate: "1965",

    category: "Agriculture",

    people: ["M. S. Swaminathan"],

    parties: ["INC"],

    impact: "India became self-sufficient in food grain production.",

    significance: "Major agricultural milestone.",

    image: "green_revolution.jpg",

    gallery: [],

    video: "",

    references: [],

    tags: ["Agriculture"],

    isImportant: true
},{
    title: "White Revolution",

    shortDescription: "Operation Flood transformed milk production.",

    description: "Operation Flood made India the world's largest milk producer.",

    year: 1970,

    exactDate: "1970",

    category: "Agriculture",

    people: ["Verghese Kurien"],

    parties: [],

    impact: "Massive dairy development.",

    significance: "Milk production revolution.",

    image: "white_revolution.jpg",

    gallery: [],

    video: "",

    references: [],

    tags: ["Dairy"],

    isImportant: true
},{
    title: "Bank Nationalisation",

    shortDescription: "Major commercial banks nationalised.",

    description: "Fourteen major banks were nationalised to expand banking access.",

    year: 1969,

    exactDate: "19 July 1969",

    category: "Economy",

    people: ["Indira Gandhi"],

    parties: ["INC"],

    impact: "Expanded financial inclusion.",

    significance: "Major economic reform.",

    image: "bank_nationalisation.jpg",

    gallery: [],

    video: "",

    references: [],

    tags: ["Banks"],

    isImportant: true
},{
    title: "Pokhran-II Nuclear Tests",

    shortDescription: "India declared itself a nuclear weapon state.",

    description: "India successfully conducted five underground nuclear tests.",

    year: 1998,

    exactDate: "11 May 1998",

    category: "Defence",

    people: ["Atal Bihari Vajpayee"],

    parties: ["BJP"],

    impact: "Strengthened India's strategic position.",

    significance: "Historic defence achievement.",

    image: "pokhran2.jpg",

    gallery: [],

    video: "",

    references: [],

    tags: ["Nuclear"],

    isImportant: true
},{
    title: "Chandrayaan-1 Mission",

    shortDescription: "India's first lunar mission.",

    description: "ISRO launched Chandrayaan-1, which confirmed the presence of water molecules on the Moon.",

    year: 2008,

    exactDate: "22 October 2008",

    category: "Science",

    people: [],

    parties: [],

    impact: "Major achievement in space exploration.",

    significance: "India entered lunar exploration.",

    image: "chandrayaan1.jpg",

    gallery: [],

    video: "",

    references: [],

    tags: ["ISRO"],

    isImportant: true
},{
    title: "Mars Orbiter Mission",

    shortDescription: "India reached Mars on its first attempt.",

    description: "ISRO's Mangalyaan successfully entered Mars orbit.",

    year: 2014,

    exactDate: "24 September 2014",

    category: "Science",

    people: [],

    parties: [],

    impact: "Global recognition for ISRO.",

    significance: "Historic Mars mission.",

    image: "mangalyaan.jpg",

    gallery: [],

    video: "",

    references: [],

    tags: ["Mars"],

    isImportant: true
},{
    title: "UPI Digital Payments Revolution",

    shortDescription: "UPI transformed digital payments.",

    description: "Unified Payments Interface became one of the world's leading digital payment systems.",

    year: 2016,

    exactDate: "2016",

    category: "Technology",

    people: [],

    parties: [],

    impact: "Rapid adoption of cashless payments.",

    significance: "Digital economy milestone.",

    image: "upi.jpg",

    gallery: [],

    video: "",

    references: [],

    tags: ["UPI"],

    isImportant: true
},{
    title: "Chandrayaan-3 Moon Landing",

    shortDescription: "India became the first nation to land near the Moon's south pole.",

    description: "ISRO successfully soft-landed Chandrayaan-3 on the lunar south polar region.",

    year: 2023,

    exactDate: "23 August 2023",

    category: "Science",

    people: [],

    parties: [],

    impact: "Historic achievement in lunar exploration.",

    significance: "Global scientific milestone.",

    image: "chandrayaan3.jpg",

    gallery: [],

    video: "",

    references: [],

    tags: ["Moon"],

    isImportant: true
},{
    title: "Aditya-L1 Mission",

    shortDescription: "India's first solar observation mission.",

    description: "ISRO launched Aditya-L1 to study the Sun.",

    year: 2023,

    exactDate: "2 September 2023",

    category: "Science",

    people: [],

    parties: [],

    impact: "Expanded India's space research.",

    significance: "First solar mission.",

    image: "aditya_l1.jpg",

    gallery: [],

    video: "",

    references: [],

    tags: ["Sun"],

    isImportant: true
},{
    title: "Constitution Adopted",

    shortDescription: "Constituent Assembly adopted the Constitution.",

    description: "The Constitution of India was formally adopted by the Constituent Assembly.",

    year: 1949,

    exactDate: "26 November 1949",

    category: "Constitution",

    people: ["B. R. Ambedkar"],

    parties: [],

    impact: "Foundation of Indian democracy.",

    significance: "Historic constitutional milestone.",

    image: "constitution.jpg",

    gallery: [],

    video: "",

    references: [],

    tags: ["Constitution"],

    isImportant: true
},{
    title: "Right to Information Act",

    shortDescription: "RTI Act came into force.",

    description: "The Right to Information Act empowered citizens to request information from public authorities.",

    year: 2005,

    exactDate: "12 October 2005",

    category: "Government",

    people: ["Manmohan Singh"],

    parties: ["INC"],

    impact: "Improved transparency and accountability in governance.",

    significance: "Major governance reform.",

    image: "rti.jpg",

    gallery: [],

    video: "",

    references: [],

    tags: ["RTI", "Transparency"],

    isImportant: true
},{
    title: "Economic Liberalisation",

    shortDescription: "India introduced major economic reforms.",

    description: "The Government initiated liberalisation, privatisation and globalisation reforms to address the balance of payments crisis.",

    year: 1991,

    exactDate: "24 July 1991",

    category: "Economy",

    people: ["P. V. Narasimha Rao", "Manmohan Singh"],

    parties: ["INC"],

    impact: "Opened the Indian economy to global markets.",

    significance: "Turning point in India's economic development.",

    image: "liberalisation.jpg",

    gallery: [],

    video: "",

    references: [],

    tags: ["Economy", "LPG Reforms"],

    isImportant: true
},];

async function seedTimeline() {

    try {

        await connectDB();

        await Timeline.deleteMany();

        await Timeline.insertMany(timelineEvents);

        console.log(`✅ ${timelineEvents.length} Timeline Events Seeded Successfully`);

        process.exit();

    } catch (err) {

        console.log(err);

        process.exit(1);

    }

}

seedTimeline();