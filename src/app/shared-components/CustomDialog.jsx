import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

export default function CustomDialog(props) {
  const { title, description, open, handleClose, handleSaveChanges } = props;

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">{description}</DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSaveChanges}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
