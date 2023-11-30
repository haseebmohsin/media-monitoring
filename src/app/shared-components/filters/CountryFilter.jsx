import { useState } from 'react';
import {
  FormControl,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';
import countryOptions from 'src/data/countryData';

function CountryFilter() {
  const [selectedCountries, setSelectedCountries] = useState(['Any']);

  const handleCountryChange = (event) => {
    setSelectedCountries(event.target.value);
  };

  return (
    <FormControl fullWidth size="small">
      <InputLabel>Country</InputLabel>
      <Select
        multiple
        label="Country"
        value={selectedCountries}
        onChange={handleCountryChange}
        renderValue={(selected) => selected.join(', ')}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: '60vh',
            },
          },
        }}
      >
        {countryOptions.map((country) => (
          <MenuItem key={country} value={country}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedCountries.includes(country)}
                  onChange={handleCountryChange}
                  value={country}
                />
              }
              label={country}
            />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default CountryFilter;
