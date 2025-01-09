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
  setDetailedSuggestions,
}) => {
  const [grading_loading, setGradingLoading] = useState(false);
  const student_assignment_submission = useRef();

  const handleSubmit = e => {
    e.preventDefault();
    const assignment = student_assignment_submission.current.value;
    setStudentAssignment(assignment);
    generate(assignment, selected_rubric_id, rubricMarkdown);
  };
  const handleStudentAssignmentChange = e => {
    setStudentAssignment(e.target.value);
  };

  const generate = (student_assignment, rubric_id, rubricMarkdown) => {
    setGradingLoading(true);

    const params = {
      student_assignment,
    };
    if (rubricMarkdown) {
      params.rubric_content = rubricMarkdown;
    } else {
      params.rubric_id = rubric_id;
    }
    console.log('pararms', params);
    axios
      .get(BASE_URL.concat('api/grade-with-gemini/'), {
        params,
      })
      .then(response => {
        setGrading(response.data.message);
      })
      .then(() => setGradingLoading(false))
      .catch(error => {
        console.log(error);
        setGrading('Something went wrong. Please try again.');
      })
      .finally(() => {
        setGradingLoading(false);
      });
  };

  return (
    <div role="tabpanel" id="Home">
      <div className="main_container">
        <div className="assignment_section">
          <form onSubmit={handleSubmit}>
            <h2 className="step1">
              <span className="bold">STEP 1:</span> GRADING RUBRIC
            </h2>
            <div className="curated-rubric">
              <FileLoader
                setRubricMarkdown={setRubricMarkdown}
                rubricMarkdownFileName={rubricMarkdownFileName}
                setRubricMarkdownFileName={setRubricMarkdownFileName}
                resetLabel={resetLabel}
              />
              <div className="flex-row">
                <div>
                  <label htmlFor="rubric-selection">
                    Or select a curated one:
                  </label>
                </div>

                <ObtainRubricNames
                  selected_rubric_id={selected_rubric_id}
                  setRubricID={setRubricID}
                  rubrics={rubrics}
                  resetLabel={resetLabel}
                  id="rubric-selection"
                />
              </div>
            </div>
            <h2 className="step2">
              {' '}
              <span className="bold">STEP 2:</span> STUDENT ASSIGNMENT
            </h2>
            <label htmlFor="student-assignment">
              Insert the student assignment:
            </label>
            <textarea
              id="student-assignment"
              ref={student_assignment_submission}
              // cols={66}
              rows={17}
              value={student_assignment}
              onChange={handleStudentAssignmentChange}
              aria-labelledby="student-assignment"
              required
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
          <h2>
            {' '}
            <span className="bold">GRADE & FEEDBACK</span>{' '}
          </h2>

          <p>The grade and feedback will appear here:</p>
          <div className={'graded_feedback'}>
            {grading_loading ? (
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: '#70bec7',
                  },
                }}
              >
                <Spin
                  tip="Analyzing"
                  size="large"
                  role="status"
                  aria-live="assertive"
                  aria-busy="true"
                >
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
          <div className="button-container-feedback">
            {/* <button
              type="button"
              className={'grade-button'}
              // onClick={downloadFeedback}
            >
              Download Feedback
            </button> */}
            <button
              type="button"
              className={'clear-button'}
              onClick={() => {
                setStudentAssignment('');
                setGrading('');
                setDetailedSuggestions('');
                resetLabel();
              }}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
