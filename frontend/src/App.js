import logo from './images/logo.png';
import React from 'react';
import Home from '../src/pages/Home.jsx';
import Rubric from '../src/pages/Rubric.jsx';
import Details from '../src/pages/Details.jsx';
import Tips from '../src/pages/Tips.jsx';
import configData from './config.json';
import { useState, useEffect } from 'react';

function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [selected_rubric_id, setRubricID] = useState(1);
  const [student_assignment, setStudentAssignment] = useState(null);
  const [graded_feedback, setGrading] = useState('');
  const [rubrics, setRubrics] = useState(null);
  const [rubricMarkdown, setRubricMarkdown] = useState('');
  const [rubricMarkdownFileName, setRubricMarkdownFileName] = useState('');
  const [additionalInput, setAdditionalInput] = useState(null);
  const [detailed_suggestions, setDetailedSuggestions] = useState('');

  const resetLabel = () => {
    setRubricMarkdownFileName('');
    setRubricMarkdown('');
  };
  // const colors = {
  //   'red-light': '#ffcdd2',
  //   red: '#f44336',
  //   'green-light': '#c8e6c9',
  //   green: '#4caf50',
  //   'blue-light': '#bbdefb',
  //   blue: '#2196f3;',
  // };
  const colors = {
    'red-light': '#ffa69e',
    red: '#ff6457',
    'green-light': '#b8f2e6',
    green: '#25cdaa',
    'blue-light': '#aed9e0',
    blue: '#46a7b7;',
  };

  const tabs = [
    {
      label: 'Home',
      defaultColor: colors['red-light'],
      activeColor: colors.red,
      component: (
        <Home
          selected_rubric_id={selected_rubric_id}
          setRubricID={setRubricID}
          student_assignment={student_assignment}
          setStudentAssignment={setStudentAssignment}
          graded_feedback={graded_feedback}
          setGrading={setGrading}
          rubrics={rubrics}
          handleTabChange={index => setActiveTab(index)}
          setRubricMarkdown={setRubricMarkdown}
          rubricMarkdown={rubricMarkdown}
          rubricMarkdownFileName={rubricMarkdownFileName}
          setRubricMarkdownFileName={setRubricMarkdownFileName}
          resetLabel={resetLabel}
          additionalInput={additionalInput}
          setAdditionalInput={setAdditionalInput}
          setDetailedSuggestions={setDetailedSuggestions}
        />
      ),
    },
    {
      label: 'Grading Rubric',
      defaultColor: '#BBDEFB', // Example color (light blue)
      activeColor: '#2196F3', // Example color (blue)
      component: (
        <Rubric
          selected_rubric_id={selected_rubric_id}
          setRubricID={setRubricID}
          rubrics={rubrics}
          handleTabChange={index => setActiveTab(index)}
          setRubricMarkdown={setRubricMarkdown}
          rubricMarkdown={rubricMarkdown}
          rubricMarkdownFileName={rubricMarkdownFileName}
          setRubricMarkdownFileName={setRubricMarkdownFileName}
        />
      ),
    },
    {
      label: 'Detailed Feedback',
      defaultColor: '#C8E6C9', // Example color (light green)
      activeColor: '#4CAF50', // Example color (green)
      component: (
        <Details
          student_assignment={student_assignment}
          graded_feedback={graded_feedback}
          detailed_suggestions={detailed_suggestions}
          setDetailedSuggestions={setDetailedSuggestions}
        />
      ),
    },
    {
      label: 'Usage Tips',
      defaultColor: '#FFECB3', // Example color (light orange)
      activeColor: '#FFC107', // Example color (orange)
      component: <Tips />,
    },
  ];

  const BASE_URL =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8000/'
      : configData['SERVER_URL'];

  useEffect(() => {
    fetch(BASE_URL.concat('api/obtain-rubric-names/')) // 'http://localhost:8000/api/obtain-rubric-names/') // alternative: {params: {student_assignment: props.student_assignment, grading_rubric: props.grading_rubric}}
      .then(rubric_response => rubric_response.json())
      .then(setRubrics)
      .catch(error => {
        console.log(error);
      });
  }, [BASE_URL]);

  useEffect(() => {
    setRubricMarkdownFileName('');
    setRubricMarkdown('');
  }, [selected_rubric_id]);
  return (
    <React.Fragment>
      <header>
        <img
          src={logo}
          className="App-logo"
          alt="GradeMate logo"
          height={120}
        />
        <div>
          <h1>GradeMate</h1>
          <h2>Gemini-powered grading assistant for teachers and students</h2>
        </div>
      </header>
      <div className="tabs">
        <div
          className="tab-buttons"
          role="tablist"
          aria-label="GradeMate navigation tabs"
          style={{
            borderBottom: `2px solid ${tabs[activeTab].activeColor}`,
          }}
        >
          {tabs.map((tab, index) => (
            <button
              key={index}
              id={`tab-${index}`}
              role="tab"
              aria-selected={activeTab === index}
              aria-controls={`tabpanel-${index}`}
              className={`tab-button ${activeTab === index ? 'active' : ''}`}
              onClick={() => setActiveTab(index)}
              style={{
                backgroundColor:
                  activeTab === index ? tab.activeColor : tab.defaultColor,
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div
          className="tab-content"
          id={`tabpanel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
        >
          {tabs[activeTab].component}
        </div>
      </div>
      <footer>
        GradeMate may display inaccurate info so double-check its responses. It
        is powered by the <span id="value">&nbsp;</span>
        <a href="https://ai.google.dev/gemini-api/terms"> Gemini API</a>
      </footer>
    </React.Fragment>
  );
}

export default App;
