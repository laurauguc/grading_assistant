import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ObtainRubricNames from '../components/ObtainRubricNames';

function ViewGradingRubricDetails(props) {
  const [message, setMessage] = useState('');

  //http://localhost:8000/api/obtain-rubric/?rubric_id=1
  var REACT_APP_HOST_BASE_URL;
  if (process.env.NODE_ENV === 'development') {
    REACT_APP_HOST_BASE_URL = 'http://localhost:8000/';
  } else {
    REACT_APP_HOST_BASE_URL = 'https://grademate.pythonanywhere.com/';
  }

  useEffect(() => {
    axios
      .get(REACT_APP_HOST_BASE_URL.concat('api/obtain-rubric/'), {
        params: props,
      }) // alternative: {params: {student_assignment: props.student_assignment, grading_rubric: props.grading_rubric}}
      .then(response => {
        setMessage(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [props]);

  console.log(message.file_);

  return (
    <div className="main_container">
      <div className="select_rubric">
        <div>
          <h2>Select Rubric Name</h2>
          <ObtainRubricNames
            selected_rubric_id={props.selected_rubric_id}
            setRubricID={props.setRubricID}
          />
        </div>
        <div className="rubric_details_container">
          <h2>Selected Rubric Details</h2>
          <div className="rubric_details">
            <p>
              <strong>Name: </strong>
              {message.name}
            </p>
            <p>
              <strong>Description: </strong>
              {message.description}
            </p>
            <p>
              <strong>Class names: </strong>
              {message.class_name}
            </p>
            <p>
              <strong>Level: </strong>
              {message.level}
            </p>
            <p>
              <strong>Language: </strong>
              {message.language}
            </p>
          </div>
        </div>
      </div>
      <div className="view_rubric">
        <Markdown remarkPlugins={[remarkGfm]}>{message.file_}</Markdown>
      </div>
    </div>
  );
}

export default ViewGradingRubricDetails;
