import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Markdown from 'react-markdown'
import remarkGfm from "remark-gfm";


function ViewGradingRubricDetails(props) {
  const [message, setMessage] = useState('');

  //http://localhost:8000/api/obtain-rubric/?rubric_id=1

  useEffect(() => {
    axios.get('http://localhost:8000/api/obtain-rubric/', {params: props}) // alternative: {params: {student_assignment: props.student_assignment, grading_rubric: props.grading_rubric}}
      .then(response => {
        setMessage(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [props]);

  return (
    <>
      <h3>Selected Rubric Details</h3>
      <p>Name: {message.name}</p>
      <p>Description: {message.description}</p>
      <p>Class names: {message.class_name}</p>
      <p>Level: {message.level}</p>
      <p>Language: {message.language}</p>

      <Markdown remarkPlugins={[remarkGfm]}>{message.file_}</Markdown>
    </>
  );
}

export default ViewGradingRubricDetails;
