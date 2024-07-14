import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function ObtainRubricMarkdown() {
  const [message, setMessage] = useState('');

  //http://localhost:8000/api/obtain-rubric/?rubric_id=1
  var REACT_APP_HOST_BASE_URL;
  if (process.env.NODE_ENV == 'development') {
    REACT_APP_HOST_BASE_URL="http://127.0.0.1:8000/"
  } else {
    REACT_APP_HOST_BASE_URL="https://grademate.pythonanywhere.com/"
  }

  const docx_path = "../../external_data/rubric_markdown_test/us_history_rubric_test.docx"

  useEffect(() => {
    axios
      .get(REACT_APP_HOST_BASE_URL.concat('api/convert-docx-to-md/'), { params: {docx_path: docx_path} }) // alternative: {params: {student_assignment: props.student_assignment, grading_rubric: props.grading_rubric}}
      .then(response => {
        setMessage(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
    {message}
    </div>
  );
}

export default ObtainRubricMarkdown;
