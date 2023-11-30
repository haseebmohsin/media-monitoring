import { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

function SentimentFilter() {
  const [selectedSentiment, setSelectedSentiment] = useState('Any');

  const handleSentimentChange = (event) => {
    setSelectedSentiment(event.target.value);
  };

  return (
    <FormControl fullWidth size="small">
      <InputLabel>Sentiment</InputLabel>
      <Select label="Sentiment" value={selectedSentiment} onChange={handleSentimentChange}>
        <MenuItem value="Any">Any</MenuItem>
        <MenuItem value="Negative">Negative</MenuItem>
        <MenuItem value="Neutral">Neutral</MenuItem>
        <MenuItem value="Positive">Positive</MenuItem>
      </Select>
    </FormControl>
  );
}

export default SentimentFilter;
