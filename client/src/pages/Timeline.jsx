import { useEffect, useState } from "react";
import axios from "axios";
import "./Pages.css";

function Timeline() {

    const [events, setEvents] = useState([]);
    const [year, setYear] = useState("");

    useEffect(() => {

        axios
            .get("http://localhost:8000/api/timeline")
            .then(res => {

                setEvents(
                    Array.isArray(res.data)
                        ? res.data
                        : res.data.timeline || []
                );

            })
            .catch(err => console.error(err));

    }, []);

    const filtered = events.filter(event => {

        if (!year) return true;

        return String(event.year) === year;

    });

    return (

        <div className="page">

            <div className="page-header">

                <span>📅</span>

                <h1>Political Timeline</h1>

                <p>
                    Explore important events in
                    India's political history.
                </p>

            </div>

            <div className="year-filter">

                <label>
                    Filter by year
                </label>

                <input
                    type="number"
                    placeholder="e.g. 2024"
                    value={year}
                    onChange={e => setYear(e.target.value)}
                />

                <button onClick={() => setYear("")}>
                    All Years
                </button>

            </div>

            <div className="timeline">

                {filtered.map((event, index) => (

                    <div
                        className="timeline-item"
                        key={event._id || index}
                    >

                        <div className="timeline-year">
                            {event.year}
                        </div>

                        <div className="timeline-dot">
                            ●
                        </div>

                        <div className="timeline-content">

                            <span className="category">
                                {event.category}
                            </span>

                            <h2>
                                {event.title}
                            </h2>

                            <p>
                                {event.description}
                            </p>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default Timeline;