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
          <h2 id="role-heading">I am a</h2>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '535676',
                borderRadius: 6,
                borderRadius: '0px',
              },
            }}
          >
            <Flex vertical gap="middle">
              <Radio.Group
                defaultValue="teacher"
                size="large"
                onChange={handleRoleChange}
                aria-labelledby="role-heading"
              >
                <Radio.Button value="teacher">Teacher</Radio.Button>
                <Radio.Button value="student">Student</Radio.Button>
              </Radio.Group>
            </Flex>
          </ConfigProvider>
        </div>
        <div className={'tips'}>
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
                      <strong>Be Aware of “Hallucinations”: </strong> GradeMate
                      is powered by Google’s Gemini, a type of Artificial
                      Intelligence model called a Large Language Model (LLM). As
                      is common with LLMs, it may sometimes generate incorrect
                      or irrelevant information that looks feasible (called
                      “hallucinations” in AI jargon). Always review the grades
                      and feedback provided by the app to ensure accuracy and
                      relevance.
                    </li>
                    <li>
                      <strong>College Graduate Analogy: </strong> Think of
                      GradeMate as a “fresh college grad.” As a recent college
                      graduate, GradeMate has general background knowledge but
                      does not have specialized training in your subject. It
                      also has no memory of previous assignments (think of a
                      different college grad grading each assignment).
                      Therefore, expect some variations in grading and
                      limitations in uncovering specialized ideas and concepts
                      (such as a poem with intricate hidden meanings and
                      intentional but subtle misuse of conventions; though
                      sometimes it can interpret these). In other words,
                      GradeMate can effectively apply the poetry grading rubric
                      to a high school poem but is more limited in discovering
                      the brilliance in T.S. Eliot’s poems.{' '}
                      <i>
                        (Note: The “fresh college grad” mental model was
                        borrowed from{' '}
                        <a
                          href="https://www.coursera.org/learn/generative-ai-for-everyone/lecture/VYXx5/what-llms-can-and-cannot-do"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Andrew Ng’s discussion on the capabilities and
                          limitations of LLMs
                        </a>
                        ).
                      </i>
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Personalize the Feedback:</strong>
                  <ul>
                    <li>
                      <strong>Tailor Output to the Student: </strong> Use your
                      knowledge of your students to adjust the app's output to
                      better suit their individual needs and context.
                    </li>
                    <li>
                      <strong>Customize GradeMate: </strong> Utilize the
                      'Additional Instructions’ settings (step 3 in Home tab) to
                      calibrate the grading process according to your specific
                      requirements.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Use Precise Grading Rubrics:</strong>
                  <ul>
                    <li>
                      <strong>Ensure Grading Consistency </strong> When using
                      custom rubrics, upload rubrics with clear criteria and
                      grading scales to maintain consistency.
                    </li>
                  </ul>
                </li>
              </ul>
              <p>
                We hope this tool helps improve your grading experience, save
                time, and allow you to focus on personalized teaching and
                student interactions.
              </p>
              <i>
                <p style={{ textAlign: 'right' }}>GradeMate Team</p>
              </i>
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
                      <strong>Be Aware of “Hallucinations”: </strong> GradeMate
                      is powered by Google’s Gemini, a type of Artificial
                      Intelligence model called a Large Language Model (LLM). As
                      is common with LLMs, it may sometimes generate incorrect
                      or irrelevant information that looks feasible (called
                      “hallucinations” in AI jargon). So, take the feedback with
                      a grain of salt!
                    </li>
                    <li>
                      <strong>College Graduate Analogy: </strong> Think of
                      GradeMate as a “fresh college grad.” As a recent college
                      graduate, GradeMate has general background knowledge but
                      does not have specialized training in your subject. It
                      also has no memory of previous assignments (think of a
                      different college grad grading each assignment).
                      Therefore, expect some variations in grading and
                      limitations in uncovering advanced ideas and concepts
                      (such as a poem with intricate hidden meanings and
                      intentional but subtle misuse of conventions; though
                      sometimes it can interpret these). So, take the feedback
                      only as a second pair of eyes, and examine it critically.{' '}
                      <i>
                        (Note: The “fresh college grad” mental model was
                        borrowed from{' '}
                        <a
                          href="https://www.coursera.org/learn/generative-ai-for-everyone/lecture/VYXx5/what-llms-can-and-cannot-do"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Andrew Ng’s discussion on the capabilities and
                          limitations of LLMs
                        </a>
                        ).
                      </i>
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
              <i>
                <p style={{ textAlign: 'right' }}>GradeMate Team</p>
              </i>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tips;
