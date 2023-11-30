/* eslint-disable jsx-a11y/media-has-caption */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, Link } from '@mui/material';
import axios from 'axios';
import ReactPlayer from 'react-player';
import { getSttData, sttSelectors } from '../store/sttSlice';
import STTUploadTable from './STTUploadTable';

const baseUrl = process.env.REACT_APP_STT_BASE_URL;

function STTUploadContent(props) {
  const dispatch = useDispatch();
  const sttData = useSelector(sttSelectors.selectAll);

  const [selectedFile, setSelectedFile] = useState(null);
  const [responseText, setResponseText] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  // const [sttData, setSttData] = useState([]);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    dispatch(getSttData());
  }, [dispatch]);

  // Function to handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Function to handle video upload and response from the backend
  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file');
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      // Make a POST request to your Django backend using Axios
      const response = await axios.post(`${baseUrl}/whisper/`, formData);

      setResponseText(response?.data?.result);
      setVideoUrl(response?.data?.video_url);
      // setSttData(response?.data?.all_data);

      setIsLoading(false);
      setSelectedFile(null);
    } catch (err) {
      console.error('Error:', err);
      setIsLoading(false);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    setSelectedFile(droppedFile);
    setError('');
  };

  return (
    <div className="py-10 px-24">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div className="flex items-center justify-center w-full">
            {/* File Upload */}
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-42 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              {/* File Upload Icon */}
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  aria-hidden="true"
                  className="w-10 h-10 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">Video formats only</p>
              </div>

              {/* File Input */}
              <input
                id="dropzone-file"
                type="file"
                accept="video/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>

          {selectedFile && (
            <p className="mt-2 text-gray-500 text-center">Selected file: {selectedFile.name}</p>
          )}
          {error && <p className="mt-2 text-red-500 text-center">{error}</p>}

          {/* Upload Button */}
          <div className="flex items-center justify-center py-16">
            <Button
              className="rounded-lg bg-white hover:bg-white px-72"
              component={Link}
              variant="outlined"
              color="primary"
              disabled={isLoading}
              onClick={handleUpload}
            >
              {isLoading ? 'Transcribing...' : 'Transcribe'}
            </Button>
          </div>

          {/* Progress Bar */}
          {/* {isLoading && uploadPercentage !== 100 && (
            <div className="w-full h-2 mt-2 bg-gray-300 rounded">
              <div className="h-full bg-blue-500" style={{ width: `${uploadPercentage}%` }} />
              <div className="text-center p-2 text-xl font-semibold">{uploadPercentage}%</div>
            </div>
          )} */}
        </Grid>

        <Grid container spacing={2}>
          <Grid item sm={12} md={6}>
            {videoUrl && (
              <div className="pl-16">
                <ReactPlayer
                  url={`${baseUrl}/videos/${videoUrl}`}
                  controls
                  width="auto"
                  height="450px"
                />
              </div>
            )}
          </Grid>

          <Grid item sm={12} md={6}>
            {responseText && (
              <div className="h-[450px] mt-8 overflow-y-auto border border-gray-300">
                <p
                  className="urdu-text p-24 text-2xl font-semibold text-right"
                  style={{ lineHeight: '5rem' }}
                >
                  {responseText}
                </p>
              </div>
            )}
          </Grid>
        </Grid>
      </Grid>

      {sttData.length > 0 && (
        <div className="mt-20">
          <STTUploadTable sttData={sttData} />
        </div>
      )}
    </div>
  );
}

export default STTUploadContent;
