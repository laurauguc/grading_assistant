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

        GradeMate leverages cutting-edge advancements in Artificial Intelligence to assist teachers and
        students with grading writing assignments and delivering personalized feedback. Our mission is
        to alleviate teacher burnout and shortages by streamlining and enhancing this time-intensive task.

      </p>
      <h2>Our Team </h2>
      <p>

        We are a dedicated team of professionals passionate about technology, society, and AI ethics,
        supported by Columbia University's QMSS Innovation Lab. Our diverse expertise spans the humanities,
        social sciences, and data science, empowering us to {' '}
        <span className="boldLight">
          tackle the critical issue of unequal access to education through GradeMate.
        </span>
      </p>{' '}
      <h2> Benefits of AI-Supported Grading</h2>
      <p>
      Grading writing assignments consumes nearly{' '}<a
        href="https://www.edweek.org/teaching-learning/heres-how-many-hours-a-week-teachers-work/2022/04"
        target="_blank"
        rel="noreferrer"
      >
        20% of teachers' work hours
      </a>. GradeMate optimizes this task, saving teachers valuable time, while also enabling them to provide
      students with more comprehensive feedback.

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
            A teacher’s time is invaluable. By supporting grading tasks, GradeMate frees up teachers to engage more
            directly with their students. As Nelson Mandela once said, “Education is the most powerful weapon which
            you can use to change the world.” GradeMate ensures teachers have <span className="boldLight">more time to
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
            With the help of a brainstorming and analytical companion, teachers can provide more in-depth and specific feedback
            on writing assignments. This feedback can highlight strengths, identify areas for improvement, and include reasoning
            and illustrative examples. In future versions of GradeMate, teachers will also benefit from additional writing support
            for their personalized feedback, with features like "Rewrite with AI," "Connect to study materials," and "Add examples" to further refine and enhance their comments.
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
          low-income, and immigrant students. GradeMate aims to{' '}
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
          GradeMate enables teachers to manage larger student populations
          effectively, addressing the{' '}
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
          GradeMate supports teachers in{' '}
          <span className="boldLight">meeting this critical demand</span> and
          ensures that more students receive the education they deserve.
        </p>
        </div>
      </div>


    </Modal>
  );
};

export default AboutUsModal;
