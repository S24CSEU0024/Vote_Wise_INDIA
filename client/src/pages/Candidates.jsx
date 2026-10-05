import { useEffect, useState } from "react";
import axios from "axios";
import "./Pages.css";
import { Link } from "react-router-dom";

// ============================================
// CANDIDATE PHOTO MAPPING
// ============================================

const CANDIDATE_PHOTOS = {
  ajayrai: "/images/candidates/ajay_rai.jpg",
  akhileshyadav: "/images/candidates/akhilesh_yadav.jpg",
  amitshah: "/images/candidates/amit_shah.jpg",
  arvindkejriwal: "/images/candidates/arvind_kejriwal.jpg",
  mallikarjunkharge: "/images/candidates/mallikarjun_kharge.jpg",
  mamatabanerjee: "/images/candidates/mamata_banerjee.jpg",
  mayawati: "/images/candidates/mayawati.jpg",
  narendramodi: "/images/candidates/narendra_modi.jpg",
  naveenpatnaik: "/images/candidates/naveen_patnaik.jpg",
  rahulgandhi: "/images/candidates/rahul_gandhi.jpg",
  yogiadityanath: "/images/candidates/yogi_adityanath.jpg",
};

// ============================================
// GET PHOTO BASED ON CANDIDATE NAME
// ============================================

function getCandidatePhoto(candidate) {
  const name =
    candidate?.name ||
    candidate?.candidateName ||
    "";

  const key = name
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

  return CANDIDATE_PHOTOS[key] || null;
}

// ============================================
// CANDIDATES COMPONENT
// ============================================

function Candidates() {
  const [candidates, setCandidates] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ============================================
  // FETCH CANDIDATES
  // ============================================

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

  // ============================================
  // SEARCH / FILTER
  // ============================================

  const filteredCandidates = candidates.filter((candidate) => {
    const name = candidate.name || "";

    const party =
      candidate.party?.name ||
      candidate.partyName ||
      candidate.party ||
      "";

    const constituency =
      candidate.constituency || "";

    const searchText =
      `${name} ${party} ${constituency}`.toLowerCase();

    return searchText.includes(search.toLowerCase());
  });

  // ============================================
  // UI
  // ============================================

  return (
    <div className="page">

      {/* ========================================
          HEADER
      ======================================== */}

      <div className="page-header">
        <span>👤</span>

        <h1>Political Candidates</h1>

        <p>
          Explore Indian political candidates, their parties,
          constituencies and backgrounds.
        </p>
      </div>

      {/* ========================================
          SEARCH
      ======================================== */}

      <div className="search-box">
        🔎

        <input
          type="text"
          placeholder="Search candidate, party or constituency..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* ========================================
          LOADING
      ======================================== */}

      {loading && (
        <div className="loading">
          Loading candidates...
        </div>
      )}

      {/* ========================================
          ERROR
      ======================================== */}

      {error && (
        <div className="error-message">
          ❌ {error}
        </div>
      )}

      {/* ========================================
          EMPTY SEARCH RESULT
      ======================================== */}

      {!loading &&
        !error &&
        filteredCandidates.length === 0 && (
          <div className="empty-state">

            <div className="big-icon">
              👤
            </div>

            <h2>
              No candidates found
            </h2>

            <p>
              Try searching for another candidate,
              party or constituency.
            </p>

          </div>
        )}

      {/* ========================================
          CANDIDATE CARDS
      ======================================== */}

      {!loading &&
        !error &&
        filteredCandidates.length > 0 && (

          <div className="card-grid">

            {filteredCandidates.map((candidate, index) => {

              // -------------------------------
              // PARTY
              // -------------------------------

              const partyName =
                candidate.party?.name ||
                candidate.partyName ||
                "Independent";

              const partyShort =
                candidate.party?.shortName || "";

              // -------------------------------
              // CANDIDATE PHOTO
              // -------------------------------

              const photo =
                getCandidatePhoto(candidate);

              return (

                <div
                  className="data-card"
                  key={candidate._id || index}
                >

                  {/* =================================
                    CANDIDATE PHOTO
                ================================= */}

                  <div className="candidate-avatar">

                    {photo ? (

                      <img
                        src={photo}
                        width={70}
                        height={70}
                        alt={candidate.name || "Candidate"}
                        onError={(e) => {
                          e.currentTarget.style.display =
                            "none";


                          const fallback =
                            e.currentTarget.parentElement.querySelector(
                              ".avatar-fallback"
                            );

                          if (fallback) {
                            fallback.style.display =
                              "flex";
                          }
                        }}
                      />

                    ) : null}

                    {/* Fallback icon */}

                    <div
                      className="avatar-fallback"
                      style={{
                        display: photo ? "none" : "flex"
                      }}
                    >
                      👤
                    </div>

                  </div>

                  {/* =================================
                    NAME
                ================================= */}

                  <h2>
                    {candidate.name}
                  </h2>

                  {/* =================================
                    PARTY
                ================================= */}

                  <p>
                    🏛️ {partyName}

                    {partyShort && (
                      <strong>
                        {" "}({partyShort})
                      </strong>
                    )}
                  </p>

                  {/* =================================
                    CONSTITUENCY
                ================================= */}

                  {candidate.constituency && (
                    <div className="info-row">

                      📍{" "}
                      <strong>
                        Constituency:
                      </strong>{" "}

                      {candidate.constituency}

                    </div>
                  )}

                  {/* =================================
                    STATE
                ================================= */}

                  {candidate.state && (
                    <div className="info-row">

                      🗺️{" "}
                      <strong>
                        State:
                      </strong>{" "}

                      {candidate.state}

                    </div>
                  )}

                  {/* =================================
                    POSITION
                ================================= */}

                  {candidate.position && (
                    <div className="info-row">

                      🎖️{" "}
                      <strong>
                        Position:
                      </strong>{" "}

                      {candidate.position}

                    </div>
                  )}

                  {/* =================================
                    AGE
                ================================= */}

                  {candidate.age && (
                    <div className="info-row">

                      🎂{" "}
                      <strong>
                        Age:
                      </strong>{" "}

                      {candidate.age}

                    </div>
                  )}

                  {/* =================================
                    EDUCATION
                ================================= */}

                  {candidate.education && (
                    <div className="info-row">

                      🎓{" "}
                      <strong>
                        Education:
                      </strong>{" "}

                      {candidate.education}

                    </div>
                  )}

                  {/* =================================
                    VIEW PROFILE
                ================================= */}

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