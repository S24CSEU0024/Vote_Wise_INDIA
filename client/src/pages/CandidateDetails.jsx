import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import "./CandidateDetails.css";


const API_URL = "http://localhost:8000";


/* =========================================================
   PARTY LOGOS
   All logos are stored inside:

   client/public/party-logos/

   Example:
   /party-logos/bjp.png
   /party-logos/congress.png
   ========================================================= */

const PARTY_LOGOS = {

    bjp: "/party-logos/bjp.png",

    congress: "/party-logos/congress.png",

    aap: "/party-logos/aap.png",

    bsp: "/party-logos/bsp.png",

    sp: "/party-logos/sp.png",

    tmc: "/party-logos/tmc.png",

    cpi: "/party-logos/cpi.png",

    cpim: "/party-logos/cpim.png",

    cpm: "/party-logos/cpim.png",

    dmk: "/party-logos/dmk.png",

    aiadmk: "/party-logos/aiadmk.png",

    jdu: "/party-logos/jdu.png",

    jmm: "/party-logos/jmm.png",

    ncp: "/party-logos/ncp.png",

    bjd: "/party-logos/bjd.png",

    rjd: "/party-logos/rjd.png",

    npp: "/party-logos/npp.png",

    shivsena: "/party-logos/shivsena.png",

    shivsenaubt: "/party-logos/shivsenaubt.png",

    tdp: "/party-logos/tdp.png",

    ysrcp: "/party-logos/ysrcp.png",

    sad: "/party-logos/sad.png",

    nc: "/party-logos/nc.png",

    pdp: "/party-logos/pdp.png",

    aimim: "/party-logos/aimim.png",

    agp: "/party-logos/agp.png",
    independent: "/party-logos/independent.png"

};


/* =========================================================
   FUNCTION TO FIND PARTY LOGO
   Handles both party codes and full party names.
   ========================================================= */

