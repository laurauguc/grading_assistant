import React, { useState } from 'react';
import { Flex, Radio, ConfigProvider } from 'antd';

const Tips = () => {
  const [role, setRole] = useState('teacher');
  const handleRoleChange = e => {
    setRole(e.target.value); // Update selected role when radio button changes
  };
  return (
    <div className={'detailed_container ' + 'main_container'}>
      <div>
        <div className="flex-row-center">
          <h2>I am a</h2>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#FFC107',
                borderRadius: 6,
              },
            }}
          >
            <Flex vertical gap="middle">
              <Radio.Group
                defaultValue="teacher"
                size="large"
                onChange={handleRoleChange}
              >
                <Radio.Button value="teacher">Teacher</Radio.Button>
                <Radio.Button value="student">Student</Radio.Button>
              </Radio.Group>
            </Flex>
          </ConfigProvider>
        </div>
        <div className={'border ' + 'tips'}>
          {role === 'teacher' && (
            <div>
              <p>
                <strong>Dear Teacher,</strong>
              </p>
              <p>
                We hope you enjoy using GradeMate. To help you get the most out
                of this tool, we’d like to share some practical tips:
              </p>
              <ul>
                <li>
                  <strong>Understand the App’s Limitations:</strong>
                  <ul>
                    <li>
                      <strong>Be Aware of Hallucinations: </strong> GradeMate is
                      powered by Google’s Gemini, an Artificial Intelligence
                      model. As is common with these types of models, it may
                      sometimes generate incorrect or irrelevant information
                      that look feasible (“hallucinations”). Always review the
                      grades and feedback provided by the app to ensure accuracy
                      and relevance.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Personalize the Feedback: </strong>
                  <ul>
                    <li>
                      <strong>Tailor Output to the Student: </strong> Use your
                      knowledge of your students to adjust the app's output to
                      better suit their individual needs and context.
                    </li>
                    <li>
                      <strong>Customize GradeMate: </strong> Utilize the
                      'Additional Instructions' settings to fine-tune the
                      grading process according to your specific requirements.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Use Precise Grading Rubrics:</strong>
                  <ul>
                    <li>
                      <strong>Ensure Grading Consistency: </strong> When using
                      custom rubrics, upload rubrics with clear criteria and
                      grading scales to maintain consistency.
                    </li>
                    <li>
                      <strong>Heuristic Approach: </strong> Think of GradeMate
                      as a "fresh college grad." Does it have all the necessary
                      inputs to grade consistently? (Source: borrowed heuristic
                      from Andrew Ng’s discussion on the capabilities of
                      Artificial Intelligence models similar to Gemini, called
                      Large Language Models)
                    </li>
                  </ul>
                </li>
              </ul>
              <p>
                We hope this tool helps improve your grading experience, save
                time, and allow you to focus on personalized teaching and
                student interactions.
              </p>
            </div>
          )}
          {role === 'student' && (
            <div>
              <p>
                <strong>Dear Student,</strong>
              </p>
              <p>
                We hope you find GradeMate useful for improving your writing
                skills and preparing for exams. To help you get the most out of
                this tool, we’d like to share some practical tips:
              </p>
              <ul>
                <li>
                  <strong>Understand the App’s Limitations:</strong>
                  <ul>
                    <li>
                      <strong>Be Aware of Hallucinations: </strong> GradeMate is
                      powered by Google’s Gemini, an Artificial Intelligence
                      model. As is common with these types of models, it may
                      sometimes generate incorrect or irrelevant information
                      that look feasible (“hallucinations”). Always review the
                      grades and feedback provided by the app to ensure accuracy
                      and relevance.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Keep Learning:</strong>
                  <ul>
                    <li>
                      <strong>Iterate and Improve: </strong> Submit drafts to
                      GradeMate to receive feedback, make revisions, and improve
                      your work.
                    </li>
                    <li>
                      <strong>Peer Review: </strong> Collaborate with classmates
                      by sharing rubrics and feedback, engaging in peer reviews
                      to foster a collaborative learning environment.
                    </li>
                    <li>
                      <strong>Consult with a Teacher: </strong> When in doubt,
                      always consult with a teacher for additional guidance.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Use Relevant Grading Rubrics: </strong>
                  <ul>
                    <li>
                      <strong>Identify or Load Custom Rubrics: </strong>Use a
                      rubric that meets your study needs, whether you’re
                      studying for the GRE or TOEFL Writing section, or
                      preparing for in-class writing assignments.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Academic Integrity:</strong>
                  <ul>
                    <li>
                      <strong>Follow Your School’s AI Policy: </strong> Please
                      check with your teacher about any restrictions on
                      leveraging AI for your assignments.
                    </li>
                  </ul>
                </li>
              </ul>
              <p>We hope this tool improves your study experience!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tips;
