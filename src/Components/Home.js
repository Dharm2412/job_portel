import React, { useState, useEffect } from "react";
import Socialmedia from "./Socialmedia";
import Loader from "./Loader";

export default function Home() {
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 10000);
  };

  return (
    <div
      className="px-4 py-5 px-md-5 text-center text-lg-start"
      style={{ backgroundColor: "hsl(0, 0%, 96%)" }}
    >
      <div className="container-home">
        <div className="row-home gx-lg-5 align-items-center">
          <div className="col-lg-6 mb-5 mb-lg-0">
            {loading && <Loader />}
            <h1 className="my-3 display-3 fw-bold ls-tight">
              Discover the Path
              <br />
              to Your
              <br />
              <span className="text" style={{ color: "#725AC1" }}>
                Perfect Career Opportunity
              </span>
            </h1>
            <p style={{ color: "hsl(217, 10%, 50.8%)" }}>
              2400 Peoples are daily search in this portal, 100 user added job
              portal!
            </p>
            <div className="input-group mt-3">
              <div className="search">
                <input placeholder="Search for jobs" type="text" />
                <button type="submit" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-6 img">
            <img
              src={require("./4153553.jpg")}
              alt="Career Search"
              style={{ objectFit: "cover", width: "100%", height: "auto" }}
            />
          </div>
          <div className="social">
            <Socialmedia />
          </div>
        </div>
      </div>
    </div>
  );
}
