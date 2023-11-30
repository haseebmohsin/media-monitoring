import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import history from '@history';

function Back() {
  return (
    <div>
      <IconButton onClick={() => history.back()}>
        <ArrowBackIcon />
      </IconButton>
    </div>
  );
}

export default Back;
