import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Pages.css";

function Manifestos() {

    const [manifestos, setManifestos] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {

        axios
            .get("http://localhost:8000/api/manifestos")
            .then(res => {

                setManifestos(
                    Array.isArray(res.data)
                        ? res.data
                        : res.data.manifestos || []
                );

            })
            .catch(err =>
                console.error("Manifesto error:", err)
            );

    }, []);


    const filtered = manifestos.filter(manifesto => {

        const text = (

            manifesto.partyName ||
            manifesto.party ||
            manifesto.title ||
            ""

        ).toLowerCase();

        return text.includes(
            search.toLowerCase()
        );

    });


    return (

        <div className="page">

            <div className="page-header">

                <div className="page-icon">
                    📜
                </div>

                <h1>Election Manifestos</h1>

                <p>
                    Explore the policies, promises and
                    priorities of political parties.
                </p>

            </div>


            <div className="search-box">

                🔎

                <input
                    placeholder="Search party manifesto..."
                    value={search}
                    onChange={e =>
                        setSearch(e.target.value)
                    }
                />

            </div>


            <div className="manifesto-grid">

                {filtered.map((manifesto, index) => (

                    <div
                        className="manifesto-card"
                        key={
                            manifesto._id ||
                            index
                        }
                    >

                        <div className="manifesto-icon">
                            📜
                        </div>


                        <div>

                            <span className="manifesto-year">

                                {manifesto.year ||
                                    manifesto.electionYear ||
                                    "Election"}

                            </span>


                            <h2>

                                {manifesto.partyName ||
                                    manifesto.party ||
                                    manifesto.title ||
                                    "Political Party"}

                            </h2>


                            {manifesto.description && (

                                <p>
                                    {manifesto.description}
                                </p>

                            )}

                        </div>


                        <Link
                            to={`/manifesto/${manifesto._id}`}
                            className="details-button"
                        >
                            View Manifesto →
                        </Link>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default Manifestos;