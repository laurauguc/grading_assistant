import React from 'react';
import DetailedSuggestions from '../components/DetailedSuggestions';

const Details = ({
  graded_feedback,
  student_assignment,
  setDetailedSuggestions,
  detailed_suggestions,
}) => {
  return (
    <div className={'detailed_container ' + 'main_container'}>
      <DetailedSuggestions
        student_assignment={student_assignment}
        graded_feedback={graded_feedback}
        detailed_suggestions={detailed_suggestions}
        setDetailedSuggestions={setDetailedSuggestions}
      />
    </div>
  );
};

export default Details;
