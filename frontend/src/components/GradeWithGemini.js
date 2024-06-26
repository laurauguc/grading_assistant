import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {marked} from 'marked'





function GradeWithGemini({student_assignment, rubric_id}) {
  // States to manage Gemini grading & loading message
  const [grading_loading, setGradingLoading] = useState(false);
  const [graded_feedback, setGrading] = useState('');

  // fetch call into a callback that is called by the button element's onClick handler
  const generate = () => {
    setGradingLoading(true)
    axios.get('http://localhost:8000/api/grade-with-gemini/', {params: {student_assignment: student_assignment, rubric_id: rubric_id}}) // alternative: {params: {student_assignment: props.student_assignment, grading_rubric: props.grading_rubric}}
      .then(response => {
        setGrading(response.data.message);
      })
      .then(() => setGradingLoading(false))
      .catch(error => {
        console.log(error);
      });
  }

  const marked_output = marked.parse(graded_feedback)


  if (grading_loading) return (
    <>
    <button onClick={generate}>Grade</button>
    <p>Loading...</p>
    </>
  )

  return (
    <>
    <button onClick={generate}>Grade</button>

    <h2>Graded feedback:</h2>

    <div contentEditable='true' dangerouslySetInnerHTML={{ __html: marked_output}}></div>
    </>
  );
}

export default GradeWithGemini;