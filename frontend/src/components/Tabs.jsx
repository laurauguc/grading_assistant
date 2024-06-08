import React, { useState } from 'react';
import Home from '../Pages/Home.jsx';
import Rubric from '../Pages/Rubric.jsx';
import Details from '../Pages/Details.jsx';
import Advanced from '../Pages/Advanced.jsx';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { label: 'Home', component: <Home /> },
    { label: 'Grading Rubric', component: <Rubric /> },
    { label: 'Detailed View', component: <Details /> },
    { label: 'Advanced Options', component: <Advanced /> },
  ];

  return (
    <div className="tabs">
      <div className="tab-buttons">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`tab-button ${activeTab === index ? 'active' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content">{tabs[activeTab].component}</div>
    </div>
  );
};

export default Tabs;
