import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./Pages.css";

function CandidateDetail() {
  const { id } = useParams();

  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        console.log("Loading candidate:", id);

        const response = await axios.get(
          `http://localhost:8000/api/candidates/${id}`
        );

        console.log("Candidate data:", response.data);

        setCandidate(response.data);
      } catch (err) {
        console.error("Candidate detail error:", err);
        setError(
          err.response?.data?.message ||
          "Unable to load candidate information."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCandidate();
  }, [id]);

  if (loading) {
    return (
      <div className="detail-page">
        <Link to="/candidates" className="back-link">
          ← Back to Candidates
        </Link>

        <div className="loading">
          Loading candidate profile...
        </div>
      </div>
    );
  }

  if (error || !candidate) {
    return (
      <div className="detail-page">
        <Link to="/candidates" className="back-link">
          ← Back to Candidates
        </Link>

        <div className="error-message">
          ❌ {error || "Candidate not found"}
        </div>
      </div>
    );
  }

  const partyName =
    candidate.party?.name ||
    candidate.partyName ||
    "Independent";

  const partyShort =
    candidate.party?.shortName || "";

  const partyId =
    candidate.party?._id || null;

  return (
    <div className="detail-page">

      {/* BACK */}
      <Link to="/candidates" className="back-link">
        ← Back to Candidates
      </Link>

      {/* HERO */}
      <section className="candidate-profile-hero">

        <div className="candidate-large-image">

          {candidate.image ? (
            <img
              src={`/images/candidates/${candidate.image}`}
              alt={candidate.name}
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.parentElement.innerHTML = "👤";
              }}
            />
          ) : (
            <span>👤</span>
          )}

        </div>

        <div className="candidate-hero-content">

          <span className="profile-label">
            POLITICAL PROFILE
          </span>

          <h1>{candidate.name}</h1>

          <h3>
            🏛️ {partyName}
            {partyShort && ` (${partyShort})`}
          </h3>

          {candidate.position && (
            <p className="candidate-position">
              {candidate.position}
            </p>
          )}

          <div className="candidate-location">

            {candidate.constituency && (
              <span>
                📍 {candidate.constituency}
              </span>
            )}

            {candidate.state && (
              <span>
                🗺️ {candidate.state}
              </span>
            )}

          </div>

        </div>

      </section>


      {/* QUICK FACTS */}
      <section className="detail-section">

        <h2>📋 Quick Facts</h2>

        <div className="facts-grid">

          <Fact
            label="Age"
            value={candidate.age}
          />

          <Fact
            label="Education"
            value={candidate.education}
          />

          <Fact
            label="State"
            value={candidate.state}
          />

          <Fact
            label="Constituency"
            value={candidate.constituency}
          />

          <Fact
            label="Political Position"
            value={candidate.position}
          />

          <Fact
            label="Experience"
            value={candidate.experience}
          />

        </div>

      </section>


      {/* ABOUT */}
      {candidate.biography && (
        <section className="detail-section">

          <h2>📖 About the Candidate</h2>

          <p className="detail-text">
            {candidate.biography}
          </p>

        </section>
      )}


      {/* EARLY LIFE */}
      {candidate.earlyLife && (
        <section className="detail-section">

          <h2>🌱 Early Life & Education</h2>

          <p className="detail-text">
            {candidate.earlyLife}
          </p>

        </section>
      )}


      {/* POLITICAL JOURNEY */}
      {candidate.politicalJourney?.length > 0 && (
        <section className="detail-section">

          <h2>🏛️ Political Journey</h2>

          <div className="candidate-timeline">

            {candidate.politicalJourney.map(
              (item, index) => (

                <div
                  className="candidate-timeline-item"
                  key={index}
                >

                  <div className="candidate-timeline-year">
                    {item.year}
                  </div>

                  <div className="candidate-timeline-content">

                    <h3>{item.title}</h3>

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


      {/* PARTY ASSOCIATION */}
      <section className="detail-section">

        <h2>🏛️ Party Association & Political Priorities</h2>

        {candidate.partyAssociation && (
          <div className="detail-block">

            <h3>Party Association</h3>

            <p>
              {candidate.partyAssociation}
            </p>

          </div>
        )}

        {candidate.partyReason && (
          <div className="detail-block">

            <h3>Why this party?</h3>

            <p>
              {candidate.partyReason}
            </p>

          </div>
        )}

        {candidate.politicalMotivation && (
          <div className="detail-block">

            <h3>Stated Political Priorities</h3>

            <p>
              {candidate.politicalMotivation}
            </p>

          </div>
        )}

        {!candidate.partyAssociation &&
          !candidate.partyReason &&
          !candidate.politicalMotivation && (

            <p className="detail-text">
              Detailed information about the candidate's
              party association and stated political
              priorities will be added as verified data
              becomes available.
            </p>

          )}

      </section>


      {/* ACHIEVEMENTS */}
      {candidate.achievements?.length > 0 && (
        <section className="detail-section">

          <h2>🏆 Major Achievements</h2>

          <div className="achievement-list">

            {candidate.achievements.map(
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


      {/* PRIORITIES */}
      {candidate.priorities?.length > 0 && (
        <section className="detail-section">

          <h2>🎯 Key Political Priorities</h2>

          <div className="priority-grid">

            {candidate.priorities.map(
              (item, index) => (

                <div
                  className="priority-card"
                  key={index}
                >

                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    {item.description}
                  </p>

                </div>

              )
            )}

          </div>

        </section>
      )}


      {/* POSITIONS */}
      {candidate.positionsHeld?.length > 0 && (
        <section className="detail-section">

          <h2>💼 Positions Held</h2>

          <div className="positions-list">

            {candidate.positionsHeld.map(
              (item, index) => (

                <div
                  className="position-item"
                  key={index}
                >

                  <strong>
                    {item.position}
                  </strong>

                  <span>
                    {item.from} – {item.to || "Present"}
                  </span>

                </div>

              )
            )}

          </div>

        </section>
      )}


      {/* ELECTORAL RECORD */}
      {candidate.electoralRecord?.length > 0 && (
        <section className="detail-section">

          <h2>🗳️ Electoral Record</h2>

          <div className="electoral-table-wrapper">

            <table className="electoral-table">

              <thead>
                <tr>
                  <th>Year</th>
                  <th>Election</th>
                  <th>Constituency</th>
                  <th>Party</th>
                  <th>Result</th>
                  <th>Votes</th>
                  <th>Vote Share</th>
                </tr>
              </thead>

              <tbody>

                {candidate.electoralRecord.map(
                  (item, index) => (

                    <tr key={index}>

                      <td>{item.year}</td>

                      <td>{item.election}</td>

                      <td>{item.constituency}</td>

                      <td>{item.party}</td>

                      <td>
                        {item.result}
                      </td>

                      <td>
                        {item.votes ?? "-"}
                      </td>

                      <td>
                        {item.voteShare
                          ? `${item.voteShare}%`
                          : "-"}
                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        </section>
      )}


      {/* CRITICISMS */}
      {candidate.criticisms?.length > 0 && (
        <section className="detail-section criticism-section">

          <h2>⚠️ Criticisms & Controversies</h2>

          {candidate.criticisms.map(
            (item, index) => (

              <div
                className="criticism-item"
                key={index}
              >
                {item}
              </div>

            )
          )}

          <p className="neutral-note">
            This section presents publicly reported
            criticisms or controversies. Inclusion does
            not mean that every allegation is established
            fact.
          </p>

        </section>
      )}


      {/* PARTY */}
      {partyId && (
        <section className="related-party">

          <h2>🏛️ Political Party</h2>

          <p>
            Learn more about {partyName}, including its
            history, ideology, leadership, manifesto,
            electoral performance and record.
          </p>

          <Link
            to={`/parties/${partyId}`}
            className="profile-button"
          >
            View {partyName} →
          </Link>

        </section>
      )}

    </div>
  );
}


function Fact({ label, value }) {

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


export default CandidateDetail;