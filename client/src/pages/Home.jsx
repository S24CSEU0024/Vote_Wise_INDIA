import { Link } from "react-router-dom";
import "./Home.css";

function Home() {

    return (

        <div className="home">

            {/* HERO */}

            <section className="hero">

                <div className="hero-content">

                    <div className="hero-badge">
                        🇮🇳 India's Political Information Platform
                    </div>

                    <h1>
                        Understand Politics.
                        <br />
                        <span>Make Informed Choices.</span>
                    </h1>

                    <p>
                        Explore political parties, elections,
                        candidates, government schemes,
                        manifestos and India's political history
                        — all in one place.
                    </p>


                    <div className="hero-buttons">

                        <Link
                            to="/parties"
                            className="primary-btn"
                        >
                            Explore Parties →
                        </Link>

                        <Link
                            to="/compare"
                            className="secondary-btn"
                        >
                            Compare Parties
                        </Link>

                    </div>

                </div>


                <div className="hero-visual">

                    <div className="india-card">

                        <div className="chakra">
                            ☸
                        </div>

                        <h2>
                            VoteWise
                        </h2>

                        <p>
                            Information • Transparency • Democracy
                        </p>

                    </div>

                </div>

            </section>


            {/* FEATURES */}

            <section className="features">

                <div className="feature-card">

                    <div className="feature-icon">
                        🏛️
                    </div>

                    <h3>
                        Political Parties
                    </h3>

                    <p>
                        Explore parties, leaders,
                        ideologies and achievements.
                    </p>

                    <Link to="/parties">
                        Explore →
                    </Link>

                </div>


                <div className="feature-card">

                    <div className="feature-icon">
                        🗳️
                    </div>

                    <h3>
                        Elections
                    </h3>

                    <p>
                        Explore election results,
                        years and political trends.
                    </p>

                    <Link to="/elections">
                        Explore →
                    </Link>

                </div>


                <div className="feature-card">

                    <div className="feature-icon">
                        🏦
                    </div>

                    <h3>
                        Government Schemes
                    </h3>

                    <p>
                        Discover government schemes
                        and their benefits.
                    </p>

                    <Link to="/schemes">
                        Explore →
                    </Link>

                </div>


                <div className="feature-card">

                    <div className="feature-icon">
                        📜
                    </div>

                    <h3>
                        Manifestos
                    </h3>

                    <p>
                        Compare political promises
                        and focus areas.
                    </p>

                    <Link to="/manifestos">
                        Explore →
                    </Link>

                </div>

            </section>


            {/* QUICK ACCESS */}

            <section className="quick-section">

                <div className="section-heading">

                    <h2>
                        Explore VoteWise India
                    </h2>

                    <p>
                        Everything you need to understand
                        Indian politics.
                    </p>

                </div>


                <div className="quick-grid">

                    <Link to="/candidates">
                        👤
                        <span>Candidates</span>
                    </Link>

                    <Link to="/timeline">
                        📅
                        <span>Political Timeline</span>
                    </Link>

                    <Link to="/compare">
                        ⚖️
                        <span>Compare Parties</span>
                    </Link>

                    <Link to="/news">
                        📰
                        <span>Political News</span>
                    </Link>

                </div>

            </section>


            {/* AI SECTION */}

            <section className="ai-section">

                <div>

                    <div className="ai-icon">
                        🤖
                    </div>

                    <h2>
                        Meet VoteWise AI
                    </h2>

                    <p>
                        Have a question about Indian politics?
                        Ask VoteWise AI and explore information
                        from our political database.
                    </p>

                </div>


                <Link
                    to="/ai"
                    className="ai-button"
                >
                    Ask VoteWise AI →
                </Link>

            </section>


            {/* FOOTER */}

            <footer>

                <h3>
                    🇮🇳 VoteWise India
                </h3>

                <p>
                    Your platform for understanding
                    Indian politics.
                </p>

                <p className="copyright">
                    © 2026 VoteWise India
                </p>

            </footer>

        </div>

    );

}

export default Home;