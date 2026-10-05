import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./Pages.css";


/* =========================================================
   PARTY LOGOS
   All files are inside:

   client/
   └── public/
       └── party-logos/
           ├── aap.png
           ├── bjp.png
           ├── congress.png
           ├── shivsena.png
           └── etc...
========================================================= */

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


/* =========================================================
   GET PARTY LOGO
========================================================= */

function getPartyLogo(party) {

  if (!party) {
    return null;
  }


  /* -----------------------------------------
     First identify party using shortName
  ----------------------------------------- */

  const shortName = (
    party.shortName ||
    ""
  )
    .toString()
    .trim()
    .toUpperCase()
    .replace(/[\s._-]/g, "");


  /* -----------------------------------------
     Direct mapping
  ----------------------------------------- */

  if (PARTY_LOGOS[shortName]) {
    return PARTY_LOGOS[shortName];
  }


  /* -----------------------------------------
     Handle Shiv Sena variations
  ----------------------------------------- */

  const partyName = (
    party.name ||
    party.partyName ||
    ""
  )
    .toString()
    .trim()
    .toUpperCase();


  if (
    partyName.includes("SHIV SENA") &&
    (
      partyName.includes("UDDHAV") ||
      partyName.includes("THACKERAY")
    )
  ) {

    return PARTY_LOGOS.SHIVSENAUBT;

  }


  if (partyName.includes("SHIV SENA")) {

    return PARTY_LOGOS.SHIVSENA;

  }


  /* -----------------------------------------
     Handle Congress variations
  ----------------------------------------- */

  if (
    partyName.includes("INDIAN NATIONAL CONGRESS") ||
    partyName === "CONGRESS"
  ) {

    return PARTY_LOGOS.CONGRESS;

  }


  /* -----------------------------------------
     Handle AITC / TMC
  ----------------------------------------- */

  if (
    partyName.includes("TRINAMOOL") ||
    partyName.includes("ALL INDIA TRINAMOOL")
  ) {

    return PARTY_LOGOS.TMC;

  }


  /* -----------------------------------------
     Handle database logo
  ----------------------------------------- */

  if (party.logo) {

    const logo = party.logo.toString().trim();


    /* Full URL */

    if (
      logo.startsWith("http://") ||
      logo.startsWith("https://")
    ) {

      return logo;

    }


    /* Already an absolute public path */

    if (logo.startsWith("/")) {

      return logo;

    }


    /* Filename such as bjp.png */

    return `/party-logos/${logo}`;

  }


  return null;
}


/* =========================================================
   PARTY DETAILS
========================================================= */

