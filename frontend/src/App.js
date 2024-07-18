import logo from './images/logo.png';
import footer from './images/footer_text.png';
import React from 'react';
import Home from '../src/pages/Home.jsx';
import Rubric from '../src/pages/Rubric.jsx';
import Details from '../src/pages/Details.jsx';
import Advanced from '../src/pages/Advanced.jsx';
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

  const tabs = [
    {
      label: 'Home',
      defaultColor: '#FFCDD2', // Example color (light red)
      activeColor: '#F44336', // Example color (red)
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
      label: 'Detailed View',
      defaultColor: '#C8E6C9', // Example color (light green)
      activeColor: '#4CAF50', // Example color (green)
      component: <Details />,
    },
    {
      label: 'Advanced Options',
      defaultColor: '#FFECB3', // Example color (light orange)
      activeColor: '#FFC107', // Example color (orange)
      component: <Advanced />,
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
  }, []);

  useEffect(() => {
    setRubricMarkdownFileName('');
    setRubricMarkdown('');
  }, [selected_rubric_id]);
  return (
    <React.Fragment>
      <header>
        <img src={logo} className="App-logo" alt="logo" height={120} />
        <div>
          <h1>GradeMate</h1>
          <h2>Gemini-powered Grading Assistant for teachers and students</h2>
        </div>
      </header>
      <div className="tabs">
        <div
          className="tab-buttons"
          style={{
            borderBottom: `2px solid ${tabs[activeTab].activeColor}`,
          }}
        >
          {tabs.map((tab, index) => (
            <button
              key={index}
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

        <div className="tab-content">{tabs[activeTab].component}</div>
      </div>
      <footer>
        {/* <img src={footer} className="backpack" alt="logo" /> */}
        The Grading Assistant may display inaccurate info so double-check its
        responses. It is powered by the{' '}
        <a href="https://ai.google.dev/gemini-api/terms">Gemini API</a>
      </footer>
    </React.Fragment>
  );
}

export default App;
