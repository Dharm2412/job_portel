import React, { useState } from "react";
import { database } from "../firebase";
import { ref, push } from "firebase/database";
import "./Post_job.css";

export default function Post_jobs() {
  const [data, setData] = useState({
    Title: "",
    Salary: "",
    Email: "",
    Company: "",
    Description: "",
    Category: "",
    Type: "",
    Experience: "",
    Vacancy: "",
    Deadline: "",
  });

  const postData = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const submitData = async (e) => {
    e.preventDefault();
    try {
      const db = ref(database, "jobs");
      await push(db, data);
      alert("Job posted successfully!");
      setData({
        Title: "",
        Salary: "",
        Email: "",
        Company: "",
        Description: "",
        Category: "",
        Type: "",
        Experience: "",
        Vacancy: "",
        Deadline: "",
      });
    } catch (error) {
      alert("Error storing data: " + error.message);
    }
  };

  return (
    <div>
      <h1 className="text-center my-4">
        <u>ENTER JOB DETAILS</u>
      </h1>
      <div className="details">
        <form className="container my-4 p-4 border" onSubmit={submitData}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="Title"
              className="form-control"
              placeholder="Enter title of job"
              value={data.Title}
              onChange={postData}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="salary" className="form-label">
              Salary:
            </label>
            <input
              type="number"
              id="salary"
              name="Salary"
              className="form-control"
              placeholder="Enter Salary for this job"
              value={data.Salary}
              onChange={postData}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="Email"
              className="form-control"
              placeholder="Enter Email to be Contacted for this job"
              value={data.Email}
              onChange={postData}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="company" className="form-label">
              Company:
            </label>
            <input
              type="text"
              id="company"
              name="Company"
              className="form-control"
              placeholder="Enter Company of job"
              value={data.Company}
              onChange={postData}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description:
            </label>
            <textarea
              id="description"
              name="Description"
              className="form-control"
              placeholder="Enter description of job"
              value={data.Description}
              onChange={postData}
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="jobCategory" className="form-label">
              Job Category:
            </label>
            <input
              type="text"
              id="jobCategory"
              name="Category"
              className="form-control"
              placeholder="Enter Category of job"
              value={data.Category}
              onChange={postData}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="jobType" className="form-label">
              Job Type:
            </label>
            <select
              id="jobType"
              name="Type"
              className="form-select"
              value={data.Type}
              onChange={postData}
            >
              <option value="" disabled>
                Please Select Job type
              </option>
              <option value="full-time">Full-Time</option>
              <option value="part-time">Part-Time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="jobExperience" className="form-label">
              Job Experience:
            </label>
            <input
              type="text"
              id="jobExperience"
              name="Experience"
              className="form-control"
              placeholder="Enter Experience Required for this job"
              value={data.Experience}
              onChange={postData}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="jobVacancy" className="form-label">
              Job Vacancy:
            </label>
            <input
              type="number"
              id="jobVacancy"
              name="Vacancy"
              className="form-control"
              placeholder="Enter Number of Vacancies"
              value={data.Vacancy}
              onChange={postData}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="jobDeadline" className="form-label">
              Job Deadline:
            </label>
            <input
              type="date"
              id="jobDeadline"
              name="Deadline"
              className="form-control"
              value={data.Deadline}
              onChange={postData}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
