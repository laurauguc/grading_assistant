import React from 'react';
import { Select } from 'antd';
import { ConfigProvider } from 'antd';

const { Option } = Select;

function ObtainRubricNames({
  selected_rubric_id,
  setRubricID,
  rubrics,
  resetLabel,
}) {
  //Using useState to set the default value of DropDown Menu and declare the values

  const handleChange_rubric = value => {
    if (value) {
      setRubricID(value);
      resetLabel();
    }
  };

  // console.log(process.env.REACT_APP_BASE_URL);

  if (rubrics)
    return (
      <div>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#ff7a00',
              borderRadius: '0px',
            },
          }}
          dropdownStyle={{ borderRadius: '5px' }}
        >
          <Select
            value={selected_rubric_id}
            onChange={handleChange_rubric}
            style={{
              width: '280px',
            }}
            className="custom-select"
            aria-label="Select a grading rubric"
          >
            {rubrics.map((rubric, key) => (
              <Option value={rubric.id} key={rubric.id}>
                {rubric.name}
              </Option>
            ))}
          </Select>
        </ConfigProvider>
      </div>
    );
}

export default ObtainRubricNames;
