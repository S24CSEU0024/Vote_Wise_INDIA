import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./Pages.css";

function PartyDetails() {
  const { id } = useParams();

  const [party, setParty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchParty = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/parties/${id}`
        );

        setParty(res.data);
      } catch (err) {
        console.error("Party details error:", err);

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

  if (loading) {
    return (
      <div className="detail-page">
        <div className="loading">
          Loading party profile...
        </div>
      </div>
    );
  }

  if (error || !party) {
    return (
      <div className="detail-page">
        <Link to="/parties" className="back-link">
          ← Back to Parties
        </Link>

        <div className="error-message">
          ❌ {error || "Party not found"}
        </div>
      </div>
    );
  }

  return (
    <div className="detail-page">

      {/* BACK */}
      <Link to="/parties" className="back-link">
        ← Back to Parties
      </Link>

      {/* HERO */}
      <section
        className="party-detail-hero"
        style={{
          "--party-color": party.themeColor || "#1f3864"
        }}
      >

        <div className="party-detail-logo">

          {party.logo ? (
            <img
              src={`/images/parties/${party.logo}`}
              alt={party.name}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <div className="party-logo-placeholder">
              🏛️
            </div>
          )}

        </div>

        <div className="party-detail-title">

          <span className="profile-label">
            POLITICAL PARTY PROFILE
          </span>

          <h1>{party.name}</h1>

          {party.shortName && (
            <h3>{party.shortName}</h3>
          )}

          {party.description && (
            <p>{party.description}</p>
          )}

          <div className="party-hero-tags">

            {party.founded && (
              <span>📅 Founded {party.founded}</span>
            )}

            {party.ideology && (
              <span>🎯 {party.ideology}</span>
            )}

            {party.alliance && (
              <span>🤝 {party.alliance}</span>
            )}

          </div>

        </div>

      </section>


      {/* PARTY SNAPSHOT */}
      <section className="detail-section">

        <h2>📊 Party Snapshot</h2>

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


      {/* ABOUT */}
      {party.description && (
        <section className="detail-section">

          <h2>📖 About the Party</h2>

          <p className="detail-text">
            {party.description}
          </p>

        </section>
      )}


      {/* IDEOLOGY */}
      {party.ideology && (
        <section className="detail-section">

          <h2>🎯 Ideology & Principles</h2>

          <div className="ideology-box">

            <div className="ideology-icon">
              🎯
            </div>

            <div>
              <h3>{party.ideology}</h3>

              <p>
                This section describes the political
                ideology and principles associated with
                the party based on its public documents,
                constitution and official statements.
              </p>
            </div>

          </div>

        </section>
      )}


      {/* LEADERSHIP */}
      <section className="detail-section">

        <h2>👥 Leadership</h2>

        <div className="leadership-grid">

          {party.currentLeader && (
            <div className="leader-card">

              <span>Current Leader</span>

              <h3>
                {party.currentLeader}
              </h3>

            </div>
          )}

          {party.currentPMCandidate && (
            <div className="leader-card">

              <span>PM Candidate</span>

              <h3>
                {party.currentPMCandidate}
              </h3>

            </div>
          )}

          {party.founders && (
            <div className="leader-card">

              <span>Founder(s)</span>

              <h3>
                {party.founders}
              </h3>

            </div>
          )}

        </div>

      </section>


      {/* TIMELINE */}
      {party.timeline?.length > 0 && (
        <section className="detail-section">

          <h2>🕰️ Party Timeline</h2>

          <div className="party-timeline">

            {party.timeline.map((item, index) => (

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

            ))}

          </div>

        </section>
      )}


      {/* WHAT PROMISED */}
      {party.promises?.length > 0 && (
        <section className="detail-section">

          <h2>📜 What the Party Promised</h2>

          <p className="section-intro">
            Major commitments made in election
            manifestos or public policy documents.
          </p>

          <div className="promise-grid">

            {party.promises.map((item, index) => (

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
                    <strong>Evidence:</strong>{" "}
                    {item.evidence}
                  </p>
                )}

              </div>

            ))}

          </div>

        </section>
      )}


      {/* ACHIEVEMENTS */}
      {party.achievements?.length > 0 && (
        <section className="detail-section">

          <h2>🏆 What the Party Has Done</h2>

          <p className="section-intro">
            Notable policies, programmes, achievements
            and actions associated with the party.
          </p>

          <div className="achievement-list">

            {party.achievements.map(
              (item, index) => (

                <div
                  className="achievement-item"
                  key={index}
                >

                  <span>✓</span>

                  <p>{item}</p>

                </div>

              )
            )}

          </div>

        </section>
      )}


      {/* SCHEMES */}
      {party.majorSchemes?.length > 0 && (
        <section className="detail-section">

          <h2>🏛️ Major Schemes & Policies</h2>

          <div className="scheme-grid">

            {party.majorSchemes.map(
              (item, index) => {

                const title =
                  typeof item === "string"
                    ? item
                    : item.name || item.title;

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

                      <h3>{title}</h3>

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


      {/* CRITICISMS */}
      {party.criticisms?.length > 0 && (
        <section className="detail-section criticism-section">

          <h2>⚠️ Criticisms & Concerns</h2>

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
            These are publicly reported criticisms or
            concerns. Their inclusion does not mean that
            every allegation is established fact.
          </p>

        </section>
      )}


      {/* PROTESTS */}
      {party.protests?.length > 0 && (
        <section className="detail-section">

          <h2>✊ Protests & Political Disputes</h2>

          <div className="protest-list">

            {party.protests.map(
              (item, index) => (

                <div
                  className="protest-item"
                  key={index}
                >
                  {typeof item === "string"
                    ? item
                    : item.description || item.title}
                </div>

              )
            )}

          </div>

        </section>
      )}


      {/* ELECTION RESULTS */}
      {party.electionResults?.length > 0 && (
        <section className="detail-section">

          <h2>🗳️ Electoral Performance</h2>

          <div className="electoral-table-wrapper">

            <table className="electoral-table">

              <thead>

                <tr>
                  <th>Year</th>
                  <th>Election</th>
                  <th>Alliance</th>
                  <th>Seats Won</th>
                  <th>Vote Share</th>
                  <th>Government</th>
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


      {/* STATES GOVERNED */}
      {party.statesGoverned?.length > 0 && (
        <section className="detail-section">

          <h2>🗺️ States Governed</h2>

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


      {/* FAQ */}
      {party.faqs?.length > 0 && (
        <section className="detail-section">

          <h2>❓ Frequently Asked Questions</h2>

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


      {/* OFFICIAL WEBSITE */}
      {party.website && (
        <section className="party-source-card">

          <div>

            <h2>
              🔗 Official Party Website
            </h2>

            <p>
              Visit the party's official website for
              primary-source information, manifestos
              and official announcements.
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

      <span>{label}</span>

      <strong>{value}</strong>

    </div>
  );
}


function getStatusClass(status) {

  if (!status) return "";

  const value = status.toLowerCase();

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