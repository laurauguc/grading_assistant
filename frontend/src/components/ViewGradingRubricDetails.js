import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {marked} from 'marked'

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
    <div>
      <h3>Selected Rubric Details</h3>
      <p>Name: {message.name}</p>
      <p>Description: {message.description}</p>
      <p>Class names: {message.class_name}</p>
      <p>Level: {message.level}</p>
      <p>Language: {message.language}</p>
      <div>Path to file (need to display): {message.content}</div>

    </div>
  );
}

export default ViewGradingRubricDetails;
