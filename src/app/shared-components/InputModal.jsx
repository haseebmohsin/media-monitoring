import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  TextField,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { showMessage } from 'app/store/fuse/messageSlice';
import { addPersonName } from '../main/apps/face-trakk/store/faceTrakkSlice';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function InputModal({ isOpen, closeModal }) {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [formSubmitLoading, setFormSubmitLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true });

    if (name.trim() === '') {
      setErrors({ name: 'Name is required' });
      return;
    }

    setFormSubmitLoading(true);

    dispatch(addPersonName({ name }))
      .then((response) => {
        dispatch(showMessage({ message: response?.message || 'Person name added!' }));
      })
      .catch((error) => {
        dispatch(showMessage({ message: error?.message || 'Something went wrong!' }));
      })
      .finally(() => {
        setFormSubmitLoading(false);
        closeModal();
      });
  };

  const handleChange = (e) => {
    setName(e.target.value);
    setErrors({ ...errors, name: '' });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Dialog
          open={isOpen}
          TransitionComponent={Transition}
          keepMounted
          fullWidth
          maxWidth="sm"
          onClose={closeModal}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>
            <div className="flex items-center justify-between">
              <div>Add Name</div>
            </div>
          </DialogTitle>

          <DialogContent>
            <div className="flex items-center justify-between">
              <TextField
                className="w-full"
                label="Enter Name"
                margin="dense"
                id="word"
                type="text"
                variant="standard"
                autoFocus
                value={name}
                onChange={handleChange}
              />
            </div>
          </DialogContent>

          <DialogActions>
            <Button onClick={closeModal}>Close</Button>

            <Button type="submit" className="w-24 px-6" onClick={handleSubmit}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </div>
  );
}

export default InputModal;
