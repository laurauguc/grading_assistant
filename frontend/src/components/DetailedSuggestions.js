import React, { useState } from 'react';
import axios from 'axios';
import Markdown from 'react-markdown';
import configData from '../config.json';
import { Button, ConfigProvider, Space, Alert, Flex, Spin } from 'antd';

function DetailedSuggestions({ student_assignment, graded_feedback }) {
  // States to manage Gemini suggestions & loading message
  const [suggestions_loading, setSuggestionsLoading] = useState(false);
  const [detailed_suggestions, setDetailedSuggestions] = useState('');

  const BASE_URL =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8000/'
      : configData['SERVER_URL'];

  // fetch call into a callback that is called by the button element's onClick handler
  const generate = () => {
    setSuggestionsLoading(true);
    axios
      .get(BASE_URL.concat('api/suggestions-with-gemini/'), {
        params: {
          student_assignment: student_assignment,
          graded_feedback: graded_feedback,
        },
      }) // alternative: {params: {student_assignment: props.student_assignment, grading_rubric: props.grading_rubric}}
      .then(response => {
        setDetailedSuggestions(response.data.message);
      })
      .then(() => setSuggestionsLoading(false))
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <div>
      {!suggestions_loading && !detailed_suggestions && (
        // <ConfigProvider
        //   theme={{
        //     token: {
        //       colorPrimary: '#4CAF50',
        //       borderRadius: 6,
        //     },
        //   }}
        // >
        //   <Button
        //     type="primary"
        //     htmlType="submit"
        //     size="large"
        //     className="grade-button"
        //     onClick={generate}
        //   >
        //     Get Detailed Suggestions
        //   </Button>
        // </ConfigProvider>
        <button onClick={generate} className={'get_details_button'}>
          Get Detailed Suggestions
        </button>
      )}
      {suggestions_loading && (
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#4CAF50',
            },
          }}
        >
          <Spin tip="Loading" size="large">
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
          <p>Hover over the result to see the details:</p>
          <div dangerouslySetInnerHTML={{ __html: detailed_suggestions }} />
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
