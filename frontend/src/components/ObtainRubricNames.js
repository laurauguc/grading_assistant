import React, { useState, useEffect } from 'react';
import configData from "../config.json";

function ObtainRubricNames({ selected_rubric_id, setRubricID }) {
  const [rubrics, setRubrics] = useState(null);

  //Using useState to set the default value of DropDown Menu and declare the values

  const handleChange_rubric = event => {
    setRubricID(event.target.value);
  };

  var BASE_URL;
  if (process.env.NODE_ENV === 'development') {
    BASE_URL = 'http://localhost:8000/'
  } else {
    BASE_URL = configData['SERVER_URL'];
  }

  useEffect(() => {
    fetch(BASE_URL.concat('api/obtain-rubric-names/')) // 'http://localhost:8000/api/obtain-rubric-names/') // alternative: {params: {student_assignment: props.student_assignment, grading_rubric: props.grading_rubric}}
      .then(rubric_response => rubric_response.json())
      .then(setRubrics)
      .catch(error => {
        console.log(error);
      });
  }, []);

  console.log(process.env.REACT_APP_BASE_URL)
  if (rubrics)
    return (
      <select value={selected_rubric_id} onChange={handleChange_rubric}>
        {rubrics.map(rubric => (
          <option value={rubric.id}>{rubric.name}</option>
        ))}
      </select>
    );
}

export default ObtainRubricNames;
