import React from 'react';
import { Modal, Button } from 'antd';
import interaction_image from '../images/aboutUs_interaction.png';
import feedback_image from '../images/aboutUs_feedback.png';
import inequalities_image from '../images/aboutUs_inequalities.png';
import teacher_shortage_image from '../images/aboutUs_teacher_shortage.png';

const AboutUsModal = ({ isVisible, handleClose }) => {
  return (
    <Modal
      className="modalText"
      // title="Welcome to GradeMate"
      visible={isVisible}
      onOk={handleClose}
      onCancel={handleClose}
      width="60%"
      footer={[
        <button key="back" onClick={handleClose} className="close-button">
          Close
        </button>,
      ]}
    >
      <h1>Welcome to GradeMate.</h1>
      <p>
        GradeMate harnesses cutting-edge advancements in Artificial Intelligence to support teachers and students in grading writing assignments and delivering personalized feedback. Our mission is to reduce teacher burnout and mitigate shortages by streamlining one of the most time-consuming tasks in education.
      </p>
      <p><strong>Important:</strong> GradeMate is not a substitute for human judgment. Teachers must critically evaluate all AI-generated feedback before using it with students. (<em>See the RESPONSIBLE USE tab for more details.</em>)</p>

      <h2>💡 Our Vision & the Current State of AI in Education</h2>
      <p>No current AI tool is suitable for fully automated grading due to the limitations outlined in the RESPONSIBLE USE tab. <strong>Human oversight and final judgment remain essential.</strong></p>
      <p>In the future, AI may support limited forms of automated grading—for example, in basic or diagnostic assessments—but such use must be approached with caution. Any implementation must be guided by:</p>
      <ul>
        <li>Transparency</li>
        <li>Research-based practices</li>
        <li>Fairness and accountability</li>
        <li>Environmental responsibility</li>
        <li>Student rights to review and appeal</li>
      </ul>
      <p>
        This open-source project—<a href="https://github.com/laurauguc/grading_assistant" target="_blank" rel="noopener noreferrer">available here</a>—aims to spark conversation around the future of AI in grading, its limitations, and ethical use. This work began at the <strong>Quantitative Methods in the Social Sciences Innovation Lab</strong> and we hope to expand collaboration with the wider research and educational community.
        We welcome you to engage in discussions at this <a href="https://github.com/laurauguc/grading_assistant/discussions" target="_blank" rel="noopener noreferrer"> link</a>.
      </p>


      <h2>👥 Our Team</h2>
      <p>
        We are a passionate team of students and professionals brought together through Columbia University’s Quantitative Methods in the Social Sciences Innovation Lab. Our diverse backgrounds in the humanities, social sciences, and data science enable us to tackle educational inequality with an interdisciplinary approach.
      </p>

      <h2>⚠️ Risks of AI-Supported Grading</h2>
      <p>
        AI-supported grading is not the same as automated grading—it is a <strong>teacher-led</strong> process. However, educators must be aware of potential risks:
      </p>
      <ul>
        <li><strong>Moral Deskilling:</strong> Overreliance on AI outputs can cause teachers to disengage from the ethical and reflective aspects of their feedback responsibilities.</li>
        <li><strong>Bias and Marginalization:</strong> Large Language Models (LLMs) are trained on dominant linguistic patterns. As a result, they may unintentionally reinforce stereotypes and overlook or penalize minority or subtle perspectives.</li>
        <li><strong>Inaccurate Outputs:</strong> AI-generated content may include plausible but incorrect information—often called “hallucinations.” However, this term can be misleading, as it anthropomorphizes AI and implies reasoning or understanding where none exists.</li>
      </ul>
      <h2>🌟 Benefits of AI-Supported Grading</h2>
      <p>
      Grading writing assignments consumes nearly{' '}<a
        href="https://www.edweek.org/teaching-learning/heres-how-many-hours-a-week-teachers-work/2022/04"
        target="_blank"
        rel="noreferrer"
      >
        20% of teachers' work hours
      </a>. AI-supported grading aims to optimize this task, saving teachers valuable time, while also enabling them to provide
      students with more comprehensive formative feedback.

      </p>{' '}



      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
        <img
          src={interaction_image}
          alt="About Us"
          style={{ width: '40%', borderRadius: '4px' }}
        />
        <div>
          <h3>Fostering Teacher-Student Interaction</h3>
          <p>
            A teacher’s time is invaluable. Supporting grading tasks frees up teachers to engage more
            directly with their students. As Nelson Mandela once said, “Education is the most powerful weapon which
            you can use to change the world.” The aim is allow teachers have <span className="boldLight">more time to
            focus on the interactions that shape students' lives.</span>
          </p>
        </div>
      </div>
      <p></p>

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
        <img
          src={feedback_image}
          alt="About Us"
          style={{ width: '40%', borderRadius: '4px' }}
        />
        <div>
          <h3>Enhancing Writing Feedback</h3>
          <p>
            With the support of AI-supported grading tools that include feedback, teachers can provide more in-depth and specific feedback
            on writing assignments. This feedback can highlight strengths, identify areas for improvement, and include reasoning
            and illustrative examples. Ideally, feedback tools would not reccomend feedback, but also work with the teacher to enhance
            their insights, with features like "Rewrite with AI," "Connect to study materials," and "Add examples" to further refine and enhance their comments.
          </p>
        </div>
      </div>
      <p></p>


      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
        <img
          src={inequalities_image}
          alt="About Us"
          style={{ width: '40%', borderRadius: '4px' }}
        />
        <div>
        <h3>Addressing Educational Inequalities </h3>
        <p>
          Underprivileged schools often lack access to personalized writing
          feedback. According to the{' '}
          <a
            href="https://www.apa.org/pi/ses/resources/publications/education#:~:text=Schools%20with%20students%20from%20the,,%20&%20Dickinson,%202011"
            target="_blank"
            rel="noreferrer"
          >
            American Psychological Association
          </a>
          , schools in high-poverty areas have fewer library resources, less
          staff, limited hours, and less experienced personnel compared to those
          in middle-income areas. A survey by the{' '}
          <a
            href="https://www.google.com/url?q=https://www.uft.org/news/press-releases/more-300000-nyc-students-high-need-schools-stuck-oversized-classes&sa=D&source=docs&ust=1722461155028437&usg=AOvVaw2BlZRb4ui_R8VX4kWCJso9"
            target="_blank"
            rel="noreferrer"
          >
            United Federation of Teachers
          </a>{' '}
          reveals that over 300,000 students in New York City's high-need schools
          are in oversized classes, disproportionately affecting Black, Brown,
          low-income, and immigrant students. AI-supported grading aims to{' '}
          <span className="boldLight">
            bridge this gap by providing equitable access
          </span>{' '}
          to quality feedback.
        </p>
        </div>
      </div>
      <p></p>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
        <img
          src={teacher_shortage_image}
          alt="About Us"
          style={{ width: '40%', borderRadius: '4px' }}
        />
        <div>
        <h3>Tackling the Global Teacher Shortage</h3>
        <p>
          AI-supported grading enables teachers to manage larger student populations, thereby aiding in addressing the{' '}
          <span className="boldLight">global teacher shortage</span>.{' '}
          <a
            href="https://www.unesco.org/en/articles/global-report-teachers-what-you-need-know"
            target="_blank"
            rel="noreferrer"
          >
            {' '}
            UNESCO
          </a>{' '}
          estimates that{' '}
          <span className="boldLight">
            {' '}
            to achieve universal primary and secondary education by 2030
          </span>
          , an additional 69 million teachers are needed. By enhancing efficiency,
          AI-supported grading supports teachers in{' '}
          <span className="boldLight">meeting this critical demand</span> and
          ensures that more students receive the education they deserve.
        </p>
        </div>
      </div>


    </Modal>
  );
};

export default AboutUsModal;
