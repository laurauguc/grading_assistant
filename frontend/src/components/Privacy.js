import React from 'react';

const Privacy = () => {
  return (
    <div className="privacy">
      <h1>Privacy Statement for GradeMate</h1>
      <h2>
        <em>Effective Date: January 14, 2025</em>
      </h2>
      <p>
        Welcome to GradeMate! Your privacy is important to us. This Privacy
        Statement explains how we handle your information when you use our app.{' '}
      </p>

      <h2>Data Processing and Third-Party API Usage</h2>
      <p>
        When you use GradeMate, the text you input is sent to OpenAI to provide the app’s functionality.
        This data is used solely for processing your request and is not shared with any other
        parties.
      </p>
      <h2>OpenAI API</h2>
      <p>
        GradeMate utilizes the OpenAI's GPT models. The data you provide is transmitted to Open AI's API
        for processing as described in their privacy policy. We encourage you to review OpenaI’s
        privacy policy to understand how they handle your information:{' '}
        <a
          href="https://openai.com/enterprise-privacy/"
          target="_blank"
          rel="noreferrer"
        >
          OpenAI's Privacy Policy
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
