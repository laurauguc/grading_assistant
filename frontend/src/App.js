import logo from './images/logo.png';
import footer from './images/footer.png';
import React from 'react';
import Home from '../src/pages/Home.jsx';
import Rubric from '../src/pages/Rubric.jsx';
import Details from '../src/pages/Details.jsx';
import Advanced from '../src/pages/Advanced.jsx';

import { useState } from 'react';

function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [selected_rubric_id, setRubricID] = useState(1);
  const [student_assignment, setStudentAssignment] = useState(null);
  const [graded_feedback, setGrading] = useState('');

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
        />
      ),
    },
    {
      label: 'Grading Rubric',
      defaultColor: '#BBDEFB', // Example color (light blue)
      activeColor: '#2196F3', // Example color (blue)
      component: <Rubric selected_rubric_id={selected_rubric_id} />,
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

  return (
    <React.Fragment>
      <header>
        <img src={logo} className="App-logo" alt="logo" height={120} />
        <h1>Grading Assistant</h1>
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

      <img src={footer} className="App-logo" alt="logo" height={200} />
    </React.Fragment>
  );
}

export default App;
