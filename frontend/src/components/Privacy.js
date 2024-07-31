import React from 'react';

const Privacy = () => {
  return (
    <div className="privacy">
      <h1>Privacy Statement for GradeMate.</h1>
      <h2>Effective Date: July 31, 2024</h2>
      <p>
        Welcome to GradeMate! Your privacy is important to us. This Privacy
        Statement explains how we handle your information when you use our app.{' '}
      </p>
      <ol>
        <li>No Data Collection </li>
        <p>
          {' '}
          We do not collect, store, or share any personal data from our users.
          When you use GradeMate, your activities and personal information
          remain private and secure.{' '}
        </p>
        <li>Use of Third-Party API</li>
        <p>
          {' '}
          GradeMate utilizes Google's Gemini API to enhance your experience.
          While we do not collect any data, Google's Gemini API may process data
          as described in their privacy policy. We encourage you to review
          Google’s privacy policy to understand how they handle your
          information:{' '}
          <ul>
            <li>
              {' '}
              <a
                href="https://www.google.com/url?q=https://ai.google.dev/gemini-api/terms%23paid-services&sa=D&source=docs&ust=1722463986689396&usg=AOvVaw1Hb_IfvR5lW5QH5Jvg7K5h"
                target="_blank"
                rel="noreferrer"
              >
                Google's Privacy Policy (see Paid Services)
              </a>
            </li>
          </ul>
        </p>
        <li> Changes to This Privacy Statement </li>
        <p>
          {' '}
          We may update this Privacy Statement from time to time. Any changes
          will be posted on this page, and the effective date will be updated
          accordingly. We encourage you to review this Privacy Statement
          periodically to stay informed about how we are protecting your
          privacy.
        </p>
        <li>Contact Us </li>
        <p>
          {' '}
          If you have any questions or concerns about this Privacy Statement,
          please contact us at Laura Uguccioni, l.uguccioni.s@gmail.com.{' '}
        </p>
      </ol>
      <p>Thank you for using GradeMate! </p>
      <p> GradeMate Team</p>
    </div>
  );
};
export default Privacy;