function getPartyLogo(party) {

    if (!party) {
        return PARTY_LOGOS.independent;
    }


    /*
       If backend already provides a logo URL,
       use that first.
    */

    if (
        typeof party === "object" &&
        party.logo
    ) {
        return party.logo;
    }


    /*
       Convert party name into a normalized format.
       Example:

       "Bharatiya Janata Party"
       ->
       "bharatiya janata party"
    */

    const partyText =
        typeof party === "object"
            ? party.name || ""
            : party;


    const normalized =
        partyText
            .toString()
            .toLowerCase()
            .trim()
            .replace(/[.,()&]/g, "")
            .replace(/\s+/g, " ");


    /* =====================================================
       BJP
       ===================================================== */

    if (
        normalized === "bjp" ||
        normalized.includes("bharatiya janata party")
    ) {
        return PARTY_LOGOS.bjp;
    }


    /* =====================================================
       CONGRESS
       ===================================================== */

    if (
        normalized === "inc" ||
        normalized === "congress" ||
        normalized.includes("indian national congress")
    ) {
        return PARTY_LOGOS.congress;
    }


    /* =====================================================
       AAP
       ===================================================== */

    if (
        normalized === "aap" ||
        normalized.includes("aam aadmi party")
    ) {
        return PARTY_LOGOS.aap;
    }


    /* =====================================================
       BSP
       ===================================================== */

    if (
        normalized === "bsp" ||
        normalized.includes("bahujan samaj party")
    ) {
        return PARTY_LOGOS.bsp;
    }


    /* =====================================================
       SP
       ===================================================== */

    if (
        normalized === "sp" ||
        normalized.includes("samajwadi party")
    ) {
        return PARTY_LOGOS.sp;
    }


    /* =====================================================
       TMC
       ===================================================== */

    if (
        normalized === "tmc" ||
        normalized === "aitc" ||
        normalized.includes("trinamool congress") ||
        normalized.includes("all india trinamool")
    ) {
        return PARTY_LOGOS.tmc;
    }


    /* =====================================================
       CPI
       ===================================================== */

    if (
        normalized === "cpi" ||
        normalized.includes("communist party of india")
    ) {

        /*
           Prevent CPI(M) from being detected as CPI.
        */

        if (
            normalized.includes("marxist") ||
            normalized.includes("cpim")
        ) {
            return PARTY_LOGOS.cpim;
        }

        return PARTY_LOGOS.cpi;
    }


    /* =====================================================
       CPI(M)
       ===================================================== */

    if (
        normalized === "cpim" ||
        normalized === "cpm" ||
        normalized.includes("communist party of india marxist")
    ) {
        return PARTY_LOGOS.cpim;
    }


    /* =====================================================
       DMK
       ===================================================== */

    if (
        normalized === "dmk" ||
        normalized.includes("dravida munnetra kazhagam")
    ) {
        return PARTY_LOGOS.dmk;
    }


    /* =====================================================
       AIADMK
       ===================================================== */

    if (
        normalized === "aiadmk" ||
        normalized.includes("all india anna dravida")
    ) {
        return PARTY_LOGOS.aiadmk;
    }


    /* =====================================================
       JD(U)
       ===================================================== */

    if (
        normalized === "jdu" ||
        normalized === "jd u" ||
        normalized.includes("janata dal united")
    ) {
        return PARTY_LOGOS.jdu;
    }


    /* =====================================================
       JMM
       ===================================================== */

    if (
        normalized === "jmm" ||
        normalized.includes("jharkhand mukti morcha")
    ) {
        return PARTY_LOGOS.jmm;
    }


    /* =====================================================
       NCP
       ===================================================== */

    if (
        normalized === "ncp" ||
        normalized.includes("nationalist congress party")
    ) {
        return PARTY_LOGOS.ncp;
    }


    /* =====================================================
       BJD
       ===================================================== */

    if (
        normalized === "bjd" ||
        normalized.includes("biju janata dal")
    ) {
        return PARTY_LOGOS.bjd;
    }


    /* =====================================================
       RJD
       ===================================================== */

    if (
        normalized === "rjd" ||
        normalized.includes("rashtriya janata dal")
    ) {
        return PARTY_LOGOS.rjd;
    }


    /* =====================================================
       NPP
       ===================================================== */

    if (
        normalized === "npp" ||
        normalized.includes("national people's party") ||
        normalized.includes("national peoples party")
    ) {
        return PARTY_LOGOS.npp;
    }


    /* =====================================================
       SHIV SENA UBT
       ===================================================== */

    if (
        normalized.includes("shiv sena uddhav") ||
        normalized.includes("shiv sena ubt") ||
        normalized.includes("shivsena ubt")
    ) {
        return PARTY_LOGOS.shivsenaubt;
    }


    /* =====================================================
       SHIV SENA
       ===================================================== */

    if (
        normalized === "shivsena" ||
        normalized === "shiv sena" ||
        normalized.includes("shiv sena")
    ) {
        return PARTY_LOGOS.shivsena;
    }


    /* =====================================================
       TDP
       ===================================================== */

    if (
        normalized === "tdp" ||
        normalized.includes("telugu desam")
    ) {
        return PARTY_LOGOS.tdp;
    }


    /* =====================================================
       YSRCP
       ===================================================== */

    if (
        normalized === "ysrcp" ||
        normalized.includes("ysr congress")
    ) {
        return PARTY_LOGOS.ysrcp;
    }


    /* =====================================================
       SAD
       ===================================================== */

    if (
        normalized === "sad" ||
        normalized.includes("shiromani akali dal")
    ) {
        return PARTY_LOGOS.sad;
    }


    /* =====================================================
       NC
       ===================================================== */

    if (
        normalized === "nc" ||
        normalized.includes("jammu and kashmir national conference") ||
        normalized.includes("national conference")
    ) {
        return PARTY_LOGOS.nc;
    }


    /* =====================================================
       PDP
       ===================================================== */

    if (
        normalized === "pdp" ||
        normalized.includes("jammu and kashmir peoples democratic")
    ) {
        return PARTY_LOGOS.pdp;
    }


    /* =====================================================
       AIMIM
       ===================================================== */

    if (
        normalized === "aimim" ||
        normalized.includes("all india majlis")
    ) {
        return PARTY_LOGOS.aimim;
    }


    /* =====================================================
       AGP
       ===================================================== */

    if (
        normalized === "agp" ||
        normalized.includes("asam gana parishad") ||
        normalized.includes("assam gana parishad")
    ) {
        return PARTY_LOGOS.agp;
    }


    /*
       If no party is recognized,
       use Independent logo.
    */

    return PARTY_LOGOS.independent;
}


