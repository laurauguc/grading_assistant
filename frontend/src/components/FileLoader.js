import React, { useEffect, useRef, useState } from 'react';
import { MdUploadFile } from 'react-icons/md';
import configData from '../config.json';
import axios from 'axios';

const FileLoader = ({
  setRubricMarkdown,
  rubricMarkdownFileName,
  setRubricMarkdownFileName,
}) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (file) {
      uploadCustomRubricFile();
    }
  }, [file]);

  const handleFileChange = event => {
    setFile(event.target.files[0]);
    setRubricMarkdownFileName(event.target.files[0].name);
    console.log('1', event.target.files[0]);
  };

  const uploadCustomRubricFile = () => {
    // if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    setLoading(true);

    const BASE_URL =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:8000/'
        : configData['SERVER_URL'];

    const headers = {
      'Content-Type': 'multipart/form-data',
    };
    console.log('3', formData.getAll('file'));

    axios
      .post(BASE_URL.concat('api/convert-docx-to-md/'), formData, headers)
      .then(response => {
        setRubricMarkdown(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="load">
      <label>Or load your own:</label>
      <input
        type="file"
        id="file-upload"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <label htmlFor="file-upload" className="upload-label">
        <MdUploadFile className="upload-icon" />
      </label>
      {loading && <p>Uploading...</p>}
      {<p className="filename">{rubricMarkdownFileName}</p>}
    </div>
  );
};

export default FileLoader;
