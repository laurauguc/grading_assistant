import React from 'react';

const Privacy = () => {
  return (
    <div className="privacy">
      <h1>Privacy Statement for GradeMate</h1>
      <h2>
        <em>Effective Date: August 1, 2024</em>
      </h2>
      <p>
        Welcome to GradeMate! Your privacy is important to us. This Privacy
        Statement explains how we handle your information when you use our app.{' '}
      </p>

      <h2>Data Processing and Third-Party API Usage</h2>
      <p>
        When you use GradeMate, the text you input is sent to the Google Gemini
        API to provide the app’s functionality. This data is used solely for
        processing your request and is not stored or shared with any other
        parties.
      </p>
      <h2>Google Gemini API</h2>
      <p>
        GradeMate utilizes Google's Gemini API to enhance your experience. The
        data you provide is transmitted to Google's Gemini API for processing as
        described in their privacy policy. We encourage you to review Google’s
        privacy policy to understand how they handle your information:{' '}
        <a
          href="https://www.google.com/url?q=https://ai.google.dev/gemini-api/terms%23paid-services&sa=D&source=docs&ust=1722463986689396&usg=AOvVaw1Hb_IfvR5lW5QH5Jvg7K5h"
          target="_blank"
          rel="noreferrer"
        >
          Google's Privacy Policy (see Paid Services)
        </a>
      </p>
      <h2>Changes to This Privacy Statement</h2>
      <p>
        We may update this Privacy Statement from time to time. Any changes will
        be posted on this page, and the effective date will be updated
        accordingly. We encourage you to review this Privacy Statement
        periodically to stay informed about how we are protecting your privacy.
      </p>
      <h2>Contact Us</h2>
      <p>
        If you have any questions or concerns about this Privacy Statement,
        please contact us at Laura Uguccioni, l.uguccioni.s@gmail.com.
      </p>
      <p>Thank you for using GradeMate!</p>
      <p>
        <em>GradeMate Team</em>
      </p>
    </div>
  );
};
export default Privacy;
