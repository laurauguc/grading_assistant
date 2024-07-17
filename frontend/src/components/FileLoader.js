import React, { useRef } from 'react';
import { MdUploadFile } from 'react-icons/md';

const FileLoader = () => {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async event => {
    const file = event.target.files[0];
    if (file) {
      await uploadFile(file);
    }
  };

  const uploadFile = async file => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/upload', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        console.log('File uploaded successfully');
      } else {
        console.error('File upload failed');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      {/* <button onClick={handleButtonClick}>Choose File and Upload</button> */}
      <MdUploadFile onClick={handleButtonClick} className="upload-icon" />
    </div>
  );
};

export default FileLoader;
