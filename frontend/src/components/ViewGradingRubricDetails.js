import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ObtainRubricNames from '../components/ObtainRubricNames';
import configData from '../config.json';
import FileLoader from '../components/FileLoader';

function ViewGradingRubricDetails(props) {
  const [message, setMessage] = useState('');

  //http://localhost:8000/api/obtain-rubric/?rubric_id=1
  var BASE_URL;
  if (process.env.NODE_ENV === 'development') {
    BASE_URL = 'http://localhost:8000/';
  } else {
    BASE_URL = configData['SERVER_URL'];
  }

  useEffect(() => {
    axios
      .get(BASE_URL.concat('api/obtain-rubric/'), {
        params: props,
      }) // alternative: {params: {student_assignment: props.student_assignment, grading_rubric: props.grading_rubric}}
      .then(response => {
        setMessage(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [props]);
  console.log('PROPS', props);
  // console.log(message.file_);

  return (
    <div className="main_container">
      <div className="select_rubric">
        <div className="rubric_details_container">
          <h2>Step 1: Review Grading Rubric</h2>
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
        <div className="confirm-change">
          <h2>Step 2: Confirm or Change Grading Rubric </h2>
          <p>Select a curated grading rubric:</p>
          <ObtainRubricNames
            selected_rubric_id={props.rubric_id}
            setRubricID={props.setRubricID}
            rubrics={props.rubrics}
          />
          <div className="curated-rubric">
            <p>Or load your own:</p>
            <FileLoader />
          </div>
          <button type="submit" className="grade-button">
            Confirm
          </button>
        </div>
      </div>
      <div className="view_rubric">
        <Markdown remarkPlugins={[remarkGfm]}>{message.file_}</Markdown>
      </div>
    </div>
  );
}

export default ViewGradingRubricDetails;
