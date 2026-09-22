import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Elections from "./pages/Elections";
import Candidates from "./pages/Candidates";
import Parties from "./pages/Parties";
import Manifestos from "./pages/Manifestos";
import Timeline from "./pages/Timeline";
import Compare from "./pages/Compare";
import News from "./pages/News";
import AIChat from "./pages/AIChat";

import PartyDetails from "./pages/PartyDetails";
import ManifestoDetails from "./pages/ManifestoDetails";
import CandidateDetails from "./pages/CandidateDetails";
import ElectionDetails from "./pages/ElectionDetails";

import "./App.css";

function App() {

  return (

    <BrowserRouter>

      <div className="app">

        {/* NAVBAR */}

        <nav className="navbar">

          <Link to="/" className="logo">
            🇮🇳 VoteWise India
          </Link>

          <div className="nav-links">

            <Link to="/">Home</Link>

            <Link to="/elections">
              Elections
            </Link>

            <Link to="/candidates">
              Candidates
            </Link>

            <Link to="/parties">
              Parties
            </Link>

            <Link to="/manifestos">
              Manifestos
            </Link>

            <Link to="/timeline">
              Timeline
            </Link>

            <Link to="/compare">
              Compare
            </Link>

            <Link to="/news">
              News
            </Link>

            <Link to="/ai">
              🤖 AI
            </Link>

          </div>

        </nav>

        <main>

          <Routes>

            {/* MAIN PAGES */}

            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/elections"
              element={<Elections />}
            />

            <Route
              path="/candidates"
              element={<Candidates />}
            />

            <Route
              path="/parties"
              element={<Parties />}
            />

            <Route
              path="/manifestos"
              element={<Manifestos />}
            />

            <Route
              path="/timeline"
              element={<Timeline />}
            />

            <Route
              path="/compare"
              element={<Compare />}
            />

            <Route
              path="/news"
              element={<News />}
            />

            <Route
              path="/ai"
              element={<AIChat />}
            />


            {/* DETAIL PAGES */}

            <Route
              path="/party/:id"
              element={<PartyDetails />}
            />

            <Route
              path="/manifesto/:id"
              element={<ManifestoDetails />}
            />

            <Route
              path="/candidate/:id"
              element={<CandidateDetails />}
            />

            <Route
              path="/election/:id"
              element={<ElectionDetails />}
            />

          </Routes>

        </main>

      </div>

    </BrowserRouter>

  );
}

export default App;