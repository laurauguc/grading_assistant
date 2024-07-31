import React from 'react';
import { Modal, Button } from 'antd';

const AboutUsModal = ({ isVisible, handleClose }) => {
  return (
    <Modal
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
      <h1>Welcome to GradeMate</h1>
      <p>
        Powered by Gemini, Google's advanced language model, we assist teachers
        and students with grading assignments and delivering personalized
        feedback.{' '}
      </p>
      <h1>Our Team </h1>
      <p>
        We are an international team of four students and professionals,
        passionate about technology and society. Our diverse backgrounds span
        the humanities, social sciences, and data science, enabling us to tackle
        the critical issue of unequal access to education through GradeMate.
      </p>{' '}
      <h1> Social Impact </h1>
      <p>
        GradeMate streamlines and enhances the grading process for writing
        assignments, which typically consumes about{' '}
        <a
          href="https://www.edweek.org/teaching-learning/heres-how-many-hours-a-week-teachers-work/2022/04"
          target="_blank"
          rel="noreferrer"
        >
          20% of teachers' work hours.
        </a>{' '}
        By utilizing GradeMate, teachers save valuable time and can provide
        students with more personalized feedback.
      </p>{' '}
      <h2>More Student Interaction </h2>
      <p>
        The value of a teacher's time is immeasurable. With more time freed up
        for personal interactions, teachers can positively influence their
        students' lives. As Nelson Mandela wisely stated, “Education is the most
        powerful weapon which you can use to change the world.” GradeMate
        empowers teachers to dedicate more time to these impactful engagements.
      </p>{' '}
      <h2>Addressing Educational Inequalities </h2>
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
        low-income, and immigrant students. GradeMate aims to bridge this gap by
        providing equitable access to quality feedback.
      </p>
      <h2>Tackling the Global Teacher Shortage</h2>
      <p>
        GradeMate enables teachers to manage larger student populations
        effectively, addressing the global teacher shortage.{' '}
        <a
          href="https://www.unesco.org/en/articles/global-report-teachers-what-you-need-know"
          target="_blank"
          rel="noreferrer"
        >
          {' '}
          UNESCO
        </a>{' '}
        estimates that to achieve universal primary and secondary education by
        2030, an additional 69 million teachers are needed. By enhancing
        efficiency, GradeMate supports teachers in meeting this critical demand
        and ensures that more students receive the education they deserve.
      </p>
      <h1>Environmental Impact </h1>
      <p>
        GradeMate encourages teachers to transition to digital assignment
        submissions, promoting a paperless environment and reducing the
        environmental impact associated with paper waste.
      </p>
      <h2>Paper Consumption in Schools</h2>{' '}
      <p>
        Schools use an average of 2,000 sheets of paper daily, amounting to
        320,000 sheets annually per school. With approximately 100,000 schools
        in the U.S., this results in the consumption of up to 32 billion sheets
        of paper each year (Record Nations) —just in the United States alone!
      </p>{' '}
      <h2>Environmental Consequences of Paper Use</h2>
      <ul>
        <li>
          Landfill Contribution: Paper and paperboard account for nearly 12% of
          landfill waste, making it the third-largest category of waste (US
          EPA).
        </li>
        <li>
          Industry Impact: The paper industry significantly contributes to
          deforestation, and consumes high amounts of water and energy, leading
          to substantial pollution (Record Nations) (US EPA).
        </li>
      </ul>
      <p>
        By promoting digital submissions, GradeMate helps mitigate these
        environmental issues, supporting a more sustainable and eco-friendly
        educational system.
      </p>
    </Modal>
  );
};

export default AboutUsModal;
