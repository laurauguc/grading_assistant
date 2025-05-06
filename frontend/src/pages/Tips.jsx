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
                We hope you enjoy using <strong>GradeMate</strong> and that it supports you in providing faster, more meaningful formative feedback to your students.
                While this tool offers many benefits, it's essential to understand its limitations and use it responsibly.
              </p>

              <h3>⚠️ Responsible Use</h3>
              <p>
                <strong>GradeMate</strong> uses generative AI (GenAI) to assist with writing feedback. It is designed to act as a <strong>creative assistant</strong>, offering helpful suggestions and feedback ideas. However, it is <strong>not a substitute</strong> for professional judgment.
              </p>
              <p>
                <strong>You must always review and critically evaluate any AI-generated feedback before using it with students.</strong> The teacher is ultimately responsible for ensuring that all feedback and grades are accurate, fair, and appropriate.
              </p>
              <ul>
                <li>GenAI produces text that may appear human-like but lacks true understanding.</li>
                <li>Outputs can sometimes be inaccurate or misleading.</li>
                <li>Responses may reflect dominant cultural perspectives and underrepresent minority voices.</li>
                <li>Some content may unintentionally reinforce stereotypes or biases.</li>
              </ul>
              <p>
                <small><em>
                  Adapted from UNESCO’s guidance on the use of generative AI in education.<br />
                  Source: <a href="https://unesdoc.unesco.org/ark:/48223/pf0000386693" target="_blank" rel="noreferrer">unesdoc.unesco.org</a>
                </em></small>
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
                Welcome to <strong>GradeMate</strong>! This tool is designed to help you get an early round of feedback on your writing by using generative AI (GenAI).
                It can suggest ideas to improve clarity, organization, and style—helping you strengthen your work before submitting it.
              </p>

              <h3>⚠️ Use Responsibly</h3>

              <p>
                Please remember: <strong>GradeMate is not a substitute for your teacher’s feedback.</strong>
                It is a creative assistant, not a grading tool or final authority.
                AI-generated suggestions can be helpful, but they can also be
                <strong>inaccurate, overly general, or even misleading.</strong>
              </p>

              <p>
                Always take AI feedback with a critical eye:
              </p>
              <ul>
                <li>Not everything it says is correct—think carefully about what makes sense for your writing.</li>
                <li>Your teacher's feedback should <strong>always take priority</strong> over what the AI suggests.</li>
                <li>AI tools like this one can reflect common or dominant perspectives and might miss alternative or diverse voices.</li>
                <li>Sometimes the feedback may unintentionally reinforce stereotypes or assumptions.</li>
              </ul>

              <p>
                These limitations are part of why <strong>AI should never replace human judgment</strong>—especially when it comes to your learning.
              </p>

              <h3>🤝 Your Learning Journey</h3>

              <p>
                GradeMate is here to help you reflect and revise. Use it to get ideas, identify patterns in your writing, and prepare thoughtful questions for your teacher.
                The best writing comes from real conversations, practice, and feedback from people who know you and your goals.
              </p>

              <p>
                This tool is part of a broader, open-source project to explore how AI can support learning when used ethically, transparently, and with care.
              </p>

              <p>
                <strong>For more information on the responsible use of generative AI in education and research, visit:</strong><br />
                <a href="https://unesdoc.unesco.org/ark:/48223/pf0000386693" target="_blank">
                  UNESCO: Guidance for generative AI in education and research
                </a>
              </p>
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
