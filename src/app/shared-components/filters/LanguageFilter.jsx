import { useState } from 'react';
import {
  FormControl,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';
import languageOptions from 'src/data/languageData';

function LanguageFilter() {
  const [selectedCountries, setSelectedCountries] = useState(['Any']);

  const handleLanguageChange = (event) => {
    setSelectedCountries(event.target.value);
  };

  return (
    <FormControl fullWidth size="small">
      <InputLabel>Language</InputLabel>
      <Select
        multiple
        label="Language"
        value={selectedCountries}
        onChange={handleLanguageChange}
        renderValue={(selected) => selected.join(', ')}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: '60vh',
            },
          },
        }}
      >
        {languageOptions.map((language) => (
          <MenuItem key={language} value={language}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedCountries.includes(language)}
                  onChange={handleLanguageChange}
                  value={language}
                />
              }
              label={language}
            />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default LanguageFilter;
