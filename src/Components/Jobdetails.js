// src/components/JobDetails.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ref, onValue } from "firebase/database";
import { Card, Image, Button, Container, Row, Col } from "react-bootstrap";
import Loader from "./Loader";
import { database } from "../firebase";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const jobRef = ref(database, `jobs/${id}`);
    const unsubscribe = onValue(
      jobRef,
      (snapshot) => {
        const data = snapshot.val();
        setJob(data);
        setLoading(false);
      },
      (error) => {
        setError(error);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>Error loading job details: {error.message}</p>;
  }

  return (
    <Container className="my-5">
      <Card className="p-4">
        <Card.Body>
          <Row className="mb-4 align-items-center">
            <Col xs="auto">
              <Image
                src={
                  job.imageURL ||
                  "https://xsgames.co/randomusers/avatar.php?g=male"
                }
                roundedCircle
                width="100"
                height="100"
                alt="Company Logo"
              />
            </Col>
            <Col>
              <Card.Title className="h3">{job.Title}</Card.Title>
              <Card.Text className="text-muted">{job.Company}</Card.Text>
            </Col>
          </Row>
          <div className="mb-4">
            <Row className="mb-2">
              <Col>
                <h5>Salary:</h5>
                <p>{job.Salary} $ / month</p>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col>
                <h5>Deadline:</h5>
                <p>{job.Deadline}</p>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col>
                <h5>Category:</h5>
                <p>{job.Category}</p>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col>
                <h5>Description:</h5>
                <p>{job.Description}</p>
              </Col>
            </Row>
          </div>
          <Button variant="primary" onClick={() => navigate(-1)}>
            Back
          </Button>
          <Button variant="success" onClick={() => navigate(`/apply/${id}`)}>
            Apply now
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default JobDetails;
