import React from 'react';
import DetailedSuggestions from '../components/DetailedSuggestions';

const Details = ({ graded_feedback, student_assignment }) => {
  return (
    <div className={'coming ' + 'main_container'}>
      <DetailedSuggestions
        student_assignment={student_assignment}
        graded_feedback={graded_feedback}
      />
    </div>
  );
};

export default Details;
