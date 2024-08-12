import React, { useEffect, useState } from "react";
import { Card, Button, Image, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./View.css";
import Loader from "./Loader";

export default function Postedjobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(
          "https://active-jobs-db.p.rapidapi.com/active-ats?title=%22Data%20Engineer%22&location=%22United%20States%22",
          {
            method: "GET",
            headers: {
              "x-rapidapi-host": "active-jobs-db.p.rapidapi.com",
              "x-rapidapi-key":
                "9074604315msh06db58e0bb2ff26p182b6cjsna6fa352250af",
            },
          }
        );
        const data = await response.json();
        console.log("API Response:", data);

        // Assuming the jobs data is an array
        if (Array.isArray(data)) {
          setJobs(data);
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

  return (
    <div className="card-main text-center">
      <div className="header text-center my-3">
        <h1 className="view-header">POSTED JOBS</h1>
      </div>
      {loading ? (
        <Loader />
      ) : jobs.length > 0 ? (
        <Row>
          {jobs.map((job) => (
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
                      <Card.Title className="h6">{job.title}</Card.Title>
                      <Card.Text className="small text-muted">
                        {job.company}
                      </Card.Text>
                    </Col>
                  </Row>
                  <div className="mb-2">
                    <Row className="px-1 py-1 align-items-center">
                      <Col xs="auto">
                        <i className="bi bi-currency-dollar text-primary"></i>
                      </Col>
                      <Col>
                        <h6 className="mb-0">Salary :</h6>
                        <p className="mb-0 small">{job.salary_raw} $ / month</p>
                      </Col>
                    </Row>
                    <Row className="px-1 py-1 align-items-center">
                      <Col xs="auto">
                        <i className="bi bi-calendar-check text-primary"></i>
                      </Col>
                      <Col>
                        <h6 className="mb-0">Deadline :</h6>
                        <p className="mb-0 small">{job.deadline}</p>
                      </Col>
                    </Row>
                  </div>
                  <Row className="justify-content-between align-items-center">
                    <Col className="py-1">
                      <div className="px-3 py-1 bg-success text-white ">
                        <p className="mb-0 small">{job.employmenttype}</p>
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
        <p>
          The API requests have been completed, and job opportunities will be
          available soon.
        </p>
      )}
    </div>
  );
}
