import React from 'react';
import ViewGradingRubricDetails from '../components/ViewGradingRubricDetails';

const Rubric = ({ selected_rubric_id, setRubricID }) => {
  return (
    <div>
      <ViewGradingRubricDetails rubric_id={selected_rubric_id} />
    </div>
  );
};

export default Rubric;
