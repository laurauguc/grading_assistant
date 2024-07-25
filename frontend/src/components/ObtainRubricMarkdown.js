import React, { useState, useEffect } from 'react';
import axios from 'axios';
import configData from '../config.json';

function ObtainRubricMarkdown() {
  const [message, setMessage] = useState('');

  //http://localhost:8000/api/obtain-rubric/?rubric_id=1
  var BASE_URL;
  if (process.env.NODE_ENV === 'development') {
    BASE_URL = 'http://localhost:8000/';
  } else {
    BASE_URL = configData['SERVER_URL'];
  }

  // change line below. used for testing
  const docx_path =
    './external_data/rubric_markdown_test/us_history_rubric_test.docx';

  useEffect(() => {
    axios
      .get(BASE_URL.concat('api/convert-docx-to-md/'), {
        params: { docx_path: docx_path },
      }) // alternative: {params: {student_assignment: props.student_assignment, grading_rubric: props.grading_rubric}}
      .then(response => {
        setMessage(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return <div>{message}</div>;
}

export default ObtainRubricMarkdown;
