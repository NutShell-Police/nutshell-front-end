import React, { useState } from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const VideoUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');
  const theme = useTheme();

  const onDrop = (acceptedFiles) => {
    setSelectedFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'video/mp4'
  });

  const handleSubmit = async () => {
    if (!selectedFile) {
      setMessage('Please select a video file first');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://localhost:5000/upload_video', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage(response.data.accident_detected ? 'Accident Detected' : 'No Accident Detected');
    } catch (error) {
      console.error('Error uploading video', error);
      setMessage('Error uploading video');
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Upload Video to Detect Accident</Typography>
      <Box
        {...getRootProps()}
        sx={{
          border: '2px dashed',
          borderColor: isDragActive ? theme.palette.primary.main : theme.palette.grey[400],
          borderRadius: 2,
          p: 4,
          textAlign: 'center',
          cursor: 'pointer',
          mb: 2
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <Typography variant="body1" color="primary">Drop the files here ...</Typography>
        ) : (
          <Typography variant="body1" color="textSecondary">
            Drag 'n' drop a video file here, or click to select a file
          </Typography>
        )}
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={!selectedFile}
      >
        Submit
      </Button>
      {message && (
        <Typography
          variant="body1"
          color={message.includes('Accident') ? 'error' : 'primary'}
          sx={{ mt: 2 }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default VideoUpload;
