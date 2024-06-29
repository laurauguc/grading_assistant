import React, { useState, useRef } from 'react';
import GradeWithGemini from '../components/GradeWithGemini.js'; // './GradeWithGemini';
import ObtainRubricNames from '../components/ObtainRubricNames';
// import ViewGradingRubricDetails from '../components/ViewGradingRubricDetails';

const Home = ({
  selected_rubric_id,
  setRubricID,
  student_assignment,
  setStudentAssignment,
  graded_feedback,
  setGrading,
}) => {
  // to collect the student assignment
  const student_assignment_submission = useRef();
  const add_assignment = e => {
    e.preventDefault();
    setStudentAssignment(student_assignment_submission.current.value);
  };
  return (
    <div>
      <h2>1. Insert student assignment</h2>

      <form onSubmit={add_assignment}>
        <input ref={student_assignment_submission} />
        <button>ADD</button>
      </form>

      <p>{student_assignment}</p>

      <h2>2. Select rubric</h2>

      <ObtainRubricNames
        selected_rubric_id={selected_rubric_id}
        setRubricID={setRubricID}
      />

      {/* <p>Selected rubric id: {selected_rubric_id}</p> */}

      <GradeWithGemini
        student_assignment={student_assignment}
        rubric_id={selected_rubric_id}
        graded_feedback={graded_feedback}
        setGrading={setGrading}
      />
    </div>
  );
};

export default Home;
