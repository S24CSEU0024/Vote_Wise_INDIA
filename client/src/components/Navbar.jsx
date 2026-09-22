import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {

    const location = useLocation();

    const links = [
        { name: "Home", path: "/" },
        { name: "Parties", path: "/parties" },
        { name: "Elections", path: "/elections" },
        { name: "Candidates", path: "/candidates" },
        { name: "Schemes", path: "/schemes" },
        { name: "Manifestos", path: "/manifestos" },
        { name: "Timeline", path: "/timeline" },
        { name: "Compare", path: "/compare" }
    ];

    return (
        <nav className="navbar">

            <Link to="/" className="logo">
                🇮🇳
                <span>VoteWise</span>
                <small>India</small>
            </Link>

            <div className="nav-links">

                {links.map((link) => (

                    <Link
                        key={link.path}
                        to={link.path}
                        className={
                            location.pathname === link.path
                                ? "nav-link active"
                                : "nav-link"
                        }
                    >
                        {link.name}
                    </Link>

                ))}

                <Link
                    to="/ai"
                    className="ai-nav"
                >
                    🤖 AI
                </Link>

            </div>

        </nav>
    );
}

export default Navbar;