import React, { useState } from 'react';
import axios from 'axios';
import Markdown from 'react-markdown';

function GradeWithGemini({
  student_assignment,
  rubric_id,
  graded_feedback,
  setGrading,
}) {
  // States to manage Gemini grading & loading message
  const [grading_loading, setGradingLoading] = useState(false);

  // fetch call into a callback that is called by the button element's onClick handler
  const generate = () => {
    setGradingLoading(true);
    axios
      .get('http://localhost:8000/api/grade-with-gemini/', {
        params: {
          student_assignment: student_assignment,
          rubric_id: rubric_id,
        },
      }) // alternative: {params: {student_assignment: props.student_assignment, grading_rubric: props.grading_rubric}}
      .then(response => {
        setGrading(response.data.message);
      })
      .then(() => setGradingLoading(false))
      .catch(error => {
        console.log(error);
      });
  };

  if (grading_loading)
    return (
      <>
        <button onClick={generate}>Grade</button>
        <p>Loading...</p>
      </>
    );

  return (
    <>
      <button onClick={generate}>Grade</button>

      <h2>Graded feedback:</h2>

      <Markdown>{graded_feedback}</Markdown>
    </>
  );
}

export default GradeWithGemini;
