import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function DatePickerComponent(props) {
  const { label, value, onChange } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        className="w-full rounded-lg bg-white"
        label={label}
        value={value}
        onChange={onChange}
        slotProps={{ textField: { size: 'small' } }}
        // renderInput={(params) => (
        //   <TextField {...params} variant="contained" className="border-0 border-none" />
        // )}
      />
    </LocalizationProvider>
  );
}
