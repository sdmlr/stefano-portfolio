import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { About, Footer, Header, Skills, Work } from "./container";
import { Navbar } from "./components";
import ProjectDetail from './container/Work/Projects/ProjectDetails';
import "./App.scss";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          {/* Main Landing Page */}
          <Route
            path="/"
            element={
              <>
                <Header />
                <About />
                <Work />
                <Skills />
                <Footer />
              </>
            }
          />
          {/* Dynamic Detail Page */}
          <Route path="/project/:slug" element={<ProjectDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
