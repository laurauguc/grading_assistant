import React, { useState, useRef } from 'react';
import ObtainRubricNames from '../components/ObtainRubricNames';
import FileLoader from '../components/FileLoader';
import axios from 'axios';
import Markdown from 'react-markdown';
import configData from '../config.json';
import { ConfigProvider, Spin } from 'antd';

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
  additionalInput,
  setAdditionalInput,
  setDetailedSuggestions,
}) => {
  const [grading_loading, setGradingLoading] = useState(false);
  const student_assignment_submission = useRef();
  const additional_input = useRef();

  const handleSubmit = e => {
    e.preventDefault();
    const assignment = student_assignment_submission.current.value;
    setAdditionalInput(additional_input.current.value);
    setStudentAssignment(assignment);
    generate(assignment, selected_rubric_id, additionalInput);
  };
  const handleStudentAssignmentChange = e => {
    setStudentAssignment(e.target.value);
  };
  const handleAdditionalInputChange = e => {
    setAdditionalInput(e.target.value);
  };
  const generate = (student_assignment, rubric_id, additionalInput) => {
    setGradingLoading(true);
    axios
      .get(BASE_URL.concat('api/grade-with-gemini/'), {
        params: {
          student_assignment,
          rubric_id,
          rubricMarkdown,
          additionalInput,
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
    <div role="tabpanel" id="Home">
      <div className="main_container">
        <div className="assignment_section">
          <form onSubmit={handleSubmit}>
            <h2 className="step1">Step 1: Grading Rubric</h2>
            <div className="curated-rubric">
              <div className="flex-row">
                <label htmlFor="rubric-selection">
                  Select a curated grading rubric:
                </label>
                {!rubrics ? (
                  <div className="spinner" />
                ) : (
                  <ObtainRubricNames
                    selected_rubric_id={selected_rubric_id}
                    setRubricID={setRubricID}
                    rubrics={rubrics}
                    resetLabel={resetLabel}
                    id="rubric-selection"
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
            <label htmlFor="student-assignment">
              Insert the student assignment
            </label>
            <textarea
              id="student-assignment"
              ref={student_assignment_submission}
              cols={66}
              rows={10}
              value={student_assignment}
              onChange={handleStudentAssignmentChange}
              aria-labelledby="student-assignment"
            />
            <h2 className="step2">
              Step 3 (optional): Additional instructions
            </h2>
            <label htmlFor="additional-instructions">
              Personalize the grading with additional input
            </label>
            <textarea
              id="additional-instructions"
              ref={additional_input}
              cols={66}
              rows={3}
              placeholder="Examples: add encouraging remarks; concise but specific."
              value={additionalInput}
              onChange={handleAdditionalInputChange}
              aria-labelledby="additional-instructions"
            />

            <div className="button-container">
              <p>Click Grade to submit the grading rubric and assignment</p>
              <button type="submit" className={'grade-button ' + 'border'}>
                Grade
              </button>
            </div>
          </form>
        </div>
        <div className="grading_section">
          <h2>Grade and Feedback</h2>
          <p>The grade and feedback will appear here</p>
          <div className={'graded_feedback ' + 'border'}>
            {grading_loading ? (
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: '#F44336',
                  },
                }}
              >
                <Spin tip="Analyzing" size="large">
                  <div
                    style={{
                      padding: 50,
                      borderRadius: 4,
                    }}
                  />
                </Spin>
              </ConfigProvider>
            ) : (
              <Markdown>{graded_feedback}</Markdown>
            )}
          </div>
          <div className="button-container">
            <button
              type="button"
              className={'grade-button ' + 'border'}
              onClick={() => {
                setStudentAssignment('');
                setGrading('');
                setAdditionalInput('');
                setDetailedSuggestions('');
              }}
            >
              Clear to Restart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
