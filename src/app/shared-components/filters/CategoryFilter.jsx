import { useState } from 'react';
import {
  FormControl,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  Divider,
} from '@mui/material';
import categoryOptions from 'src/data/categoryData';

function CategoryFilter() {
  const [selectedCategories, setSelectedCategories] = useState(['All']);

  const handleCategoryChange = (event) => {
    const selected = event.target.value;

    if (selected.includes('All')) {
      setSelectedCategories(['All']);
    } else {
      // Remove "All" from selectedCategories
      setSelectedCategories(selected.filter((item) => item !== 'All'));
    }
  };

  return (
    <FormControl fullWidth size="small">
      <InputLabel>Category</InputLabel>
      <Select
        multiple
        label="Category"
        value={selectedCategories}
        onChange={handleCategoryChange}
        renderValue={(selected) => selected.join(', ')}
      >
        <MenuItem key="All" value="All">
          <FormControlLabel
            control={<Checkbox checked={selectedCategories.includes('All')} />}
            label="All"
          />
        </MenuItem>

        <Divider />

        {categoryOptions.map((category) => (
          <MenuItem key={category} value={category}>
            <FormControlLabel
              control={<Checkbox checked={selectedCategories.includes(category)} />}
              label={category}
            />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default CategoryFilter;
