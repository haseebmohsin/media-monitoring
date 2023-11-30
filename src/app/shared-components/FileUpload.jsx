import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectMakeClustersLoading } from '../main/apps/face-trakk/store/faceTrakkSlice';
import ButtonComponent from './ButtonComponent';

function FileUpload({ onUpload, width = 'w-full' }) {
  const makeClustersLoading = useSelector(selectMakeClustersLoading);
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setError('');
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please choose a file.');
      return;
    }

    const formData = new FormData();
    formData.append('video', file);

    // Call the parent component's onUpload function with the formData
    onUpload(formData).then(() => {
      setFile(null);
    });
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    setFile(droppedFile);
    setError('');
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className={`flex items-center justify-center gap-12 ${width}`}>
      <div className="flex flex-col items-center">
        {/* File Upload */}
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center h-42 w-[300px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
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

            {file && <p className="mt-1 text-sm text-gray-500">Selected file: {file.name}</p>}
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
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

      <ButtonComponent
        title="Upload"
        loadingText="Processing..."
        className="px-64"
        isLoading={makeClustersLoading}
        onClick={handleUpload}
      />
    </div>
  );
}

export default FileUpload;
