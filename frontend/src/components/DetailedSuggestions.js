import React, { useState } from 'react';
import axios from 'axios';
import Markdown from 'react-markdown';
import configData from '../config.json';
import { Button, ConfigProvider, Space, Alert, Flex, Spin } from 'antd';

function DetailedSuggestions({ student_assignment, graded_feedback }) {
  // States to manage Gemini suggestions & loading message
  const [suggestions_loading, setSuggestionsLoading] = useState(false);
  const [detailed_suggestions, setDetailedSuggestions] = useState('');
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
        <button onClick={generate} className={'get_details_button'}>
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
          {/* <p>Hover over the result to see the details:</p> */}
          <div
            dangerouslySetInnerHTML={{ __html: detailed_suggestions }}
            className="graded_feedback"
          />
        </div>
      )}
    </div>
  );
  //   if (suggestions_loading)
  //     return (
  //       <>
  //         <button onClick={generate}>Get Detailed Suggestions</button>
  //         <p>Loading...</p>
  //       </>
  //     );

  //   return (
  //     <>
  //       <button onClick={generate}>Get Detailed Suggestions</button>
  //       <div dangerouslySetInnerHTML={{ __html: detailed_suggestions }} />
  //     </>
  //   );
}

export default DetailedSuggestions;
