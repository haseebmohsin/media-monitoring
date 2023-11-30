import { useEffect, useRef, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import ReactPlayer from 'react-player/lazy';
import { useParams } from 'react-router-dom';
import Slide from '@mui/material/Slide';
import history from '@history/@history';
import channels from './channelsData';

function Channels() {
  const { channelSlug } = useParams();
  const [selectedChannels, setSelectedChannels] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    // Find the channel object with a matching slug
    const channel = channels.find((c) => c.slug === channelSlug);

    // Check if the channel exists and if its URL is not already in selectedChannels
    if (channel && !selectedChannels.includes(channel.url)) {
      setSelectedChannels([...selectedChannels, channel.url]);
    }
  }, [channelSlug]);

  const handleRemoveChannel = (channelUrl) => {
    // first remove the channel slug from the url
    const currentPathname = history.location.pathname;
    const lastIndex = currentPathname.lastIndexOf('/');
    if (lastIndex !== -1) {
      const newPathname = currentPathname.substring(0, lastIndex);
      history.push(newPathname);
    }

    // remove the channel from the selectedChannels array
    setSelectedChannels(selectedChannels.filter((url) => url !== channelUrl));
  };

  return (
    <div className="mt-16 p-2">
      <Grid container spacing={2} className="select-none">
        {selectedChannels?.map((channelUrl) => (
          <Slide direction="right" in container={containerRef.current} timeout={900}>
            <Grid item xs={12} sm={12} md={6} lg={4} key={channelUrl} className="relative">
              <div className="p-2 flex justify-end items-end absolute z-50 top-7 right-16">
                <button
                  type="button"
                  onClick={() => handleRemoveChannel(channelUrl)}
                  className="close-button text-red-600 font-bold text-24 mr-2"
                >
                  X
                </button>
              </div>

              <ReactPlayer url={channelUrl} playing controls width="500px" height="auto" />
            </Grid>
          </Slide>
        ))}
      </Grid>
    </div>
  );
}

export default Channels;
