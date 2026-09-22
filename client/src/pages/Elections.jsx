import { useEffect, useState } from "react";
import axios from "axios";
import "./Elections.css";

function Elections() {
    const [elections, setElections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/national-elections")
            .then((res) => {
                const data = Array.isArray(res.data)
                    ? res.data
                    : res.data.elections || [];

                setElections(data);
            })
            .catch((error) => {
                console.error("Election API Error:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const filteredElections = elections.filter((election) => {
        const searchText = search.toLowerCase();

        const matchesSearch =
            String(election.year || "")
                .toLowerCase()
                .includes(searchText) ||
            (election.electionName || "")
                .toLowerCase()
                .includes(searchText) ||
            (election.winningParty || "")
                .toLowerCase()
                .includes(searchText) ||
            (election.primeMinister || "")
                .toLowerCase()
                .includes(searchText);

        const matchesFilter =
            filter === "All" ||
            election.electionType === filter;

        return matchesSearch && matchesFilter;
    });

    const firstElection =
        elections.length > 0
            ? Math.min(...elections.map((e) => e.year))
            : 1951;

    const latestElection =
        elections.length > 0
            ? Math.max(...elections.map((e) => e.year))
            : 2024;

    return (
        <div className="elections-page">

            {/* HERO */}

            <section className="elections-hero">

                <div className="hero-badge">
                    🇮🇳 INDIA'S ELECTORAL HISTORY
                </div>

                <h1>
                    Indian Elections
                </h1>

                <p>
                    Explore India's general elections, political
                    parties, governments and electoral history
                    from 1951 to 2024.
                </p>

            </section>


            {/* STATISTICS */}

            <section className="election-stats">

                <div className="stat-card">
                    <div className="stat-icon blue">
                        🗳️
                    </div>

                    <div>
                        <span className="stat-number">
                            {elections.length}
                        </span>

                        <span className="stat-label">
                            General Elections
                        </span>
                    </div>
                </div>


                <div className="stat-card">
                    <div className="stat-icon orange">
                        📅
                    </div>

                    <div>
                        <span className="stat-number">
                            {firstElection}
                        </span>

                        <span className="stat-label">
                            First Election
                        </span>
                    </div>
                </div>


                <div className="stat-card">
                    <div className="stat-icon green">
                        🏛️
                    </div>

                    <div>
                        <span className="stat-number">
                            {latestElection}
                        </span>

                        <span className="stat-label">
                            Latest Election
                        </span>
                    </div>
                </div>


                <div className="stat-card">
                    <div className="stat-icon purple">
                        🇮🇳
                    </div>

                    <div>
                        <span className="stat-number">
                            543
                        </span>

                        <span className="stat-label">
                            Lok Sabha Seats
                        </span>
                    </div>
                </div>

            </section>


            {/* SEARCH + FILTER */}

            <section className="election-controls">

                <div className="search-wrapper">

                    <span className="search-icon">
                        🔍
                    </span>

                    <input
                        type="text"
                        placeholder="Search by year, party or Prime Minister..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                    {search && (
                        <button
                            className="clear-search"
                            onClick={() => setSearch("")}
                        >
                            ×
                        </button>
                    )}

                </div>


                <select
                    value={filter}
                    onChange={(e) =>
                        setFilter(e.target.value)
                    }
                >
                    <option value="All">
                        All Elections
                    </option>

                    <option value="Lok Sabha">
                        Lok Sabha
                    </option>
                </select>

            </section>


            {/* RESULTS */}

            <div className="results-header">

                <div>
                    <h2>
                        Election History
                    </h2>

                    <p>
                        {filteredElections.length} elections found
                    </p>
                </div>

            </div>


            {/* LOADING */}

            {loading && (
                <div className="loading-box">
                    <div className="spinner"></div>

                    <p>
                        Loading India's election history...
                    </p>
                </div>
            )}


            {/* NO DATA */}

            {!loading && filteredElections.length === 0 && (

                <div className="no-results">

                    <div>
                        🔎
                    </div>

                    <h3>
                        No elections found
                    </h3>

                    <p>
                        Try searching for another year,
                        party or Prime Minister.
                    </p>

                </div>

            )}


            {/* ELECTION CARDS */}

            {!loading && filteredElections.length > 0 && (

                <section className="election-grid">

                    {filteredElections.map((election) => (

                        <article
                            className="election-card"
                            key={election._id}
                        >

                            {/* CARD TOP */}

                            <div className="card-top">

                                <div className="year-badge">
                                    {election.year}
                                </div>

                                <span className="election-type">
                                    {election.electionType}
                                </span>

                            </div>


                            {/* TITLE */}

                            <h3>
                                {election.electionName}
                            </h3>


                            {/* WINNER */}

                            <div className="winner-section">

                                <div className="winner-icon">
                                    🏆
                                </div>

                                <div>

                                    <span>
                                        Winning Party
                                    </span>

                                    <strong>
                                        {election.winningParty}
                                    </strong>

                                </div>

                            </div>


                            {/* DETAILS */}

                            <div className="election-details">

                                <div className="detail">

                                    <span className="detail-icon">
                                        🪑
                                    </span>

                                    <div>
                                        <small>
                                            Seats Won
                                        </small>

                                        <strong>
                                            {election.winningPartySeats}
                                        </strong>
                                    </div>

                                </div>


                                <div className="detail">

                                    <span className="detail-icon">
                                        🤝
                                    </span>

                                    <div>
                                        <small>
                                            Alliance
                                        </small>

                                        <strong>
                                            {election.winningAlliance || "—"}
                                        </strong>
                                    </div>

                                </div>


                                <div className="detail">

                                    <span className="detail-icon">
                                        👤
                                    </span>

                                    <div>
                                        <small>
                                            Prime Minister
                                        </small>

                                        <strong>
                                            {election.primeMinister || "—"}
                                        </strong>
                                    </div>

                                </div>


                                <div className="detail">

                                    <span className="detail-icon">
                                        🏛️
                                    </span>

                                    <div>
                                        <small>
                                            Total Seats
                                        </small>

                                        <strong>
                                            {election.totalSeats}
                                        </strong>
                                    </div>

                                </div>

                            </div>


                            {/* ISSUES */}

                            {election.majorIssues &&
                                election.majorIssues.length > 0 && (

                                    <div className="issues-section">

                                        <span>
                                            Major Issues
                                        </span>

                                        <div className="issue-tags">

                                            {election.majorIssues
                                                .slice(0, 3)
                                                .map((issue, index) => (

                                                    <span key={index}>
                                                        {issue}
                                                    </span>

                                                ))}

                                        </div>

                                    </div>

                                )}


                            {/* HIGHLIGHT */}

                            {election.highlights &&
                                election.highlights.length > 0 && (

                                    <div className="highlight">

                                        <span>
                                            ✨
                                        </span>

                                        <p>
                                            {election.highlights[0]}
                                        </p>

                                    </div>

                                )}


                            {/* FOOTER */}

                            <div className="card-footer">

                                <span>
                                    Election Commission of India
                                </span>

                                <a
                                    href={
                                        election.officialWebsite ||
                                        "https://eci.gov.in"
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Official →
                                </a>

                            </div>

                        </article>

                    ))}

                </section>

            )}

        </div>
    );
}

export default Elections;