import logo from './images/logo.png';
import React from 'react';
import Home from '../src/pages/Home.jsx';
import Rubric from '../src/pages/Rubric.jsx';
import Details from '../src/pages/Details.jsx';
import Tips from '../src/pages/Tips.jsx';
import configData from './config.json';
import { useState, useEffect } from 'react';
import { Button } from 'antd';
import AboutUsModal from './components/Modal.js';
import { Link } from 'react-router-dom';

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
  const [isModalVisible, setIsModalVisible] = useState(false);

  const resetLabel = () => {
    setRubricMarkdownFileName('');
    setRubricMarkdown('');
  };
  const colors = {
    orange: '#ff7804',
    orangeSoft: '#ffa049',
    orangeHover: '#ff8904',

    green: '#83aa64',
    greenSoft: '#b2ca9e',
    greenHover: '#99c082',
    // blue: '#027581',
    // blueSoft: '#00a7b8',
    pink: '#d0919a',
    pinkSoft: '#dfb4ba',
    pinkHover: '#db9fa8',

    purple: '#888eb9',
    // purple: '#7e83b3',
    purpleSoft: '#aeb2cf',
    purpleHover: '#9699c1',
  };
  // const oldColors = {
  //   'red-light': '#ffa69e',
  //   red: '#ff6457',
  //   'green-light': '#b8f2e6',
  //   green: '#25cdaa',
  //   'blue-light': '#aed9e0',
  //   blue: '#46a7b7;',
  // };

  const tabs = [
    {
      label: 'HOME',
      className: 'orange',
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
      label: 'GRADING RUBRIC',
      className: 'green',
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
      label: 'DETAILED FEEDBACK',
      className: 'pink',
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
      label: 'USAGE TIPS',
      className: 'purple',
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

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  return (
    <React.Fragment>
      <header>
        <div className="headerClass">
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
        </div>
        <div className="modal">
          <button className="about-button" onClick={() => showModal()}>
            About Us
          </button>
          <AboutUsModal
            isVisible={isModalVisible}
            handleClose={handleModalClose}
          />
        </div>
      </header>
      <div className="tabs">
        <div
          className="tab-buttons"
          role="tablist"
          aria-label="GradeMate navigation tabs"
          style={{
            borderBottom: `5px solid ${tabs[activeTab].activeColor}`,
          }}
        >
          {tabs.map((tab, index) => (
            <button
              key={index}
              id={`tab-${index}`}
              role="tab"
              aria-selected={activeTab === index}
              aria-controls={`tabpanel-${index}`}
              className={`tab-button ${activeTab === index ? 'active' : ''} ${
                tab.className
              }`}
              onClick={() => setActiveTab(index)}
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
        <div>
          GradeMate may display inaccurate info so double-check its responses.{' '}
          <Link to="/privacy" target="_blank" rel="noreferrer">
            {' '}
            Your Privacy
          </Link>
          .
        </div>
      </footer>
    </React.Fragment>
  );
}

export default App;
