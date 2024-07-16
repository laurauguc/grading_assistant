import React from 'react';
import ViewGradingRubricDetails from '../components/ViewGradingRubricDetails';

const Rubric = ({ selected_rubric_id, setRubricID, rubrics }) => {
  return (
    <div className="container">
      {/* <p className="center">View or change your Grading Rubric</p> */}

      <ViewGradingRubricDetails
        rubric_id={selected_rubric_id}
        setRubricID={setRubricID}
        rubrics={rubrics}
      />
    </div>
  );
};

export default Rubric;
