import React, { useState } from 'react';
import axios from 'axios';
import configData from '../config.json';
import { ConfigProvider, Spin } from 'antd';

function DetailedSuggestions({
  student_assignment,
  graded_feedback,
  setDetailedSuggestions,
  detailed_suggestions,
}) {
  // States to manage Gemini suggestions & loading message
  const [suggestions_loading, setSuggestionsLoading] = useState(false);
  const [missingAssignment, setMissingAssignment] = useState(false);

  const BASE_URL =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8000/'
      : configData['SERVER_URL'];
  const errorMessage =
    'Unable to generate the Detailed Feedback. Please check your inputs and try again.';
  const generate = () => {
    if (!student_assignment) {
      setMissingAssignment(true);
      return;
    }
    setSuggestionsLoading(true);
    axios
      .get(BASE_URL.concat('api/suggestions-with-gemini/'), {
        params: {
          student_assignment: student_assignment,
          graded_feedback: graded_feedback,
        },
      }) // alternative: {params: {student_assignment: props.student_assignment, grading_rubric: props.grading_rubric}}
      .then(response => {
        if (response == errorMessage) {
          setMissingAssignment(errorMessage);
          return;
        }
        setDetailedSuggestions(response.data.message);
      })
      .then(() => setSuggestionsLoading(false))
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <div>
      <p
        style={{
          marginBottom: 30,
        }}
      >
        The Detailed Feedback provides a rewritten version of the essay, along
        with explanations and the relevant rubric category.
      </p>
      {!suggestions_loading && !detailed_suggestions && (
        <button onClick={generate} className={'get_details_button ' + 'border'}>
          Get Detailed Feedback
        </button>
      )}
      {missingAssignment && (
        <p
          style={{
            marginTop: 50,
          }}
        >
          No student assignment was found. Please return to the Home tab to
          insert.
        </p>
      )}
      {suggestions_loading && (
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#4CAF50',
            },
          }}
        >
          <Spin tip="Analyzing" size="large">
            <div
              style={{
                padding: 50,
                borderRadius: 4,
              }}
            />
          </Spin>
        </ConfigProvider>
      )}
      {detailed_suggestions && (
        <div className="flex-column">
          <div
            dangerouslySetInnerHTML={{ __html: detailed_suggestions }}
            className={'detailed_feedback ' + 'border'}
          />
        </div>
      )}
    </div>
  );
}

export default DetailedSuggestions;
