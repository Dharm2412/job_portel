import React, { useEffect, useState } from "react";
import { Card, Button, Image, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import "./View.css";
import "./View4.css";

export default function PostedJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // Added state for search term

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(
          "https://jobicy.p.rapidapi.com/api/v2/remote-jobs",
          {
            method: "GET",
            headers: {
              "x-rapidapi-host": "jobicy.p.rapidapi.com",
              "x-rapidapi-key":
                "9074604315msh06db58e0bb2ff26p182b6cjsna6fa352250af",
            },
          }
        );
        const data = await response.json();
        console.log("API Response:", data.jobs);

        if (Array.isArray(data.jobs)) {
          setJobs(data.jobs);
        } else {
          console.error("Unexpected data format:", data);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Filter jobs based on search term
  const filteredJobs = jobs.filter(
    (job) =>
      job.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.companyName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="card-main text-center">
      <div className="header text-center my-3">
        <h1 className="view-header">POSTED JOBS</h1>
      </div>
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Find Job Here</h1>
        <input
          type="search"
          placeholder="Search jobs..."
          value={searchTerm} // Bind the search input to searchTerm state
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term as user types
          className="max-w-md p-2 border rounded"
        />
      </header>
      {loading ? (
        <Loader />
      ) : filteredJobs.length > 0 ? (
        <Row>
          {filteredJobs.map((job) => (
            <Col md={4} key={job.id} className="mb-4">
              <Card className="px-4 py-3 mx-auto">
                <Card.Body>
                  <Row className="mb-2 align-items-center">
                    <Col xs="auto">
                      <Image
                        src="https://xsgames.co/randomusers/avatar.php?g=male"
                        roundedCircle
                        width="50"
                        height="50"
                        alt="no image"
                      />
                    </Col>
                    <Col>
                      <Card.Title className="h6">
                        {job.jobTitle || job.title}
                      </Card.Title>
                      <Card.Text className="small text-muted">
                        {job.companyName || job.company}
                      </Card.Text>
                    </Col>
                  </Row>
                  <div className="mb-2">
                    <Row className="px-1 py-1 align-items-center">
                      <Col xs="auto">
                        <i className="bi bi-currency-dollar text-primary"></i>
                      </Col>
                      <Col>
                        <h6 className="mb-0">Job Level:</h6>
                        <p className="mb-0 small">
                          {job.jobLevel || job.salary_raw}
                        </p>
                      </Col>
                    </Row>
                    <Row className="px-1 py-1 align-items-center">
                      <Col xs="auto">
                        <i className="bi bi-calendar-check text-primary"></i>
                      </Col>
                      <Col>
                        <h6 className="mb-0">Publish Date:</h6>
                        <p className="mb-0 small">{job.pubDate || "N/A"}</p>
                      </Col>
                    </Row>
                  </div>
                  <Row className="justify-content-between align-items-center">
                    <Col className="py-1">
                      <div className="px-3 py-1 bg-success text-white">
                        <p className="mb-0 small">
                          {job.jobType || job.employmenttype}
                        </p>
                      </div>
                    </Col>
                    <Col className="text-end">
                      <Link to={job.url}>
                        <Button
                          variant="outline-primary"
                          className="py-1 px-2 border transition-all duration-700"
                          style={{
                            height: "50px",
                            width: "200px",
                            fontSize: "15px",
                          }}
                        >
                          View Detail &rarr;
                        </Button>
                      </Link>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p>No jobs found matching your search criteria.</p>
      )}
    </div>
  );
}
