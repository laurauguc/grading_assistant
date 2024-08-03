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
  const [error, setError] = useState('');

  const BASE_URL =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8000/'
      : configData['SERVER_URL'];
  const errorMessage =
    'Unable to generate the Detailed Feedback. Please check your inputs and try again.';
  const globalErrorMessage = 'Something went wrong. Please try again.';
  const generate = () => {
    setDetailedSuggestions(null);
    setError('');
    setMissingAssignment(false);

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
        if (response === errorMessage) {
          setMissingAssignment(errorMessage);
          return;
        }
        setDetailedSuggestions(response.data.message);
      })
      .catch(error => {
        console.log(error);
        setError(globalErrorMessage);
      })
      .finally(() => {
        setSuggestionsLoading(false);
      });
  };
  return (
    <div>
      <p
        style={{
          marginBottom: 20,
          marginTop: 0,
        }}
      >
        The Detailed Feedback provides a rewritten version of the assignment,
        along with explanations and the relevant rubric criteria.
      </p>

      <button
        onClick={generate}
        className={'get_details_button'}
        aria-label="Get Detailed Feedback"
      >
        Get Detailed Feedback
      </button>

      {missingAssignment && (
        <p className="error" role="alert">
          No student assignment was found. Please return to the Home tab to
          insert.
        </p>
      )}
      {suggestions_loading && (
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#d0919a',
            },
          }}
        >
          <Spin
            tip="Analyzing"
            size="large"
            role="status"
            aria-live="assertive"
            aria-busy="true"
          >
            <div
              style={{
                padding: 50,
                borderRadius: 4,
              }}
            />
          </Spin>
        </ConfigProvider>
      )}
      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}
      {detailed_suggestions && (
        <div className="flex-column">
          <div
            dangerouslySetInnerHTML={{ __html: detailed_suggestions }}
            className={'detailed_feedback ' + 'border'}
            aria-live="polite"
            tabIndex="0"
          />
        </div>
      )}
    </div>
  );
}

export default DetailedSuggestions;
