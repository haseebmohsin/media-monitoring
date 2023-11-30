/* eslint-disable jsx-a11y/media-has-caption */

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import { useState } from 'react';

function UserDetailsModal({ isOpen, onClose, onSave, selectedUser }) {
  const [displayName, setDisplayName] = useState(selectedUser.displayName);
  const [role, setRole] = useState(selectedUser.role);

  const handleSave = () => {
    onSave(selectedUser._id, { displayName, role });
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} maxWidth="md" fullWidth onClose={onClose}>
      <DialogContent>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          variant="outlined"
          value={selectedUser.email}
          disabled
        />

        <TextField
          label="Display Name"
          fullWidth
          margin="normal"
          variant="outlined"
          value={selectedUser.displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />

        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel id="role-label">Role</InputLabel>
          <Select
            labelId="role-label"
            label="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="staff">Staff</MenuItem>
            <MenuItem value="user">User</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default UserDetailsModal;
