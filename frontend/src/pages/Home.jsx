import React, { useState, useRef } from 'react';
import ObtainRubricNames from '../components/ObtainRubricNames';
import FileLoader from '../components/FileLoader';
import axios from 'axios';
import Markdown from 'react-markdown';
import configData from '../config.json';

var BASE_URL;
if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://localhost:8000/';
} else {
  BASE_URL = configData['SERVER_URL'];
}

const Home = ({
  selected_rubric_id,
  setRubricID,
  student_assignment,
  setStudentAssignment,
  graded_feedback,
  setGrading,
  rubrics,
  setRubricMarkdown,
  rubricMarkdown,
  rubricMarkdownFileName,
  setRubricMarkdownFileName,
  resetLabel,
}) => {
  // to collect the student assignment
  const [grading_loading, setGradingLoading] = useState(false);
  const student_assignment_submission = useRef();

  const handleSubmit = e => {
    e.preventDefault();
    const assignment = student_assignment_submission.current.value;
    setStudentAssignment(assignment);
    generate(assignment, selected_rubric_id);
  };

  const generate = (student_assignment, rubric_id) => {
    setGradingLoading(true);
    axios
      .get(BASE_URL.concat('api/grade-with-gemini/'), {
        params: {
          student_assignment,
          rubric_id,
          rubricMarkdown,
        },
      })
      .then(response => {
        setGrading(response.data.message);
      })
      .then(() => setGradingLoading(false))
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <div className="main_container">
        <div className="assignment_section">
          <form onSubmit={handleSubmit}>
            <h2 className="step1">Step 1: Grading Rubric</h2>
            <div className="curated-rubric">
              <div className="flex-row">
                <p>Select a curated grading rubric:</p>
                {!rubrics ? (
                  <div className="spinner" />
                ) : (
                  <ObtainRubricNames
                    selected_rubric_id={selected_rubric_id}
                    setRubricID={setRubricID}
                    rubrics={rubrics}
                    resetLabel={resetLabel}
                  />
                )}
              </div>

              <FileLoader
                setRubricMarkdown={setRubricMarkdown}
                rubricMarkdownFileName={rubricMarkdownFileName}
                setRubricMarkdownFileName={setRubricMarkdownFileName}
                resetLabel={resetLabel}
              />
            </div>
            <h2 className="step2">Step 2: Student Assignment</h2>
            <p>Insert the student assignment</p>
            <textarea ref={student_assignment_submission} cols={66} rows={10} />
            <br />
            <div className="button-container">
              <p>Click Grade to submit the grading rubric and assignment</p>
              <button type="submit" className="grade-button">
                Grade
              </button>
            </div>
          </form>
        </div>
        <div className="grading_section">
          <h2>Result: Graded Feedback</h2>
          <p>The grade and feedback will appear here</p>
          <div className="graded_feedback">
            {grading_loading ? (
              <div className="spinner"></div>
            ) : (
              <Markdown>{graded_feedback}</Markdown>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
