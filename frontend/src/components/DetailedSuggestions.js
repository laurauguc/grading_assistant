import React, { useState } from 'react';
import axios from 'axios';
import Markdown from 'react-markdown';
import configData from '../config.json';

function DetailedSuggestions({
  student_assignment,
  graded_feedback,
}) {
  // States to manage Gemini suggestions & loading message
  const [suggestions_loading, setSuggestionsLoading] = useState(false);
  const [detailed_suggestions, setDetailedSuggestions] = useState("")

  const BASE_URL =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8000/'
      : configData['SERVER_URL'];

  // fetch call into a callback that is called by the button element's onClick handler
  const generate = () => {
    setSuggestionsLoading(true);
    axios
      .get(BASE_URL.concat('api/suggestions-with-gemini/'), {
        params: {
          student_assignment: student_assignment,
          graded_feedback: graded_feedback},
      }) // alternative: {params: {student_assignment: props.student_assignment, grading_rubric: props.grading_rubric}}
      .then(response => {
        setDetailedSuggestions(response.data.message);
      })
      .then(() => setSuggestionsLoading(false))
      .catch(error => {
        console.log(error);
      });
  };

  if (suggestions_loading)
    return (
      <>
        <button onClick={generate}>Get Detailed Suggestions</button>
        <p>Loading...</p>
      </>
    );

  return (
    <>

      <button onClick={generate}>Get Detailed Suggestions</button>
      <div dangerouslySetInnerHTML={{__html: detailed_suggestions}} />


    </>
  );
}

export default DetailedSuggestions;
