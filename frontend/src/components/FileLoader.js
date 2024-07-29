import React, { useEffect, useState } from 'react';
import { MdUploadFile } from 'react-icons/md';
import configData from '../config.json';
import axios from 'axios';

const FileLoader = ({
  setRubricMarkdown,
  rubricMarkdownFileName,
  setRubricMarkdownFileName,
  resetLabel,
}) => {
  const [file, setFile] = useState(null);
  const [fileTypeError, setFileTypeError] = useState(false);

  useEffect(() => {
    if (resetLabel) {
      localStorage.removeItem('rubricMarkdownFileName');
    }
  }, [resetLabel]);

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

    if (selectedFile && selectedFile.name.endsWith('.docx')) {
      setFile(selectedFile);
      const fileName = selectedFile.name;
      setRubricMarkdownFileName(fileName);
      localStorage.setItem('rubricMarkdownFileName', fileName);
      setFileTypeError(false);
      event.target.value = null;
    } else {
      setFile(null);
      setFileTypeError(true);
    }
  };

  const uploadCustomRubricFile = () => {
    const formData = new FormData();
    formData.append('file', file);

    const BASE_URL =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:8000/'
        : configData['SERVER_URL'];

    const headers = {
      'Content-Type': 'multipart/form-data',
    };

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
      <p>Load your own grading rubric: </p>
      <label htmlFor="file-upload" className="upload-label">
        <MdUploadFile className="upload-icon" />
      </label>
      <p style={{ fontSize: 15 }}> (Formats accepted: docx)</p>

      <input
        type="file"
        id="file-upload"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      {rubricMarkdownFileName && (
        <p className="filename">
          Successfully loaded: {rubricMarkdownFileName}
        </p>
      )}
      {fileTypeError && (
        <p className="error">
          Currently, we only support custom rubrics in the .docx format. Please
          load the rubric in the correct format and try again.
        </p>
      )}
    </div>
  );
};

export default FileLoader;
