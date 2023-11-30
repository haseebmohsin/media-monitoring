import { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

function RelevanceFilter() {
  const [selectedRelevance, setSelectedRelevance] = useState('All');

  const handleRelevanceChange = (event) => {
    setSelectedRelevance(event.target.value);
  };

  return (
    <FormControl fullWidth size="small">
      <InputLabel>Relevance</InputLabel>
      <Select label="Relevance" value={selectedRelevance} onChange={handleRelevanceChange}>
        <MenuItem value="All">All</MenuItem>
        <MenuItem value="Normal">Normal</MenuItem>
        <MenuItem value="Strict">Strict</MenuItem>
      </Select>
    </FormControl>
  );
}

export default RelevanceFilter;
