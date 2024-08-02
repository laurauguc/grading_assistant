import React from 'react';
import { Modal, Button } from 'antd';

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
        Powered by Gemini, Google's advanced language model, we assist teachers
        and students with grading assignments and delivering personalized
        feedback.
      </p>
      <h2>Our Team </h2>
      <p>
        We are an international team of four students and professionals,
        passionate about technology and society. Our diverse backgrounds span
        the humanities, social sciences, and data science, enabling us to{' '}
        <span className="boldLight">
          tackle the critical issue of unequal access to education through
          GradeMate.
        </span>
      </p>{' '}
      <h2> Social Impact </h2>
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
      <h3>More Student Interaction </h3>
      <p>
        The value of a teacher's time is immeasurable. With{' '}
        <span className="boldLight">
          more time freed up for personal interactions
        </span>
        , teachers can positively influence their students' lives. As Nelson
        Mandela wisely stated, “Education is the most powerful weapon which you
        can use to change the world.” GradeMate empowers teachers to dedicate
        more time to these impactful engagements.
      </p>{' '}
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
      <h2>Environmental Impact </h2>
      <p>
        GradeMate encourages teachers to transition to digital assignment
        submissions,{' '}
        <span className="boldLight"> promoting a paperless environment</span>{' '}
        and reducing the environmental impact associated with paper waste.
      </p>
      <h3>Paper Consumption in Schools</h3>{' '}
      <p>
        Schools use an average of 2,000 sheets of paper daily, amounting to
        320,000 sheets annually per school. With approximately 100,000 schools
        in the U.S., this results in the consumption of up to 32 billion sheets
        of paper each year (Record Nations) —just in the United States alone!
      </p>{' '}
      <h3>Environmental Consequences of Paper Use</h3>
      <ul>
        <li>
          <span className="boldLight">Landfill Contribution: </span> Paper and
          paperboard account for nearly 12% of municipal solid waste landfill,
          the third-largest category of waste (
          <a
            href="https://www.epa.gov/facts-and-figures-about-materials-waste-and-recycling/national-overview-facts-and-figures-materials"
            target="_blank"
            rel="noreferrer"
          >
            US EPA
          </a>
          ).
        </li>
        <li>
          <span className="boldLight"> Industry Impact: </span> The paper
          industry significantly contributes to deforestation, and consumes high
          amounts of water and energy, leading to substantial pollution (
          <a
            href="https://kunakair.com/environmental-impact-paper-industry/"
            target="_blank"
            rel="noreferrer"
          >
            Kunak
          </a>
          ).
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
