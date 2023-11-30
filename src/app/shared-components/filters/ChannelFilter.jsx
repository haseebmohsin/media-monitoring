// ChannelFilter.js
import { useState } from 'react';
import {
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import channelOptions from 'src/data/channelData';

function ChannelFilter() {
  const [selectedChannels, setSelectedChannels] = useState(['All']);

  const handleCategoryChange = (event) => {
    const selected = event.target.value;

    if (selected.includes('All')) {
      setSelectedChannels(['All']);
    } else {
      // Remove "All" from selectedCategories
      setSelectedChannels(selected.filter((item) => item !== 'All'));
    }
  };

  return (
    <FormControl fullWidth size="small">
      <InputLabel>Channel</InputLabel>
      <Select
        multiple
        label="Channel"
        value={selectedChannels}
        onChange={handleCategoryChange}
        renderValue={(selected) => selected.join(', ')}
      >
        <MenuItem key="All" value="All">
          <FormControlLabel
            control={<Checkbox checked={selectedChannels.includes('All')} />}
            label="All"
          />
        </MenuItem>

        <Divider />

        {channelOptions.map((option) => (
          <MenuItem key={option} value={option}>
            <FormControlLabel
              control={<Checkbox checked={selectedChannels.includes(option)} />}
              label={option}
            />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default ChannelFilter;
