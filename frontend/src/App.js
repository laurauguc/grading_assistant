import logo from './images/logo.png';
import footer from './images/footer.png';
import React from 'react';
import GradeWithGemini from './components/GradeWithGemini';// './GradeWithGemini';
import ObtainRubricNames from './components/ObtainRubricNames'
import ViewGradingRubricDetails from './components/ViewGradingRubricDetails'
//import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
import {marked} from 'marked'
import {useState, useRef} from "react";

//import Markdown from "marked-react";


//const { useState } = React;

//const student_assignment = "Test student input"







function App() {
  const [selected_rubric_id, setRubricID] = useState(1);
  const [student_assignment, setStudentAssignment] = useState(null)
  // to collect the student assignment
  const student_assignment_submission = useRef()

  const add_assignment = (e) => {
    e.preventDefault()
    setStudentAssignment(student_assignment_submission.current.value);
  }

  return (
    <React.Fragment>

      <img src={logo} className="App-logo" alt="logo" height={120}/>
      <h1>Grading Assistant</h1>


      <h1>Home</h1>

      <h2>1) Insert student assignment</h2>

      <form onSubmit = {add_assignment}>
      <input ref={student_assignment_submission}/>
      <button>ADD</button>
      </form>

      <p>{student_assignment}</p>

      <h2>2) Select rubric</h2>

      <ObtainRubricNames
        selected_rubric_id = {selected_rubric_id}
        setRubricID = {setRubricID}/>

      <p>Selected rubric id: {selected_rubric_id}</p>

      <GradeWithGemini
        student_assignment = {student_assignment}
        rubric_id = {selected_rubric_id}/>

      <h1>Grading Rubric</h1>
      <ViewGradingRubricDetails rubric_id = {selected_rubric_id}/>



      <img src={footer} className="App-logo" alt="logo" height={200} />



    </React.Fragment>
  );
}

export default App;
