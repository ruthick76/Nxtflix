import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

const NotFound = () => {
  return (
    <div className="not-found-page">

      {/* NXTFLIX brand at top */}
      <div className="not-found-brand">NXTFLIX</div>

      <div className="not-found-content">

        {/* 404 Error */}
        <h1 className="not-found-code">404</h1>

        {/* Error title */}
        <h2 className="not-found-title">Page Not Found</h2>

        {/* Description message */}
        <p className="not-found-description">
          The page you are looking for does not exist or has been moved.
        </p>

        {/* Button to go back home */}
        <Link to="/" className="home-link" id="not-found-home-link">
          Back to Home
        </Link>

      </div>
    </div>
  );
};

export default NotFound;
