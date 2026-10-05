import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Pages.css";


/* =====================================================
   PARTY LOGOS

   All logo images should be inside:

   client/public/party-logos/

   Example:
   client/public/party-logos/aap.png
===================================================== */

const PARTY_LOGOS = {

    AAP: "/party-logos/aap.png",

    AJP: "/party-logos/ajp.png",

    AGP: "/party-logos/agp.png",

    AIADMK: "/party-logos/aiadmk.png",

    AIMIM: "/party-logos/aimim.png",

    BJD: "/party-logos/bjd.png",

    BJP: "/party-logos/bjp.png",

    BSP: "/party-logos/bsp.png",

    INC: "/party-logos/congress.png",

    CONGRESS: "/party-logos/congress.png",

    CPI: "/party-logos/cpi.png",

    CPIM: "/party-logos/cpim.png",

    CPM: "/party-logos/cpim.png",

    DMK: "/party-logos/dmk.png",

    JDU: "/party-logos/jdu.png",

    JMM: "/party-logos/jmm.png",

    NC: "/party-logos/nc.png",

    NCP: "/party-logos/ncp.png",

    NPP: "/party-logos/npp.png",

    PDP: "/party-logos/pdp.png",

    RJD: "/party-logos/rjd.png",

    SAD: "/party-logos/sad.png",

    SHS: "/party-logos/shivsena.png",

    SHIVSENA: "/party-logos/shivsena.png",

    SHSUBT: "/party-logos/shivsenaubt.png",
    SHIVSENAUBT: "/party-logos/shivsenaubt.png",

    SP: "/party-logos/sp.png",

    TDP: "/party-logos/tdp.png",

    TMC: "/party-logos/tmc.png",

    AITC: "/party-logos/tmc.png",

    YSRCP: "/party-logos/ysrcp.png"

};


/* =====================================================
   GET PARTY LOGO

   First priority:
   1. Logo already stored in database

   Second priority:
   2. Local logo based on shortName

   If nothing exists:
   3. Return null and show 🏛️
===================================================== */

function getPartyLogo(party) {

    /* If backend already has a logo URL */
    if (party.logo) {
        return party.logo;
    }


    /* Get short name */
    const shortName =
        party.shortName ||
        "";


    /* Clean the short name */

    const key = shortName
        .toString()
        .trim()
        .toUpperCase()
        .replace(/[\s.-]/g, "");


    /* Return matching local logo */

    return PARTY_LOGOS[key] || null;
}


function Parties() {

    const [parties, setParties] = useState([]);

    const [search, setSearch] = useState("");


    /* =====================================================
       FETCH PARTIES
    ===================================================== */

    useEffect(() => {

        axios
            .get("http://localhost:8000/api/parties")

            .then(res => {

                const data =
                    Array.isArray(res.data)
                        ? res.data
                        : res.data.parties || [];


                setParties(data);

            })

            .catch(err => {

                console.error(
                    "Party Error:",
                    err
                );

            });

    }, []);


    /* =====================================================
       SEARCH / FILTER
    ===================================================== */

    const filteredParties = parties.filter(party => {

        const name =
            party.name ||
            party.partyName ||
            "";


        const shortName =
            party.shortName ||
            "";


        return (

            name
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                )

            ||

            shortName
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                )

        );

    });


    /* =====================================================
       PAGE
    ===================================================== */

    return (

        <div className="page">


            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <div className="page-header">

                <div className="page-icon">
                    🏛️
                </div>


                <h1>
                    Political Parties
                </h1>


                <p>
                    Explore India's major political parties,
                    their history, leaders and ideology.
                </p>

            </div>



            {/* =================================================
                SEARCH
            ================================================= */}

            <div className="search-box">

                <span>
                    🔎
                </span>


                <input
                    type="text"
                    placeholder="Search political party..."
                    value={search}
                    onChange={e =>
                        setSearch(e.target.value)
                    }
                />

            </div>



            {/* =================================================
                PARTY GRID
            ================================================= */}

            <div className="party-grid">


                {filteredParties.map(
                    (party, index) => {


                        /* Get party logo */

                        const logo =
                            getPartyLogo(party);


                        /* Party name */

                        const partyName =
                            party.name ||
                            party.partyName ||
                            "Political Party";


                        return (

                            <div
                                className="party-card"
                                key={
                                    party._id ||
                                    index
                                }
                            >


                                {/* =================================
                                    PARTY LOGO
                                ================================= */}

                                <div className="party-logo">


                                    {logo ? (

                                        <img
                                            src={logo}
                                            alt={`${partyName} logo`}
                                            className="party-logo-image"

                                            onError={event => {

                                                /*
                                                 * If image cannot
                                                 * be loaded, hide it
                                                 * and show fallback.
                                                 */

                                                event.currentTarget.style.display =
                                                    "none";

                                                const fallback =
                                                    event.currentTarget
                                                        .parentElement
                                                        .querySelector(
                                                            ".party-logo-fallback"
                                                        );

                                                if (fallback) {

                                                    fallback.style.display =
                                                        "flex";

                                                }

                                            }}
                                        />

                                    ) : null}


                                    {/* =================================
                                        FALLBACK ICON
                                    ================================= */}

                                    <span
                                        className="party-logo-fallback"

                                        style={{
                                            display: logo
                                                ? "none"
                                                : "flex"
                                        }}
                                    >
                                        🏛️
                                    </span>


                                </div>



                                {/* =================================
                                    PARTY NAME
                                ================================= */}

                                <h2>
                                    {partyName}
                                </h2>



                                {/* =================================
                                    SHORT NAME
                                ================================= */}

                                {party.shortName && (

                                    <span
                                        className="party-short"
                                    >
                                        {party.shortName}
                                    </span>

                                )}



                                {/* =================================
                                    IDEOLOGY
                                ================================= */}

                                {party.ideology && (

                                    <p>
                                        {party.ideology}
                                    </p>

                                )}



                                {/* =================================
                                    FOUNDED
                                ================================= */}

                                {party.founded && (

                                    <div
                                        className="party-info"
                                    >

                                        📅 Founded:{" "}

                                        {party.founded}

                                    </div>

                                )}



                                {/* =================================
                                    VIEW PARTY BUTTON
                                ================================= */}

                                <Link
                                    to={`/party/${party._id}`}
                                    className="details-button"
                                >
                                    View Party →
                                </Link>


                            </div>

                        );

                    }

                )}


            </div>


        </div>

    );

}


export default Parties;