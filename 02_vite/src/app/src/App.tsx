import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import PopularBlock from "./pages/PopularBlock";
import Login from "./pages/Login";
import BlockPage from "./pages/BlockPage";
import UserDashboard from "./pages/UserDashboard";
import "./styles/App.css";

const Navigation = () => (
  <nav className="navigation">
    <div className="nav-container">
      <a href="/" className="nav-logo">BlockApp</a>
      <div className="nav-links">
        <a href="/" className="nav-link">Home</a>
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
      </div>
    </div>
  </nav>
);

interface AppProps {
  page?: string;
  props?: Record<string, any>;
}

const App: React.FC<AppProps> = ({ page = "PopularBlock", props = {} }) => {
  // SSR mode (no router)
  if (page !== "client") {
    switch (page) {
      case "Login": return <Login {...props} />;
      case "BlockPage": return <BlockPage {...props} />;
      default: return <PopularBlock {...props} />;
    }
  }

  // CSR mode (routes only, router comes from entry-client)
  return (  
    <div className="app">
      <Navigation />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<PopularBlock />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/block/:id" element={<BlockPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
