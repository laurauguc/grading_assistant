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
                <span className="boldLight">Dear Teacher,</span>
              </p>
              <p>
                We hope you enjoy using <span className="boldLight">GradeMate</span> and that it supports you in providing faster, more meaningful formative feedback to your students.
                While this tool offers many benefits, it's essential to understand its limitations and use it responsibly.
              </p>
              <p>
                <span className="boldLight">To use responsibly, you must always review and critically evaluate any AI-generated output before using it with students. The teacher is ultimately responsible for ensuring that all feedback and grades are accurate, fair, and appropriate.</span>
              </p>
              <h3>⚠️ Limitations</h3>
              <p>
                <span className="boldLight">GradeMate</span> uses generative AI (GenAI) to assist with writing feedback. It is designed to act as a <span className="boldLight">creative assistant</span>, offering helpful suggestions and feedback ideas. However, it is <span className="boldLight">not a substitute</span> for professional judgment.
              </p>
              <p>
                Please keep the following in mind when using GradeMate:
              </p>
              <ul>
                <li>GenAI produces text that may appear human-like but lacks true understanding.</li>
                <li>Outputs can sometimes be inaccurate or misleading.</li>
                <li>Responses may reflect dominant cultural perspectives and underrepresent minority voices.</li>
                <li>Some content may unintentionally reinforce stereotypes or biases.</li>
              </ul>
              <p>
                <em>
                  Adapted from UNESCO’s <a href="https://unesdoc.unesco.org/ark:/48223/pf0000386693" target="_blank">
                    Guidance for generative AI in education and research</a>.<br />
                </em>
              </p>

              <i>
                <p style={{ textAlign: 'right' }}>GradeMate Team</p>
              </i>
            </div>
          )}
          {role === 'student' && (
            <div>
              <p>
                <span className="boldLight">Dear Student,</span>
              </p>
              <p>
                Welcome to <span className="boldLight">GradeMate</span>! This tool is designed to help you get an early round of feedback on your writing by using generative AI (GenAI).
                It can suggest ideas to improve clarity, organization, and style—helping you strengthen your work before submitting it.
              </p>

              <h3>⚠️ Use Responsibly</h3>

              <p>
                Please remember: <span className="boldLight">GradeMate is not a substitute for your teacher’s feedback.</span>
                It is a creative assistant, not a grading tool or final authority.
                AI-generated suggestions can be helpful, but they can also be
                <span className="boldLight">inaccurate, overly general, or even misleading.</span>
              </p>

              <p>
                Always take AI feedback with a critical eye:
              </p>
              <ul>
                <li>Not everything it says is correct—think carefully about what makes sense for your writing.</li>
                <li>Your teacher's feedback should <span className="boldLight">always take priority</span> over what the AI suggests.</li>
                <li>AI tools like this one can reflect common or dominant perspectives and might miss alternative or diverse voices.</li>
                <li>Sometimes the feedback may unintentionally reinforce stereotypes or assumptions.</li>
              </ul>

              <p>
                These limitations are part of why <span className="boldLight">AI should never replace human judgment</span>—especially when it comes to your learning.
              </p>
              <p>
              Additionally, you are expected to use this tool in accordance with your school’s academic integrity and technology use policies.
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
                <span className="boldLight">For more information on the responsible use of generative AI in education and research, visit:</span><br />
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
