import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import configData from '../config.json';

function ViewGradingRubricDetails(props) {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

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
      })
      .then(response => {
        setMessage(response.data);
      })
      .catch(error => {
        console.log(error);
        setError('Unable to fetch the rubric details. Please try again.');
      });
  }, [props]);

  return (
    <div className="main_container_2">
      <div className="select_rubric">
        <div className="rubric_details">
          <h2 className="bold">SELECTED GRADING RUBRIC INFO</h2>
          {message.name && (
            <p>
              <span className="bold">NAME: </span>
              {message.name}
            </p>
          )}
          {message.description && (
            <p>
              <span className="bold">DESCRIPTION: </span>
              {message.description}
            </p>
          )}
          {message.class_name && (
            <p>
              <span className="bold">CLASS NAME: </span>
              {message.class_name}
            </p>
          )}
          {message.level && (
            <p>
              <span className="bold">LEVEL: </span>
              {message.level}
            </p>
          )}
          {message.language && (
            <p>
              <span className="bold">LANGUAGE: </span>
              {message.language}
            </p>
          )}
          {error && (
            <p className="error" role="alert">
              {error}
            </p>
          )}
        </div>
      </div>

      <div className={'view_rubric'}>
        <Markdown remarkPlugins={[remarkGfm]}>{message.file_}</Markdown>
      </div>
    </div>
  );
}

export default ViewGradingRubricDetails;
