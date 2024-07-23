import React, { useEffect, useState } from "react";
import { database } from "../firebase";
import { ref, onValue } from "firebase/database";
import { Card, Button, Image, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./View.css";
import Loader from "./Loader";

export default function Postedjobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = ref(database, "jobs");
    onValue(db, (snapshot) => {
      const data = snapshot.val();
      const jobList = data
        ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
        : [];
      setJobs(jobList);
      setLoading(false);
    });
  }, []);

  return (
    <div className="card-main text-center">
      <div className="header text-center my-3">
        <h1 className="view-header">AVAILABLE JOBS</h1>
      </div>
      {loading ? (
        <Loader />
      ) : (
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
                      <Card.Title className="h6">{job.Title}</Card.Title>
                      <Card.Text className="small text-muted">
                        {job.Company}
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
                        <p className="mb-0 small">{job.Salary} $ / month</p>
                      </Col>
                    </Row>
                    <Row className="px-1 py-1 align-items-center">
                      <Col xs="auto">
                        <i className="bi bi-calendar-check text-primary"></i>
                      </Col>
                      <Col>
                        <h6 className="mb-0">Deadline :</h6>
                        <p className="mb-0 small">{job.Deadline}</p>
                      </Col>
                    </Row>
                  </div>
                  <Row className="justify-content-between align-items-center">
                    <Col className="py-1">
                      <div className="ridham px-3 py-1 bg-success text-white ">
                        <p className="mb-0 small">{job.Category}</p>
                      </div>
                    </Col>
                    <Col className="text-end">
                      <Link to={`/details/${job.id}`}>
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
      )}
    </div>
  );
}
