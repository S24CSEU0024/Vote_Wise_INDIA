import { useEffect, useState } from "react";
import axios from "axios";
import "./Pages.css";
import { Link } from "react-router-dom";

function Candidates() {
  const [candidates, setCandidates] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/candidates")
      .then((res) => {
        console.log("Candidates:", res.data);

        const data = Array.isArray(res.data)
          ? res.data
          : res.data.candidates || [];

        setCandidates(data);
      })
      .catch((err) => {
        console.error("Candidates API Error:", err);
        setError("Unable to load candidates.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredCandidates = candidates.filter((candidate) => {
    const name = candidate.name || "";

    const party =
      candidate.party?.name ||
      candidate.partyName ||
      candidate.party ||
      "";

    const constituency = candidate.constituency || "";

    const searchText =
      `${name} ${party} ${constituency}`.toLowerCase();

    return searchText.includes(search.toLowerCase());
  });

  return (
    <div className="page">

      {/* HEADER */}
      <div className="page-header">
        <span>👤</span>

        <h1>Political Candidates</h1>

        <p>
          Explore Indian political candidates, their parties,
          constituencies and backgrounds.
        </p>
      </div>

      {/* SEARCH */}
      <div className="search-box">
        🔎

        <input
          type="text"
          placeholder="Search candidate, party or constituency..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* LOADING */}
      {loading && (
        <div className="loading">
          Loading candidates...
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div className="error-message">
          ❌ {error}
        </div>
      )}

      {/* EMPTY */}
      {!loading &&
        !error &&
        filteredCandidates.length === 0 && (
          <div className="empty-state">
            <div className="big-icon">👤</div>

            <h2>No candidates found</h2>

            <p>
              Try searching for another candidate,
              party or constituency.
            </p>
          </div>
        )}

      {/* CANDIDATE CARDS */}
      {!loading && !error && filteredCandidates.length > 0 && (
        <div className="card-grid">

          {filteredCandidates.map((candidate, index) => {

            const partyName =
              candidate.party?.name ||
              candidate.partyName ||
              "Independent";

            const partyShort =
              candidate.party?.shortName || "";

            return (
              <div
                className="data-card"
                key={candidate._id || index}
              >

                {/* AVATAR */}
                <div className="candidate-avatar">

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
                    "👤"
                  )}

                </div>

                {/* NAME */}
                <h2>
                  {candidate.name}
                </h2>

                {/* PARTY */}
                <p>
                  🏛️ {partyName}

                  {partyShort && (
                    <strong> ({partyShort})</strong>
                  )}
                </p>

                {/* CONSTITUENCY */}
                {candidate.constituency && (
                  <div className="info-row">
                    📍 <strong>Constituency:</strong>{" "}
                    {candidate.constituency}
                  </div>
                )}

                {/* STATE */}
                {candidate.state && (
                  <div className="info-row">
                    🗺️ <strong>State:</strong>{" "}
                    {candidate.state}
                  </div>
                )}

                {/* POSITION */}
                {candidate.position && (
                  <div className="info-row">
                    🎖️ <strong>Position:</strong>{" "}
                    {candidate.position}
                  </div>
                )}

                {/* AGE */}
                {candidate.age && (
                  <div className="info-row">
                    🎂 <strong>Age:</strong>{" "}
                    {candidate.age}
                  </div>
                )}

                {/* EDUCATION */}
                {candidate.education && (
                  <div className="info-row">
                    🎓 <strong>Education:</strong>{" "}
                    {candidate.education}
                  </div>
                )}

                {/* BUTTON */}
                <Link
                  to={`/candidate/${candidate._id}`}
                  className="profile-button"
                >
                  View Profile →
                </Link>

              </div>
            );
          })}

        </div>
      )}

    </div>
  );
}

export default Candidates;