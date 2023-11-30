/* eslint-disable jsx-a11y/media-has-caption */
import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

function VideoPlayerModal({ isOpen, onClose, videoURL, startTime }) {
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const parseTimeToSeconds = (time) => {
    const timeParts = time.split(':').map(parseFloat);
    const [hours, minutes, seconds] = timeParts;

    return hours * 3600 + minutes * 60 + seconds;
  };

  useEffect(() => {
    const onCanPlay = () => {
      const videoElement = videoRef.current;
      if (videoElement) {
        const startTimeInSeconds = parseTimeToSeconds(startTime);
        videoElement.currentTime = startTimeInSeconds;
        videoElement.removeEventListener('canplay', onCanPlay);
        setVideoLoaded(true);
      }
    };

    if (isOpen) {
      const videoElement = videoRef.current;
      if (videoElement) {
        videoElement.addEventListener('canplay', onCanPlay);
      }
    }

    return () => {
      const videoElement = videoRef.current;
      if (videoElement) {
        videoElement.removeEventListener('canplay', onCanPlay);
      }
    };
  }, [isOpen, startTime]);

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} maxWidth="md" fullWidth onClose={onClose}>
      <DialogContent>
        <video controls width="800" height="550" ref={videoRef}>
          <source src={`${process.env.REACT_APP_FR_BASE_URL}/${videoURL}`} type="video/mp4" />
          {/* {videoLoaded ? (
            <source src={`${process.env.REACT_APP_FR_BASE_URL}/${videoURL}`} type="video/mp4" />
          ) : null} */}
          Your browser does not support the video tag.
        </video>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default VideoPlayerModal;
