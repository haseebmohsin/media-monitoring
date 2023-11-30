import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { Button, FormControlLabel, IconButton, Input, Link, Switch, Tooltip } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon/FuseSvgIcon';
import { showMessage } from 'app/store/fuse/messageSlice';
import DatePickerComponent from 'app/shared-components/DatePickerComponent';
import TimePickerComponent from 'app/shared-components/TimePickerComponent';
import dayjs from 'dayjs';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import useSessionStorage from '@fuse/hooks/useSessionStorage';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import { localChannels, foreignChannels } from 'src/data/channelNames';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import {
  getFilteredKeywordsCloud,
  getKeywordsCloud,
  selectKeywordsCloudFilters,
  setKeywordsCloudFilters,
} from '../store/keywordsCloudSlice';

function KeywordsCloudHeader(props) {
  const dispatch = useDispatch();
  const filters = useSelector(selectKeywordsCloudFilters);
  const [selectedChannelType, setSelectedChannelType] = useState('localChannels');
  const [selectedChannel, setSelectedChannel] = useState('all_channels');
  const [intervalId, setIntervalId] = useState(null);
  const [realTime, setRealTime] = useSessionStorage('realTime', false);

  const [isNewFilterApplyLoading, setIsNewFilterApplyLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const enterFullScreen = () => {
    const keywordCloudDiv = document.getElementById('keyword-cloud');

    if (keywordCloudDiv) {
      if (keywordCloudDiv.requestFullscreen) {
        keywordCloudDiv.requestFullscreen();
      } else if (keywordCloudDiv.mozRequestFullScreen) {
        keywordCloudDiv.mozRequestFullScreen();
      } else if (keywordCloudDiv.webkitRequestFullscreen) {
        keywordCloudDiv.webkitRequestFullscreen();
      } else if (keywordCloudDiv.msRequestFullscreen) {
        keywordCloudDiv.msRequestFullscreen();
      }
    }
  };

  const exitFullScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  };

  useEffect(() => {
    const filtersObject = {
      selectedChannel,
      selectedChannelType,
      searchText,
      startDate: startDate !== null ? dayjs(startDate).format('YYYY-MM-DD') : '',
      endDate: endDate !== null ? dayjs(endDate).format('YYYY-MM-DD') : '',
      startTime: startTime !== null ? dayjs(startTime).format('hh:mm A') : '',
      endTime: endTime !== null ? dayjs(endTime).format('hh:mm A') : '',
    };

    dispatch(setKeywordsCloudFilters(filtersObject));
  }, [
    selectedChannel,
    searchText,
    startDate,
    endDate,
    startTime,
    endTime,
    selectedChannelType,
    dispatch,
  ]);

  // Update selectedChannel when selectedChannelType changes
  useEffect(() => {
    setSelectedChannel('all_channels');
  }, [selectedChannelType]);

  // Function to fetch keywordsCloud and handle loading state
  const fetchKeywordsCloudData = () => {
    dispatch(getKeywordsCloud(selectedChannelType));
  };

  const handleSwitchChange = (e) => {
    setRealTime(e.target.checked);

    if (!realTime) {
      fetchKeywordsCloudData();

      // Set up a setInterval to fetch keywordsCloud
      const interval = setInterval(() => {
        fetchKeywordsCloudData();
      }, 10000);

      setIntervalId(interval);
    } else {
      window.location.reload();
      clearInterval(intervalId);
    }
  };

  const handleKeywordsCloudsFetch = () => {
    try {
      dispatch(getFilteredKeywordsCloud(filters));
    } catch (error) {
      dispatch(showMessage({ message: 'Something went wrong' }));
    }
  };

  const handleEnterKey = (event) => {
    if (event.key === 'Enter' && searchText.trim() !== '') {
      handleKeywordsCloudsFetch();
    }
  };

  const handleClearFilters = () => {
    // Reset the local state
    setSelectedChannel('all_channels');
    setSelectedChannelType('localChannels');
    setSearchText('');
    setStartDate(null);
    setEndDate(null);
    setStartTime(null);
    setEndTime(null);

    // Dispatch the action to clear filters in the Redux store
    const filtersObject = {
      selectedChannel: 'all_channels',
      selectedChannelType: 'localChannels',
      searchText: '',
      startDate: null,
      endDate: null,
      startTime: null,
      endTime: null,
    };

    dispatch(setKeywordsCloudFilters(filtersObject));
  };

  const areFiltersNotEmpty = () => {
    return (
      selectedChannel !== 'all_channels' ||
      selectedChannelType !== 'localChannels' ||
      searchText !== '' ||
      startDate !== null ||
      endDate !== null ||
      startTime !== null ||
      endTime !== null
    );
  };

  return (
    <div className="flex flex-col justify-center gap-10 w-full">
      <div className="flex sm:flex-row flex-col justify-center sm:items-center sm:justify-end gap-16">
        <div className="flex sm:flex-row flex-col-reverse justify-center sm:items-center sm:justify-between">
          <div className="flex items-center justify-center">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { delay: 0.3 } }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full"
            >
              <DatePickerComponent
                label="Start Date"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
              />

              <DatePickerComponent
                label="End Date"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
              />

              <TimePickerComponent
                label="Start Time"
                value={startTime}
                onChange={(newValue) => setStartTime(newValue)}
              />

              <TimePickerComponent
                label="End Time"
                value={endTime}
                onChange={(newValue) => setEndTime(newValue)}
              />
            </motion.div>
          </div>

          {areFiltersNotEmpty() && (
            <div className="mx-4 p-4 flex justify-end">
              <Tooltip title="Clear Filters" placement="bottom-start">
                <IconButton
                  onClick={handleClearFilters}
                  color="primary"
                  size="medium"
                  aria-label="Clear Filters"
                >
                  <FilterAltOffIcon />
                </IconButton>
              </Tooltip>
            </div>
          )}

          <div className="ml-8">
            <Tooltip title="Full Screen" placement="top-start">
              <IconButton
                onClick={enterFullScreen}
                color="primary"
                size="large"
                aria-label="Full Screen"
              >
                <FullscreenIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between items-center w-full lg:w-auto lg:flex-row space-y-8 lg:space-y-0 space-x-4 mb-10 overflow-x-auto">
        <div className="w-full">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.3 } }}
            className="flex items-center w-full xl:w-[70%] space-x-8 px-16 rounded-lg border-1 shadow-0 bg-white"
          >
            <FuseSvgIcon color="disabled">heroicons-solid:search</FuseSvgIcon>

            <Input
              className="flex flex-1"
              placeholder="Search"
              disableUnderline
              fullWidth
              value={searchText}
              inputProps={{
                'aria-label': 'Search',
              }}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
              onKeyPress={handleEnterKey}
            />
          </motion.div>
        </div>

        <div className="flex items-center">
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="channels-label">Choose Channel Type</InputLabel>
            <Select
              className="bg-white"
              labelId="channels-label"
              id="channels"
              value={selectedChannelType}
              label="Choose Channel Type"
              onChange={(e) => {
                setSelectedChannelType(e.target.value);
              }}
            >
              <MenuItem value="localChannels">Local Channels</MenuItem>
              {/* <MenuItem value="foreignChannels">Foreign Channels</MenuItem> */}
            </Select>
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 220 }} size="small">
            <InputLabel id="second-channels-label">Choose Channel</InputLabel>
            <Select
              className="bg-white"
              labelId="second-channels-label"
              id="second-channels"
              value={selectedChannel}
              label="Choose Channel"
              onChange={(e) => {
                setSelectedChannel(e.target.value);
              }}
            >
              {selectedChannelType === 'localChannels'
                ? localChannels.map((channel) => (
                    <MenuItem key={channel.value} value={channel.value}>
                      {channel.label}
                    </MenuItem>
                  ))
                : foreignChannels.map((channel) => (
                    <MenuItem key={channel.value} value={channel.value}>
                      {channel.label}
                    </MenuItem>
                  ))}
            </Select>
          </FormControl>

          <Button
            className="rounded-lg bg-white hover:bg-white"
            component={Link}
            variant="outlined"
            color="primary"
            type="submit"
            onClick={handleKeywordsCloudsFetch}
          >
            Apply
          </Button>

          <FormControlLabel
            className="whitespace-nowrap ml-4"
            control={<Switch />}
            label="Real Time"
            checked={realTime}
            onChange={handleSwitchChange}
          />
        </div>
      </div>
    </div>
  );
}

export default KeywordsCloudHeader;
