import React from "react";
import "./Ai.css";

export default function Ai() {
  return (
    <div>
      <div className="outer-padding inner-padding inner-padding-md text-align-center text-align-lg-start background-light">
        <div className="content-container">
          <div className="flex-row gx-lg-5 align-items-center">
            <div className="column-lg-6 mb-5 mb-lg-0">
              <h1 className="heading text-center">
                To create an effective resume
                <br />
                identify the skills
                <br />
                <span className="highlight-text">
                  relevant to your job category and include them.
                </span>
              </h1>
              <p className="paragraph text-center">
                Please specify your job category so I can provide the necessary
                skills to include on your resume.
              </p>
            </div>
            <div className="iframe-container">
              <iframe
                src="https://www.chatbase.co/chatbot-iframe/hm7NIxYYP5XknqWwJ3jwU"
                width="100%"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
