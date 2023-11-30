import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { Button, FormControlLabel, Input, Link, Switch } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon/FuseSvgIcon';
import DatePickerComponent from 'app/shared-components/DatePickerComponent';
import TimePickerComponent from 'app/shared-components/TimePickerComponent';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import useSessionStorage from '@fuse/hooks/useSessionStorage';
import { showMessage } from 'app/store/fuse/messageSlice';
import { foreignChannels, localChannels } from 'src/data/channelNames';
import { getAllPersonNames, getLiveStreamData, selectPersonNames } from '../store/faceTrakkSlice';

function FRDashboardHeader(props) {
  const dispatch = useDispatch();
  const [intervalId, setIntervalId] = useState(null);
  const [filterByIdentity, setFilterByIdentity] = useState('allKnown');
  const [selectedChannelType, setSelectedChannelType] = useState('localChannels');
  const [selectedChannel, setSelectedChannel] = useState('all_channels');
  const [realTime, setRealTime] = useSessionStorage('realTime', false);
  const personNames = useSelector(selectPersonNames);
  const [personName, setPersonName] = useState('');
  const [searchText, setSearchText] = useState('');

  // const [startDate, setStartDate] = useState(null);
  // const [endDate, setEndDate] = useState(null);
  // const [startTime, setStartTime] = useState(null);
  // const [endTime, setEndTime] = useState(null);

  useEffect(() => {
    dispatch(getAllPersonNames());
  }, [dispatch]);

  const handleEnterKey = (event) => {
    if (event.key === 'Enter' && searchText.trim() !== '') {
      console.log('clicked');
    }
  };

  const handleSwitchChange = (e) => {
    setRealTime(e.target.checked);

    if (!realTime) {
      if (selectedChannel === 'allChannels') {
        dispatch(showMessage({ message: 'Please select a channel' }));
        setRealTime(false);
        return;
      }

      dispatch(getLiveStreamData(selectedChannel));

      // Set up a setInterval to fetch tickers
      // const interval = setInterval(() => {
      //   fetchTickers();
      // }, 7000);

      // setIntervalId(interval);
    } else {
      window.location.reload();
      // Clear the interval when the switch is turned off
      clearInterval(intervalId);
      // dispatch(clearTickers());
    }
  };

  return (
    <div className="flex flex-col justify-center gap-10 w-full">
      <div className="flex sm:flex-row flex-col justify-center sm:items-center sm:justify-end gap-16">
        <div>
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.3 } }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full"
          >
            <DatePickerComponent
              label="Start Date"
              // value={startDate}
              // onChange={(newValue) => setStartDate(newValue)}
            />

            <DatePickerComponent
              label="End Date"
              // value={endDate}
              // onChange={(newValue) => setEndDate(newValue)}
            />

            <TimePickerComponent
              label="Start Time"
              // value={startTime}
              // onChange={(newValue) => setStartTime(newValue)}
            />

            <TimePickerComponent
              label="End Time"
              // value={endTime}
              // onChange={(newValue) => setEndTime(newValue)}
            />
          </motion.div>
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
            <InputLabel id="channels-label">Filter by Identity</InputLabel>
            <Select
              className="bg-white"
              labelId="channels-label"
              id="channels"
              value={filterByIdentity}
              label="Filter by Identity"
              onChange={(e) => {
                setFilterByIdentity(e.target.value);
              }}
            >
              <MenuItem value="allData">All Data</MenuItem>
              <MenuItem value="allKnown">All Known</MenuItem>
              <MenuItem value="allUnknown">All Unknown</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
            <InputLabel id="fr-label">Choose Person Name</InputLabel>
            <Select
              className="bg-white"
              labelId="fr-label"
              id="fr"
              value={personName}
              label="Choose Person Name"
              onChange={(e) => setPersonName(e.target.value)}
            >
              {personNames?.map((person) => (
                <MenuItem key={person._id} value={person.personName}>
                  {person.personName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

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
            // onClick={handleTickersFetch}
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

export default FRDashboardHeader;
