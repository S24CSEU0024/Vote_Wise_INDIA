import { useEffect, useState } from "react";
import axios from "axios";
import "./Pages.css";

function Schemes() {

    const [schemes, setSchemes] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {

        axios
            .get("http://localhost:8000/api/schemes")
            .then(res => {

                setSchemes(
                    Array.isArray(res.data)
                        ? res.data
                        : res.data.schemes || []
                );

            })
            .catch(err => console.error(err));

    }, []);

    const filtered = schemes.filter(scheme => {

        const name =
            scheme.name ||
            scheme.schemeName ||
            scheme.title ||
            "";

        return name
            .toLowerCase()
            .includes(search.toLowerCase());

    });

    return (

        <div className="page">

            <div className="page-header">

                <span>🏦</span>

                <h1>Government Schemes</h1>

                <p>
                    Discover government schemes,
                    benefits and eligibility information.
                </p>

            </div>

            <div className="search-box">

                🔎

                <input
                    placeholder="Search scheme..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />

            </div>

            <div className="card-grid">

                {filtered.map((scheme, index) => (

                    <div
                        className="data-card"
                        key={scheme._id || index}
                    >

                        <div className="big-icon">
                            🏦
                        </div>

                        <h2>
                            {scheme.name ||
                                scheme.schemeName ||
                                scheme.title}
                        </h2>

                        <p>
                            {scheme.description ||
                                "Government welfare scheme"}
                        </p>

                        {scheme.ministry && (

                            <div className="info-row">
                                🏛️ Ministry:
                                <strong>
                                    {scheme.ministry}
                                </strong>
                            </div>

                        )}

                        {scheme.launchYear && (

                            <div className="info-row">
                                📅 Launch:
                                <strong>
                                    {scheme.launchYear}
                                </strong>
                            </div>

                        )}

                        <button>
                            View Scheme →
                        </button>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default Schemes;