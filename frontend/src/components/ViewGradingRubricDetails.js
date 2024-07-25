import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import configData from '../config.json';

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
    if (props.rubricMarkdown) {
      setMessage({
        file_: props.rubricMarkdown,
        name: 'Custom Rubric',
        description: 'Taken from the uploaded file',
        class_name: '',
        level: '',
        language: '',
      });

      return;
    }
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
    <div className="main_container_2">
      <div className="select_rubric">
        <div className="rubric_details_container">
          <h2>Selected Grading Rubric Info</h2>
          <div className="rubric_details">
            {message.name && (
              <p>
                <strong>Name: </strong>
                {message.name}
              </p>
            )}
            {message.description && (
              <p>
                <strong>Description: </strong>
                {message.description}
              </p>
            )}
            {message.class_name && (
              <p>
                <strong>Class Name: </strong>
                {message.class_name}
              </p>
            )}
            {message.level && (
              <p>
                <strong>Level: </strong>
                {message.level}
              </p>
            )}
            {message.language && (
              <p>
                <strong>Language: </strong>
                {message.language}
              </p>
            )}
          </div>
        </div>
        {/* <div className="confirm-change">
          <h2>Step 2: Confirm or Change Grading Rubric </h2>
          <p>Select a curated grading rubric:</p>
          <ObtainRubricNames
            selected_rubric_id={props.rubric_id}
            setRubricID={props.setRubricID}
            rubrics={props.rubrics}
          />

          <FileLoader
            setRubricMarkdown={props.setRubricMarkdown}
            rubricMarkdownFileName={props.rubricMarkdownFileName}
            setRubricMarkdownFileName={props.setRubricMarkdownFileName}
          />

          <button
            type="submit"
            className="grade-button"
            onClick={() => props.handleTabChange(0)}
          >
            Confirm
          </button>
        </div> */}
      </div>
      <h2>Content:</h2>

      <div className={'view_rubric ' + 'border'}>
        <Markdown remarkPlugins={[remarkGfm]}>{message.file_}</Markdown>
      </div>
    </div>
  );
}

export default ViewGradingRubricDetails;
