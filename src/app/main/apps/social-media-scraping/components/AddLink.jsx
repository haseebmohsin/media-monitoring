/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, DialogContent, IconButton, Menu, MenuItem } from '@mui/material';
import CustomDialog from 'app/shared-components/CustomDialog';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { getScrappedKeywordOrLinkData } from '../store/socialMediaScrapingSlice';

export default function AddLink(props) {
  const { enteredLinks, enteredLink, setEnteredLink, handleAddLink, handleRemoveLink } = props;

  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(
    new Array((enteredLinks && enteredLinks.length) || 0).fill(null)
  );

  const handleGetScrappedData = (item) => {
    const data = {
      query: item,
    };

    dispatch(getScrappedKeywordOrLinkData(data));
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleSaveChanges = () => {
    setOpenDialog(false);
  };

  const handleMenuOpen = (event, index) => {
    const newAnchorEl = [...anchorEl];
    newAnchorEl[index] = event.currentTarget;
    setAnchorEl(newAnchorEl);
  };

  const handleMenuClose = (index) => {
    const newAnchorEl = [...anchorEl];
    newAnchorEl[index] = null;
    setAnchorEl(newAnchorEl);
  };

  const handleDetailsClick = (index) => {
    handleMenuClose(index);
    setOpenDialog(true);
  };

  return (
    <div className="p-1 mt-5">
      <div className="flex items-center gap-3">
        <input
          className="bg-white p-5 w-1/3 border rounded-md"
          value={enteredLink}
          type="text"
          placeholder="Enter Link"
          onChange={(e) => setEnteredLink(e.target.value)}
        />

        <Button className="rounded-md mr-3" variant="outlined" size="small" onClick={handleAddLink}>
          Add
        </Button>
      </div>

      {enteredLinks?.length > 0 && (
        <div className="flex items-center gap-3 mt-8 max-w-[70%] overflow-x-auto">
          {enteredLinks?.map((item, index) => (
            <div className="flex items-center gap-8 border rounded-full" key={index}>
              <div
                className="ml-8 select-none cursor-pointer font-semibold"
                onClick={() => handleGetScrappedData(item)}
              >
                {item}
              </div>

              <div className="cursor-pointer font-semibold text-red-700">
                <IconButton onClick={(event) => handleMenuOpen(event, index)}>
                  <MoreVertIcon fontSize="small" />
                </IconButton>

                <Menu
                  anchorEl={anchorEl[index]}
                  open={Boolean(anchorEl[index])}
                  onClose={() => handleMenuClose(index)}
                >
                  <MenuItem onClick={() => handleDetailsClick(index)}>Details</MenuItem>
                  <MenuItem onClick={() => handleRemoveLink(index)}>Delete</MenuItem>
                </Menu>
              </div>
            </div>
          ))}
        </div>
      )}

      <CustomDialog
        title="Change the settings about the Link"
        open={openDialog}
        handleClose={handleDialogClose}
        handleDialogClose={handleDialogClose}
        handleSaveChanges={handleSaveChanges}
      >
        <DialogContent>Testing</DialogContent>
      </CustomDialog>
    </div>
  );
}
