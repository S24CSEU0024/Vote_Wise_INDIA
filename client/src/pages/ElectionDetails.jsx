import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API = "http://localhost:8000";

export default function ElectionDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [election, setElection] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetch(`${API}/api/elections/${id}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Election not found");
                }

                return res.json();
            })
            .then(data => {
                setElection(data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });

    }, [id]);

    if (loading) {
        return (
            <div className="loading">
                Loading election...
            </div>
        );
    }

    if (!election) {
        return (
            <div className="details-page">
                <h2>Election not found</h2>

                <button onClick={() => navigate("/elections")}>
                    ← Back to Elections
                </button>
            </div>
        );
    }

    return (
        <div className="details-page">

            <button
                className="back-button"
                onClick={() => navigate("/elections")}
            >
                ← Back to Elections
            </button>

            <section className="details-hero">

                <span className="details-badge">
                    {election.year}
                </span>

                <h1>
                    {election.electionName ||
                        `${election.year} General Election`}
                </h1>

                <p>
                    {election.electionType || "Lok Sabha"}
                </p>

            </section>

            <div className="stats-grid">

                <div className="stat-card">
                    <span>Total Seats</span>
                    <strong>{election.totalSeats}</strong>
                </div>

                <div className="stat-card">
                    <span>Winning Party</span>
                    <strong>{election.winningParty}</strong>
                </div>

                <div className="stat-card">
                    <span>Seats Won</span>
                    <strong>{election.winningPartySeats}</strong>
                </div>

                <div className="stat-card">
                    <span>Prime Minister</span>
                    <strong>{election.primeMinister}</strong>
                </div>

            </div>

            <div className="details-grid">

                <main>

                    {election.majorIssues?.length > 0 && (
                        <section className="detail-card">

                            <h2>Major Issues</h2>

                            <div className="tag-container">

                                {election.majorIssues.map(
                                    (issue, index) => (
                                        <span
                                            className="tag"
                                            key={index}
                                        >
                                            {issue}
                                        </span>
                                    )
                                )}

                            </div>

                        </section>
                    )}

                    {election.highlights?.length > 0 && (
                        <section className="detail-card">

                            <h2>Election Highlights</h2>

                            <ul className="achievement-list">

                                {election.highlights.map(
                                    (highlight, index) => (
                                        <li key={index}>
                                            {highlight}
                                        </li>
                                    )
                                )}

                            </ul>

                        </section>
                    )}

                    {election.historicalSignificance && (
                        <section className="detail-card">

                            <h2>Historical Significance</h2>

                            <p>
                                {election.historicalSignificance}
                            </p>

                        </section>
                    )}

                </main>

                <aside>

                    <div className="info-card">

                        <h3>Election Information</h3>

                        <div className="info-row">
                            <span>Year</span>
                            <strong>{election.year}</strong>
                        </div>

                        <div className="info-row">
                            <span>Election</span>
                            <strong>{election.electionType}</strong>
                        </div>

                        <div className="info-row">
                            <span>Winning Party</span>
                            <strong>{election.winningParty}</strong>
                        </div>

                        <div className="info-row">
                            <span>Alliance</span>
                            <strong>{election.winningAlliance}</strong>
                        </div>

                        <div className="info-row">
                            <span>Prime Minister</span>
                            <strong>{election.primeMinister}</strong>
                        </div>

                    </div>

                </aside>

            </div>

        </div>
    );
}