import React from 'react';

const Home = () => {
  return (
    <div>
      <div>
        <h3>Select or load grading rubric</h3> <button>View Rubric</button>
      </div>
      <div className="home_flex">
        <div>
          <h3>Insert student assignment</h3>
          <textarea cols={50} rows={20}></textarea>
          <button>Submit</button>
        </div>
        <div>
          <h3>Grader Response</h3>
          <textarea cols={50} rows={20}></textarea>
          <button>Detailed View</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
