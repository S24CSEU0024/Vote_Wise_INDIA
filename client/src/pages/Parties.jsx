import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Pages.css";

function Parties() {

    const [parties, setParties] = useState([]);
    const [search, setSearch] = useState("");

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
                console.error("Party Error:", err);
            });

    }, []);

    const filteredParties = parties.filter(party => {

        const name =
            party.name ||
            party.partyName ||
            "";

        const shortName =
            party.shortName ||
            "";

        return (
            name.toLowerCase().includes(search.toLowerCase()) ||
            shortName.toLowerCase().includes(search.toLowerCase())
        );

    });

    return (

        <div className="page">

            <div className="page-header">

                <div className="page-icon">
                    🏛️
                </div>

                <h1>Political Parties</h1>

                <p>
                    Explore India's major political parties,
                    their history, leaders and ideology.
                </p>

            </div>


            {/* SEARCH */}

            <div className="search-box">

                🔎

                <input
                    type="text"
                    placeholder="Search political party..."
                    value={search}
                    onChange={e =>
                        setSearch(e.target.value)
                    }
                />

            </div>


            {/* PARTY GRID */}

            <div className="party-grid">

                {filteredParties.map((party, index) => (

                    <div
                        className="party-card"
                        key={party._id || index}
                    >

                        <div className="party-logo">

                            {party.logo ? (

                                <img
                                    src={party.logo}
                                    alt={party.name}
                                />

                            ) : (

                                <span>🏛️</span>

                            )}

                        </div>


                        <h2>
                            {party.name ||
                                party.partyName ||
                                "Political Party"}
                        </h2>


                        {party.shortName && (

                            <span className="party-short">
                                {party.shortName}
                            </span>

                        )}


                        {party.ideology && (

                            <p>
                                {party.ideology}
                            </p>

                        )}


                        {party.founded && (

                            <div className="party-info">
                                📅 Founded: {party.founded}
                            </div>

                        )}


                        <Link
                            to={`/party/${party._id}`}
                            className="details-button"
                        >
                            View Party →
                        </Link>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default Parties;