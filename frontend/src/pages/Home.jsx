import React, { useState, useRef } from 'react';
import ObtainRubricNames from '../components/ObtainRubricNames';
import axios from 'axios';
import Markdown from 'react-markdown';

const Home = ({
  selected_rubric_id,
  setRubricID,
  student_assignment,
  setStudentAssignment,
  graded_feedback,
  setGrading,
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
      .get('http://localhost:8000/api/grade-with-gemini/', {
        params: {
          student_assignment,
          rubric_id,
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
    <div className="main_container">
      <div className="assignment_section">
        <h2>1. Insert student assignment</h2>

        <form onSubmit={handleSubmit}>
          <textarea ref={student_assignment_submission} cols={50} rows={10} />
          <h2>Step 2: Grading rubric</h2>
          <p>Select or load the grading rubric</p>
          <ObtainRubricNames
            selected_rubric_id={selected_rubric_id}
            setRubricID={setRubricID}
          />
          <button type="submit">Grade</button>
        </form>
      </div>
      <div className="grading_section">
        <h2>Graded feedback:</h2>
        {grading_loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <div className="graded_feedback">
              <Markdown>{graded_feedback}</Markdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
