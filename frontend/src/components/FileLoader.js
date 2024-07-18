import React, { useRef, useState } from 'react';
import { MdUploadFile } from 'react-icons/md';
import configData from '../config.json';
import axios from 'axios';

const FileLoader = ({ setRubricMarkdown }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = event => {
    setFile(event.target.files[0]);
    handleFileUpload(event.target.files[0]);
    console.log('1', event.target.files[0]);
  };

  const handleFileUpload = () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    console.log('2', file);
    setLoading(true);

    const BASE_URL =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:8000/'
        : configData['SERVER_URL'];

    axios
      .get(BASE_URL.concat('api/convert-docx-to-md/'), formData)
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
      {file && !loading && <p className="filename">{file.name}</p>}
    </div>
  );
};

export default FileLoader;