function PartyDetails() {

  const { id } = useParams();


  const [party, setParty] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  /* =====================================================
     FETCH PARTY
  ===================================================== */

  useEffect(() => {

    const fetchParty = async () => {

      try {

        setLoading(true);

        const res = await axios.get(
          `http://localhost:8000/api/parties/${id}`
        );


        setParty(res.data);

        setError("");

      } catch (err) {

        console.error(
          "Party details error:",
          err
        );


        setError(
          err.response?.data?.message ||
          "Unable to load party information."
        );

      } finally {

        setLoading(false);

      }

    };


    fetchParty();

  }, [id]);


  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {

    return (

      <div className="detail-page">

        <div className="loading">

          Loading party profile...

        </div>

      </div>

    );

  }


  /* =====================================================
     ERROR
  ===================================================== */

  if (error || !party) {

    return (

      <div className="detail-page">

        <Link
          to="/parties"
          className="back-link"
        >

          ← Back to Parties

        </Link>


        <div className="error-message">

          ❌ {error || "Party not found"}

        </div>

      </div>

    );

  }


  /* =====================================================
     GET LOGO
  ===================================================== */

  const partyLogo = getPartyLogo(party);


  return (

    <div className="detail-page">


      {/* =================================================
                BACK
            ================================================= */}

      <Link
        to="/parties"
        className="back-link"
      >

        ← Back to Parties

      </Link>


      {/* =================================================
                HERO
            ================================================= */}

      <section
        className="party-detail-hero"
        style={{
          "--party-color":
            party.themeColor || "#1f3864"
        }}
      >


        {/* =================================================
                    PARTY LOGO
                ================================================= */}

        <div className="party-detail-logo">

          {partyLogo ? (

            <img
              src={partyLogo}
              alt={`${party.name || "Party"} logo`}
              className="party-detail-logo-image"
              onError={(e) => {

                console.error(
                  "Logo failed to load:",
                  partyLogo
                );

                e.currentTarget.style.display =
                  "none";

                const placeholder =
                  e.currentTarget
                    .parentElement
                    .querySelector(
                      ".party-logo-placeholder"
                    );

                if (placeholder) {
                  placeholder.style.display =
                    "flex";
                }

              }}
            />

          ) : null}


          {/* Fallback */}

          <div
            className="party-logo-placeholder"
            style={{
              display: partyLogo
                ? "none"
                : "flex"
            }}
          >

            🏛️

          </div>

        </div>


        {/* =================================================
                    PARTY TITLE
                ================================================= */}

        <div className="party-detail-title">


          <span className="profile-label">

            POLITICAL PARTY PROFILE

          </span>


          <h1>

            {party.name ||
              party.partyName ||
              "Political Party"}

          </h1>


          {party.shortName && (

            <h3>

              {party.shortName}

            </h3>

          )}


          {party.description && (

            <p>

              {party.description}

            </p>

          )}


          <div className="party-hero-tags">


            {party.founded && (

              <span>

                📅 Founded {party.founded}

              </span>

            )}


            {party.ideology && (

              <span>

                🎯 {party.ideology}

              </span>

            )}


            {party.alliance && (

              <span>

                🤝 {party.alliance}

              </span>

            )}

          </div>


        </div>

      </section>


      {/* =================================================
                PARTY SNAPSHOT
            ================================================= */}

      <section className="detail-section">


        <h2>

          📊 Party Snapshot

        </h2>


        <div className="party-facts-grid">


          <PartyFact
            label="Founded"
            value={party.founded}
          />


          <PartyFact
            label="Founder(s)"
            value={party.founders}
          />


          <PartyFact
            label="Headquarters"
            value={party.headquarters}
          />


          <PartyFact
            label="Current Leader"
            value={party.currentLeader}
          />


          <PartyFact
            label="Ideology"
            value={party.ideology}
          />


          <PartyFact
            label="Alliance"
            value={party.alliance}
          />


          <PartyFact
            label="Prime Ministerial Candidate"
            value={party.currentPMCandidate}
          />


          <PartyFact
            label="Party Symbol"
            value={party.symbolName}
          />

        </div>

      </section>


      {/* =================================================
                ABOUT
            ================================================= */}

      {party.description && (

        <section className="detail-section">


          <h2>

            📖 About the Party

          </h2>


          <p className="detail-text">

            {party.description}

          </p>


        </section>

      )}


      {/* =================================================
                IDEOLOGY
            ================================================= */}

      {party.ideology && (

        <section className="detail-section">


          <h2>

            🎯 Ideology & Principles

          </h2>


          <div className="ideology-box">


            <div className="ideology-icon">

              🎯

            </div>


            <div>


              <h3>

                {party.ideology}

              </h3>


              <p>

                This section describes the
                political ideology and principles
                associated with the party based on
                its public documents, constitution
                and official statements.

              </p>


            </div>


          </div>


        </section>

      )}


      {/* =================================================
                LEADERSHIP
            ================================================= */}

      <section className="detail-section">


        <h2>

          👥 Leadership

        </h2>


        <div className="leadership-grid">


          {party.currentLeader && (

            <div className="leader-card">


              <span>

                Current Leader

              </span>


              <h3>

                {party.currentLeader}

              </h3>


            </div>

          )}


          {party.currentPMCandidate && (

            <div className="leader-card">


              <span>

                PM Candidate

              </span>


              <h3>

                {party.currentPMCandidate}

              </h3>


            </div>

          )}


          {party.founders && (

            <div className="leader-card">


              <span>

                Founder(s)

              </span>


              <h3>

                {party.founders}

              </h3>


            </div>

          )}

        </div>


      </section>


      {/* =================================================
                TIMELINE
            ================================================= */}

      {party.timeline?.length > 0 && (

        <section className="detail-section">


          <h2>

            🕰️ Party Timeline

          </h2>


          <div className="party-timeline">


            {party.timeline.map(
              (item, index) => (

                <div
                  className="party-timeline-item"
                  key={index}
                >


                  <div className="party-timeline-year">

                    {item.year}

                  </div>


                  <div className="party-timeline-card">


                    <h3>

                      {item.title}

                    </h3>


                    <p>

                      {item.description}

                    </p>


                  </div>


                </div>

              )
            )}

          </div>


        </section>

      )}


      {/* =================================================
                PROMISES
            ================================================= */}

      {party.promises?.length > 0 && (

        <section className="detail-section">


          <h2>

            📜 What the Party Promised

          </h2>


          <p className="section-intro">

            Major commitments made in election
            manifestos or public policy documents.

          </p>


          <div className="promise-grid">


            {party.promises.map(
              (item, index) => (

                <div
                  className="promise-card"
                  key={index}
                >


                  <div className="promise-top">


                    {item.year && (

                      <span>

                        {item.year}

                      </span>

                    )}


                    {item.status && (

                      <strong
                        className={`promise-status ${getStatusClass(
                          item.status
                        )}`}
                      >

                        {item.status}

                      </strong>

                    )}


                  </div>


                  <h3>

                    {item.title}

                  </h3>


                  <p>

                    {item.promise}

                  </p>


                  {item.actionTaken && (

                    <div className="promise-action">


                      <strong>

                        Action / Evidence

                      </strong>


                      <p>

                        {item.actionTaken}

                      </p>


                    </div>

                  )}


                  {item.evidence && (

                    <p className="evidence-text">

                      <strong>
                        Evidence:
                      </strong>{" "}

                      {item.evidence}

                    </p>

                  )}


                </div>

              )
            )}

          </div>


        </section>

      )}


      {/* =================================================
                ACHIEVEMENTS
            ================================================= */}

      {party.achievements?.length > 0 && (

        <section className="detail-section">


          <h2>

            🏆 What the Party Has Done

          </h2>


          <p className="section-intro">

            Notable policies, programmes,
            achievements and actions associated
            with the party.

          </p>


          <div className="achievement-list">


            {party.achievements.map(
              (item, index) => (

                <div
                  className="achievement-item"
                  key={index}
                >


                  <span>

                    ✓

                  </span>


                  <p>

                    {item}

                  </p>


                </div>

              )
            )}

          </div>


        </section>

      )}


      {/* =================================================
                SCHEMES
            ================================================= */}

      {party.majorSchemes?.length > 0 && (

        <section className="detail-section">


          <h2>

            🏛️ Major Schemes & Policies

          </h2>


          <div className="scheme-grid">


            {party.majorSchemes.map(
              (item, index) => {


                const title =
                  typeof item === "string"
                    ? item
                    : item.name ||
                    item.title;


                const description =
                  typeof item === "string"
                    ? ""
                    : item.description;


                return (

                  <div
                    className="scheme-card"
                    key={index}
                  >


                    <div className="scheme-icon">

                      🇮🇳

                    </div>


                    <div>


                      <h3>

                        {title}

                      </h3>


                      {description && (

                        <p>

                          {description}

                        </p>

                      )}


                    </div>


                  </div>

                );

              }
            )}

          </div>


        </section>

      )}


      {/* =================================================
                CRITICISMS
            ================================================= */}

      {party.criticisms?.length > 0 && (

        <section
          className="detail-section criticism-section"
        >


          <h2>

            ⚠️ Criticisms & Concerns

          </h2>


          <div className="criticism-list">


            {party.criticisms.map(
              (item, index) => (

                <div
                  className="criticism-item"
                  key={index}
                >

                  {item}

                </div>

              )
            )}

          </div>


          <p className="neutral-note">

            These are publicly reported criticisms
            or concerns. Their inclusion does not
            mean that every allegation is established
            fact.

          </p>


        </section>

      )}


      {/* =================================================
                PROTESTS
            ================================================= */}

      {party.protests?.length > 0 && (

        <section className="detail-section">


          <h2>

            ✊ Protests & Political Disputes

          </h2>


          <div className="protest-list">


            {party.protests.map(
              (item, index) => (

                <div
                  className="protest-item"
                  key={index}
                >

                  {typeof item === "string"
                    ? item
                    : item.description ||
                    item.title}

                </div>

              )
            )}

          </div>


        </section>

      )}


      {/* =================================================
                ELECTION RESULTS
            ================================================= */}

      {party.electionResults?.length > 0 && (

        <section className="detail-section">


          <h2>

            🗳️ Electoral Performance

          </h2>


          <div className="electoral-table-wrapper">


            <table className="electoral-table">


              <thead>

                <tr>

                  <th>
                    Year
                  </th>

                  <th>
                    Election
                  </th>

                  <th>
                    Alliance
                  </th>

                  <th>
                    Seats Won
                  </th>

                  <th>
                    Vote Share
                  </th>

                  <th>
                    Government
                  </th>

                </tr>

              </thead>


              <tbody>


                {party.electionResults.map(
                  (item, index) => (

                    <tr key={index}>


                      <td>

                        {item.year}

                      </td>


                      <td>

                        {item.electionType}

                      </td>


                      <td>

                        {item.alliance || "-"}

                      </td>


                      <td>

                        {item.seatsWon ?? "-"}

                      </td>


                      <td>

                        {item.voteShare
                          ? `${item.voteShare}%`
                          : "-"}

                      </td>


                      <td>

                        {item.governmentFormed
                          ? "Yes"
                          : "No"}

                      </td>


                    </tr>

                  )
                )}


              </tbody>


            </table>


          </div>


        </section>

      )}


      {/* =================================================
                STATES GOVERNED
            ================================================= */}

      {party.statesGoverned?.length > 0 && (

        <section className="detail-section">


          <h2>

            🗺️ States Governed

          </h2>


          <div className="states-grid">


            {party.statesGoverned.map(
              (item, index) => (

                <div
                  className="state-card"
                  key={index}
                >


                  <h3>

                    {item.state}

                  </h3>


                  {item.chiefMinister && (

                    <p>

                      Chief Minister:{" "}

                      <strong>

                        {item.chiefMinister}

                      </strong>

                    </p>

                  )}


                  {item.status && (

                    <span>

                      {item.status}

                    </span>

                  )}


                </div>

              )
            )}

          </div>


        </section>

      )}


      {/* =================================================
                FAQ
            ================================================= */}

      {party.faqs?.length > 0 && (

        <section className="detail-section">


          <h2>

            ❓ Frequently Asked Questions

          </h2>


          <div className="faq-list">


            {party.faqs.map(
              (item, index) => (

                <details
                  className="faq-item"
                  key={index}
                >


                  <summary>

                    {item.question}

                  </summary>


                  <p>

                    {item.answer}

                  </p>


                </details>

              )
            )}

          </div>


        </section>

      )}


      {/* =================================================
                OFFICIAL WEBSITE
            ================================================= */}

      {party.website && (

        <section className="party-source-card">


          <div>


            <h2>

              🔗 Official Party Website

            </h2>


            <p>

              Visit the party's official website
              for primary-source information,
              manifestos and official announcements.

            </p>


          </div>


          <a
            href={party.website}
            target="_blank"
            rel="noopener noreferrer"
            className="profile-button"
          >

            Visit Official Website →

          </a>


        </section>

      )}


    </div>

  );

}


/* =========================================================
   PARTY FACT COMPONENT
========================================================= */

function PartyFact({ label, value }) {

  if (
    value === undefined ||
    value === null ||
    value === ""
  ) {

    return null;

  }


  return (

    <div className="fact-card">


      <span>

        {label}

      </span>


      <strong>

        {value}

      </strong>


    </div>

  );

}


/* =========================================================
   PROMISE STATUS
========================================================= */

function getStatusClass(status) {

  if (!status) {

    return "";

  }


  const value =
    status
      .toString()
      .toLowerCase();


  if (value.includes("completed")) {

    return "status-completed";

  }


  if (value.includes("partial")) {

    return "status-partial";

  }


  if (value.includes("progress")) {

    return "status-progress";

  }


  if (value.includes("not started")) {

    return "status-not-started";

  }


  return "status-unknown";

}


export default PartyDetails;