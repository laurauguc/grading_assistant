import React, { useEffect, useState } from 'react';
import { MdUploadFile } from 'react-icons/md';
import configData from '../config.json';
import axios from 'axios';

const FileLoader = ({
  setRubricMarkdown,
  rubricMarkdownFileName,
  setRubricMarkdownFileName,
}) => {
  const [file, setFile] = useState(null);

  useEffect(() => {
    const storedFileName = localStorage.getItem('rubricMarkdownFileName');
    if (storedFileName) {
      setRubricMarkdownFileName(storedFileName);
    }
  }, [setRubricMarkdownFileName]);

  useEffect(() => {
    if (file) {
      uploadCustomRubricFile();
    }
  }, [file]);

  const handleFileChange = event => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    const fileName = selectedFile.name;
    setRubricMarkdownFileName(fileName);
    localStorage.setItem('rubricMarkdownFileName', fileName);
  };

  const uploadCustomRubricFile = () => {
    // if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

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
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="load">
      <label>Or load your own. Formats accepted: docx</label>
      <input
        type="file"
        id="file-upload"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <label htmlFor="file-upload" className="upload-label">
        <MdUploadFile className="upload-icon" />
      </label>

      {rubricMarkdownFileName && (
        <p className="filename">
          Successfully loaded: {rubricMarkdownFileName}
        </p>
      )}
    </div>
  );
};

export default FileLoader;