function CandidateDetails() {

    const { id } = useParams();


    const [candidate, setCandidate] = useState(null);


    const [loading, setLoading] = useState(true);


    const [error, setError] = useState("");


    useEffect(() => {

        const fetchCandidate = async () => {

            try {

                setLoading(true);

                setError("");


                const response = await fetch(
                    `${API_URL}/api/candidates/${id}`
                );


                if (!response.ok) {

                    throw new Error(
                        "Unable to load candidate"
                    );

                }


                const data =
                    await response.json();


                setCandidate(data);


            } catch (err) {

                console.error(err);


                setError(
                    "Unable to load candidate information."
                );


            } finally {

                setLoading(false);

            }

        };


        fetchCandidate();

    }, [id]);


    /* =====================================================
       LOADING
       ===================================================== */

    if (loading) {

        return (

            <div className="candidate-loading">

                <div className="loading-spinner"></div>

                <p>
                    Loading candidate profile...
                </p>

            </div>

        );

    }


    /* =====================================================
       ERROR
       ===================================================== */

    if (error || !candidate) {

        return (

            <div className="candidate-error-page">

                <div className="error-icon">
                    ⚠️
                </div>


                <h2>
                    Candidate Not Found
                </h2>


                <p>
                    We couldn't load this candidate's profile.
                </p>


                <Link
                    to="/candidates"
                    className="back-button"
                >
                    ← Back to Candidates
                </Link>

            </div>

        );

    }


    /* =====================================================
       PARTY INFORMATION
       ===================================================== */

    const partyName =
        candidate.party?.name ||
        candidate.party ||
        "Independent";


    /*
       Automatically find the correct logo.
    */

    const partyLogo =
        getPartyLogo(candidate.party);


    const journey =
        candidate.politicalJourney || [];


    const priorities =
        candidate.priorities || [];


    const achievements =
        candidate.achievements || [];


    const electoralRecord =
        candidate.electoralRecord || [];


    const positions =
        candidate.positionsHeld || [];


    const criticisms =
        candidate.criticisms || [];


    const controversies =
        candidate.controversies || [];


    const publications =
        candidate.publications || [];


    const sources =
        candidate.sources || [];


    return (

        <div className="candidate-details-page">


            {/* =================================================
                TOP NAVIGATION
                ================================================= */}

            <div className="candidate-topbar">

                <Link
                    to="/candidates"
                    className="back-link"
                >
                    ← Back to Candidates
                </Link>


                {candidate.party?._id && (

                    <Link
                        to={`/party/${candidate.party._id}`}
                        className="party-profile-link"
                    >
                        View Party Profile →
                    </Link>

                )}

            </div>


            {/* =================================================
                HERO
                ================================================= */}

            <section className="candidate-hero">

                <div className="candidate-hero-content">


                    <div className="candidate-photo-wrapper">

                        {candidate.image ? (

                            <img
                                src={candidate.image}
                                alt={candidate.name}
                                className="candidate-main-photo"
                            />

                        ) : (

                            <div className="candidate-photo-placeholder">
                                👤
                            </div>

                        )}

                    </div>


                    <div className="candidate-hero-info">

                        <span className="candidate-label">
                            POLITICAL CANDIDATE
                        </span>


                        <h1>
                            {candidate.name}
                        </h1>


                        {candidate.position && (

                            <p className="candidate-position">
                                {candidate.position}
                            </p>

                        )}


                        {/* =================================================
                            PARTY WITH LOGO
                            ================================================= */}

                        <div className="candidate-party">

                            <div className="candidate-party-logo-wrapper">

                                <img
                                    src={partyLogo}
                                    alt={`${partyName} logo`}
                                    className="candidate-party-logo"
                                    onError={(event) => {
                                        event.currentTarget.src =
                                            PARTY_LOGOS.independent;
                                    }}
                                />

                            </div>


                            <span>
                                {partyName}
                            </span>

                        </div>


                        <div className="candidate-location">

                            <span>
                                📍{" "}
                                {candidate.constituency ||
                                    "Constituency not available"}
                            </span>


                            <span>
                                🏛️{" "}
                                {candidate.state ||
                                    "State not available"}
                            </span>

                        </div>

                    </div>

                </div>

            </section>


            {/* =================================================
                QUICK STATS
                ================================================= */}

            <section className="candidate-stats">

                <div className="stat-card">

                    <span className="stat-icon">
                        🎂
                    </span>

                    <div>

                        <strong>
                            {candidate.age || "—"}
                        </strong>

                        <small>
                            Age
                        </small>

                    </div>

                </div>


                <div className="stat-card">

                    <span className="stat-icon">
                        🎓
                    </span>

                    <div>

                        <strong>
                            {candidate.education || "—"}
                        </strong>

                        <small>
                            Education
                        </small>

                    </div>

                </div>


                <div className="stat-card">

                    <span className="stat-icon">
                        🏆
                    </span>

                    <div>

                        <strong>

                            {
                                electoralRecord.filter(
                                    item =>
                                        item.result
                                            ?.toLowerCase() ===
                                        "won"
                                ).length
                            }

                        </strong>

                        <small>
                            Election Wins
                        </small>

                    </div>

                </div>


                <div className="stat-card">

                    <span className="stat-icon">
                        🏛️
                    </span>

                    <div>

                        <strong>
                            {positions.length}
                        </strong>

                        <small>
                            Positions Held
                        </small>

                    </div>

                </div>

            </section>


            {/* =================================================
                SECTION NAVIGATION
                ================================================= */}

            <nav className="candidate-section-nav">

                <a href="#about">
                    About
                </a>

                <a href="#career">
                    Career
                </a>

                <a href="#priorities">
                    Priorities
                </a>

                <a href="#elections">
                    Elections
                </a>

                <a href="#achievements">
                    Achievements
                </a>

                <a href="#criticism">
                    Public Debate
                </a>

                <a href="#sources">
                    Sources
                </a>

            </nav>


            <main className="candidate-content">


                {/* =================================================
                    ABOUT
                    ================================================= */}

                <section
                    id="about"
                    className="candidate-section"
                >

                    <div className="section-heading">

                        <span>
                            01
                        </span>

                        <div>

                            <h2>
                                About the Candidate
                            </h2>

                            <p>
                                Background and publicly available information
                            </p>

                        </div>

                    </div>


                    {candidate.biography && (

                        <div className="content-card">

                            <h3>
                                Biography
                            </h3>

                            <p>
                                {candidate.biography}
                            </p>

                        </div>

                    )}


                    <div className="two-column-grid">

                        {candidate.earlyLife && (

                            <div className="content-card">

                                <h3>
                                    🌱 Early Life
                                </h3>

                                <p>
                                    {candidate.earlyLife}
                                </p>

                            </div>

                        )}


                        {candidate.profession && (

                            <div className="content-card">

                                <h3>
                                    💼 Professional Background
                                </h3>

                                <p>
                                    {candidate.profession}
                                </p>


                                {candidate.experience && (

                                    <p className="secondary-text">
                                        {candidate.experience}
                                    </p>

                                )}

                            </div>

                        )}

                    </div>

                </section>


                {/* =================================================
                    POLITICAL CAREER
                    ================================================= */}

                <section
                    id="career"
                    className="candidate-section"
                >

                    <div className="section-heading">

                        <span>
                            02
                        </span>

                        <div>

                            <h2>
                                Political Journey
                            </h2>

                            <p>
                                Key stages in the candidate's political career
                            </p>

                        </div>

                    </div>


                    {journey.length > 0 ? (

                        <div className="timeline">

                            {journey.map((item, index) => (

                                <div
                                    className="timeline-item"
                                    key={index}
                                >

                                    <div className="timeline-year">
                                        {item.year}
                                    </div>


                                    <div className="timeline-line">
                                        <span></span>
                                    </div>


                                    <div className="timeline-content">

                                        <h3>
                                            {item.title}
                                        </h3>

                                        <p>
                                            {item.description}
                                        </p>

                                    </div>

                                </div>

                            ))}

                        </div>

                    ) : (

                        <div className="empty-card">
                            Political journey information is not available.
                        </div>

                    )}


                    {positions.length > 0 && (

                        <div className="positions-wrapper">

                            <h3>
                                Positions Held
                            </h3>


                            <div className="positions-grid">

                                {positions.map((item, index) => (

                                    <div
                                        className="position-card"
                                        key={index}
                                    >

                                        <div className="position-icon">
                                            🏛️
                                        </div>


                                        <div>

                                            <h4>
                                                {item.position}
                                            </h4>

                                            <p>
                                                {item.from || "—"}
                                                {" "}
                                                –
                                                {" "}
                                                {item.to || "Present"}
                                            </p>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        </div>

                    )}

                </section>


                {/* =================================================
                    PARTY ASSOCIATION
                    ================================================= */}

                <section className="candidate-section">

                    <div className="section-heading">

                        <span>
                            03
                        </span>

                        <div>

                            <h2>
                                Party Association
                            </h2>

                            <p>
                                Political affiliation and publicly stated association
                            </p>

                        </div>

                    </div>


                    <div className="party-association-card">


                        {/* PARTY LOGO */}

                        <div className="party-association-logo">

                            <img
                                src={partyLogo}
                                alt={`${partyName} logo`}
                                onError={(event) => {
                                    event.currentTarget.src =
                                        PARTY_LOGOS.independent;
                                }}
                            />

                        </div>


                        <div>

                            <h3>
                                {partyName}
                            </h3>


                            {candidate.partyAssociation && (

                                <p>
                                    {candidate.partyAssociation}
                                </p>

                            )}

                        </div>

                    </div>


                    <div className="two-column-grid">

                        {candidate.partyReason && (

                            <div className="content-card">

                                <h3>
                                    Why This Party?
                                </h3>

                                <p>
                                    {candidate.partyReason}
                                </p>

                            </div>

                        )}


                        {candidate.politicalMotivation && (

                            <div className="content-card">

                                <h3>
                                    Political Motivation
                                </h3>

                                <p>
                                    {candidate.politicalMotivation}
                                </p>

                            </div>

                        )}

                    </div>

                </section>


                {/* =================================================
                    PRIORITIES
                    ================================================= */}

                <section
                    id="priorities"
                    className="candidate-section"
                >

                    <div className="section-heading">

                        <span>
                            04
                        </span>

                        <div>

                            <h2>
                                Political Priorities
                            </h2>

                            <p>
                                Key policy areas and priorities
                            </p>

                        </div>

                    </div>


                    {priorities.length > 0 ? (

                        <div className="priorities-grid">

                            {priorities.map((item, index) => (

                                <div
                                    className="priority-card"
                                    key={index}
                                >

                                    <div className="priority-number">
                                        {String(index + 1).padStart(2, "0")}
                                    </div>


                                    <h3>
                                        {item.title}
                                    </h3>


                                    <p>
                                        {item.description}
                                    </p>

                                </div>

                            ))}

                        </div>

                    ) : (

                        <div className="empty-card">
                            Political priorities are not available.
                        </div>

                    )}

                </section>


                {/* =================================================
                    ELECTORAL RECORD
                    ================================================= */}

                <section
                    id="elections"
                    className="candidate-section"
                >

                    <div className="section-heading">

                        <span>
                            05
                        </span>

                        <div>

                            <h2>
                                Electoral Record
                            </h2>

                            <p>
                                Previous publicly recorded election results
                            </p>

                        </div>

                    </div>


                    {electoralRecord.length > 0 ? (

                        <div className="election-table-wrapper">

                            <table className="election-table">

                                <thead>

                                    <tr>

                                        <th>
                                            Year
                                        </th>

                                        <th>
                                            Election
                                        </th>

                                        <th>
                                            Constituency
                                        </th>

                                        <th>
                                            Party
                                        </th>

                                        <th>
                                            Result
                                        </th>

                                        <th>
                                            Votes
                                        </th>

                                        <th>
                                            Vote Share
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {electoralRecord.map(
                                        (item, index) => (

                                            <tr key={index}>

                                                <td>
                                                    {item.year || "—"}
                                                </td>


                                                <td>
                                                    {item.election || "—"}
                                                </td>


                                                <td>
                                                    {item.constituency || "—"}
                                                </td>


                                                <td>

                                                    <div className="table-party">

                                                        <img
                                                            src={getPartyLogo(
                                                                item.party ||
                                                                partyName
                                                            )}
                                                            alt={
                                                                item.party ||
                                                                partyName
                                                            }
                                                            className="table-party-logo"
                                                            onError={(event) => {
                                                                event.currentTarget.src =
                                                                    PARTY_LOGOS.independent;
                                                            }}
                                                        />


                                                        <span>
                                                            {item.party || "—"}
                                                        </span>

                                                    </div>

                                                </td>


                                                <td>

                                                    <span
                                                        className={
                                                            item.result
                                                                ?.toLowerCase() ===
                                                                "won"
                                                                ? "result-won"
                                                                : "result-other"
                                                        }
                                                    >
                                                        {item.result || "—"}
                                                    </span>

                                                </td>


                                                <td>
                                                    {item.votes
                                                        ? item.votes.toLocaleString()
                                                        : "—"}
                                                </td>


                                                <td>
                                                    {item.voteShare
                                                        ? `${item.voteShare}%`
                                                        : "—"}
                                                </td>

                                            </tr>

                                        )
                                    )}

                                </tbody>

                            </table>

                        </div>

                    ) : (

                        <div className="empty-card">
                            Electoral record is not available.
                        </div>

                    )}

                </section>


                {/* =================================================
                    ACHIEVEMENTS
                    ================================================= */}

                <section
                    id="achievements"
                    className="candidate-section"
                >

                    <div className="section-heading">

                        <span>
                            06
                        </span>

                        <div>

                            <h2>
                                Achievements
                            </h2>

                            <p>
                                Selected publicly documented achievements
                            </p>

                        </div>

                    </div>


                    {achievements.length > 0 ? (

                        <div className="achievements-list">

                            {achievements.map(
                                (achievement, index) => (

                                    <div
                                        className="achievement-item"
                                        key={index}
                                    >

                                        <div className="achievement-check">
                                            ✓
                                        </div>

                                        <p>
                                            {achievement}
                                        </p>

                                    </div>

                                )
                            )}

                        </div>

                    ) : (

                        <div className="empty-card">
                            No achievements have been added yet.
                        </div>

                    )}

                </section>


                {/* =================================================
                    CRITICISM
                    ================================================= */}

                <section
                    id="criticism"
                    className="candidate-section"
                >

                    <div className="section-heading">

                        <span>
                            07
                        </span>

                        <div>

                            <h2>
                                Public Debate & Criticism
                            </h2>

                            <p>
                                Reported criticism, controversies and responses
                            </p>

                        </div>

                    </div>


                    {criticisms.length > 0 && (

                        <div className="criticism-list">

                            {criticisms.map((item, index) => (

                                <div
                                    className="criticism-card"
                                    key={index}
                                >

                                    <div className="criticism-header">

                                        <h3>
                                            {item.title}
                                        </h3>


                                        {item.year && (

                                            <span>
                                                {item.year}
                                            </span>

                                        )}

                                    </div>


                                    {item.category && (

                                        <div className="criticism-category">
                                            {item.category}
                                        </div>

                                    )}


                                    <p>
                                        {item.description}
                                    </p>


                                    {item.response && (

                                        <div className="response-box">

                                            <strong>
                                                Response
                                            </strong>

                                            <p>
                                                {item.response}
                                            </p>

                                        </div>

                                    )}


                                    {item.source && (

                                        <small>
                                            Source: {item.source}
                                        </small>

                                    )}

                                </div>

                            ))}

                        </div>

                    )}


                    {controversies.length > 0 && (

                        <div className="controversies">

                            <h3>
                                Reported Controversies
                            </h3>


                            {controversies.map(
                                (item, index) => (

                                    <div
                                        className="controversy-item"
                                        key={index}
                                    >
                                        ⚠️ {item}
                                    </div>

                                )
                            )}

                        </div>

                    )}


                    {criticisms.length === 0 &&
                        controversies.length === 0 && (

                            <div className="empty-card">
                                No public-debate information has been added yet.
                            </div>

                        )}

                </section>


                {/* =================================================
                    PUBLICATIONS
                    ================================================= */}

                {publications.length > 0 && (

                    <section className="candidate-section">

                        <div className="section-heading">

                            <span>
                                08
                            </span>

                            <div>

                                <h2>
                                    Publications & Public Work
                                </h2>

                                <p>
                                    Selected publications and public contributions
                                </p>

                            </div>

                        </div>


                        <div className="publications-list">

                            {publications.map(
                                (item, index) => (

                                    <div
                                        className="publication-item"
                                        key={index}
                                    >
                                        📄 {item}
                                    </div>

                                )
                            )}

                        </div>

                    </section>

                )}


                {/* =================================================
                    SOURCES
                    ================================================= */}

                <section
                    id="sources"
                    className="candidate-section sources-section"
                >

                    <div className="section-heading">

                        <span>
                            09
                        </span>

                        <div>

                            <h2>
                                Sources & Verification
                            </h2>

                            <p>
                                Public sources used for this candidate profile
                            </p>

                        </div>

                    </div>


                    {sources.length > 0 ? (

                        <div className="sources-list">

                            {sources.map((source, index) => (

                                <a
                                    key={index}
                                    href={source.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="source-item"
                                >

                                    <span>
                                        🔗
                                    </span>


                                    <div>

                                        <strong>
                                            {source.title}
                                        </strong>


                                        <small>
                                            Open source →
                                        </small>

                                    </div>

                                </a>

                            ))}

                        </div>

                    ) : (

                        <div className="empty-card">
                            Sources have not been added yet.
                        </div>

                    )}

                </section>


                {/* =================================================
                    OFFICIAL LINKS
                    ================================================= */}

                {(candidate.officialWebsite ||
                    candidate.socialMedia) && (

                        <section className="official-links-section">

                            <h2>
                                Official Links
                            </h2>


                            <div className="official-links">

                                {candidate.officialWebsite && (

                                    <a
                                        href={candidate.officialWebsite}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        🌐 Official Website
                                    </a>

                                )}


                                {candidate.socialMedia?.twitter && (

                                    <a
                                        href={candidate.socialMedia.twitter}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        𝕏 X / Twitter
                                    </a>

                                )}


                                {candidate.socialMedia?.facebook && (

                                    <a
                                        href={candidate.socialMedia.facebook}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        📘 Facebook
                                    </a>

                                )}


                                {candidate.socialMedia?.instagram && (

                                    <a
                                        href={candidate.socialMedia.instagram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        📷 Instagram
                                    </a>

                                )}


                                {candidate.socialMedia?.youtube && (

                                    <a
                                        href={candidate.socialMedia.youtube}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        ▶️ YouTube
                                    </a>

                                )}

                            </div>

                        </section>

                    )}

            </main>

        </div>

    );

}


export default CandidateDetails;