import React from 'react';

function ObtainRubricNames({
  selected_rubric_id,
  setRubricID,
  rubrics,
  resetLabel,
}) {
  // const [rubrics, setRubrics] = useState(null);

  //Using useState to set the default value of DropDown Menu and declare the values

  const handleChange_rubric = event => {
    setRubricID(event.target.value);
    resetLabel();
  };

  console.log(process.env.REACT_APP_BASE_URL);
  if (rubrics)
    return (
      <select value={selected_rubric_id} onChange={handleChange_rubric}>
        {rubrics.map((rubric, key) => (
          <option value={rubric.id} key={key}>
            {rubric.name}
          </option>
        ))}
      </select>
    );
}

export default ObtainRubricNames;
