import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API = "http://localhost:8000";

export default function ManifestoDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [manifesto, setManifesto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch(`${API}/api/manifestos/${id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Manifesto not found");
                }
                return res.json();
            })
            .then((data) => {
                setManifesto(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="details-page">
                <div className="loading">Loading manifesto...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="details-page">
                <div className="error-box">
                    <h2>Manifesto Not Found</h2>
                    <p>{error}</p>
                    <button onClick={() => navigate("/manifestos")}>
                        ← Back to Manifestos
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="details-page">

            <button
                className="back-button"
                onClick={() => navigate("/manifestos")}
            >
                ← Back to Manifestos
            </button>

            <section className="details-hero">

                <div>
                    <span className="details-badge">
                        {manifesto.electionYear} • {manifesto.electionType}
                    </span>

                    <h1>
                        {manifesto.partyName} Manifesto
                    </h1>

                    <p className="details-slogan">
                        {manifesto.slogan}
                    </p>
                </div>

            </section>

            <div className="details-grid">

                <div className="main-content">

                    {manifesto.vision && (
                        <section className="detail-card">
                            <h2>Vision</h2>
                            <p>{manifesto.vision}</p>
                        </section>
                    )}

                    {manifesto.theme && (
                        <section className="detail-card">
                            <h2>Theme</h2>
                            <p>{manifesto.theme}</p>
                        </section>
                    )}

                    {manifesto.promises?.length > 0 && (
                        <section className="detail-card">
                            <h2>Key Promises</h2>

                            <div className="promise-list">

                                {manifesto.promises.map((promise, index) => (
                                    <div
                                        className="promise-card"
                                        key={index}
                                    >
                                        <div>
                                            <h3>{promise.title}</h3>
                                            <p>{promise.description}</p>
                                        </div>

                                        <span
                                            className={`status ${promise.status
                                                ?.toLowerCase()
                                                .replaceAll(" ", "-")}`}
                                        >
                                            {promise.status}
                                        </span>
                                    </div>
                                ))}

                            </div>
                        </section>
                    )}

                    {manifesto.focusAreas?.length > 0 && (
                        <section className="detail-card">
                            <h2>Focus Areas</h2>

                            <div className="tag-container">
                                {manifesto.focusAreas.map((area, index) => (
                                    <span className="tag" key={index}>
                                        {area}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                </div>

                <aside className="side-content">

                    <div className="info-card">

                        <h3>Manifesto Information</h3>

                        <div className="info-row">
                            <span>Party</span>
                            <strong>{manifesto.partyName}</strong>
                        </div>

                        <div className="info-row">
                            <span>Election Year</span>
                            <strong>{manifesto.electionYear}</strong>
                        </div>

                        <div className="info-row">
                            <span>Election Type</span>
                            <strong>{manifesto.electionType}</strong>
                        </div>

                        {manifesto.releasedBy && (
                            <div className="info-row">
                                <span>Released By</span>
                                <strong>{manifesto.releasedBy}</strong>
                            </div>
                        )}

                        {manifesto.releaseDate && (
                            <div className="info-row">
                                <span>Release Date</span>
                                <strong>{manifesto.releaseDate}</strong>
                            </div>
                        )}

                    </div>

                    {manifesto.downloadablePdf && (
                        <a
                            className="download-button"
                            href={manifesto.downloadablePdf}
                            target="_blank"
                            rel="noreferrer"
                        >
                            📄 View Manifesto PDF
                        </a>
                    )}

                    {manifesto.officialWebsite && (
                        <a
                            className="official-button"
                            href={manifesto.officialWebsite}
                            target="_blank"
                            rel="noreferrer"
                        >
                            🌐 Official Website
                        </a>
                    )}

                </aside>

            </div>

        </div>
    );
}