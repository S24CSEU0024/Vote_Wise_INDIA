import { useEffect, useState } from "react";
import axios from "axios";
import "./Pages.css";

function Compare() {

    const [parties, setParties] = useState([]);

    const [party1, setParty1] = useState("");
    const [party2, setParty2] = useState("");

    const selected1 =
        parties.find(p =>
            p._id === party1
        );

    const selected2 =
        parties.find(p =>
            p._id === party2
        );

    useEffect(() => {

        axios
            .get("http://localhost:8000/api/parties")
            .then(res => {

                setParties(
                    Array.isArray(res.data)
                        ? res.data
                        : res.data.parties || []
                );

            })
            .catch(err => console.error(err));

    }, []);

    return (

        <div className="page">

            <div className="page-header">

                <span>⚖️</span>

                <h1>Compare Political Parties</h1>

                <p>
                    Select two parties and compare
                    their political information.
                </p>

            </div>


            <div className="compare-selectors">

                <div>

                    <label>
                        Party 1
                    </label>

                    <select
                        value={party1}
                        onChange={e =>
                            setParty1(e.target.value)
                        }
                    >

                        <option value="">
                            Select Party
                        </option>

                        {parties.map(party => (

                            <option
                                key={party._id}
                                value={party._id}
                            >
                                {party.name ||
                                    party.partyName ||
                                    party.shortName}
                            </option>

                        ))}

                    </select>

                </div>


                <div className="vs">
                    VS
                </div>


                <div>

                    <label>
                        Party 2
                    </label>

                    <select
                        value={party2}
                        onChange={e =>
                            setParty2(e.target.value)
                        }
                    >

                        <option value="">
                            Select Party
                        </option>

                        {parties.map(party => (

                            <option
                                key={party._id}
                                value={party._id}
                            >
                                {party.name ||
                                    party.partyName ||
                                    party.shortName}
                            </option>

                        ))}

                    </select>

                </div>

            </div>


            {selected1 && selected2 && (

                <div className="comparison">

                    <ComparisonRow
                        title="Party"
                        value1={
                            selected1.name ||
                            selected1.shortName
                        }
                        value2={
                            selected2.name ||
                            selected2.shortName
                        }
                    />

                    <ComparisonRow
                        title="Leader"
                        value1={
                            selected1.currentLeader ||
                            "—"
                        }
                        value2={
                            selected2.currentLeader ||
                            "—"
                        }
                    />

                    <ComparisonRow
                        title="Ideology"
                        value1={
                            selected1.ideology ||
                            "—"
                        }
                        value2={
                            selected2.ideology ||
                            "—"
                        }
                    />

                    <ComparisonRow
                        title="Founded"
                        value1={
                            selected1.founded ||
                            "—"
                        }
                        value2={
                            selected2.founded ||
                            "—"
                        }
                    />

                    <ComparisonRow
                        title="Headquarters"
                        value1={
                            selected1.headquarters ||
                            "—"
                        }
                        value2={
                            selected2.headquarters ||
                            "—"
                        }
                    />

                </div>

            )}

        </div>
    );
}


function ComparisonRow({
    title,
    value1,
    value2
}) {

    return (

        <div className="comparison-row">

            <div>
                <strong>
                    {value1}
                </strong>
            </div>

            <div className="comparison-label">
                {title}
            </div>

            <div>
                <strong>
                    {value2}
                </strong>
            </div>

        </div>

    );
}

export default Compare;