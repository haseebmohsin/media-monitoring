/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import {
  getClusters,
  selectClustersData,
  selectGetClustersLoading,
} from '../main/apps/face-trakk/store/faceTrakkSlice';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function MoveToNewClusterModal({ isOpen, closeModal, handleMoveToNewCluster }) {
  const dispatch = useDispatch();
  const getClustersLoading = useSelector(selectGetClustersLoading);
  const clustersData = useSelector(selectClustersData);

  const [isHandleCreateNewClusterClicked, setIsHandleCreateNewClusterClicked] = useState(false);
  const [newClusterName, setNewClusterName] = useState('');

  useEffect(() => {
    dispatch(getClusters());
  }, [dispatch]);

  const handleCreateNewCluster = () => {
    setIsHandleCreateNewClusterClicked(true);
  };

  const handleCloseModal = () => {
    // clear the modal states
    setIsHandleCreateNewClusterClicked(false);
    setNewClusterName('');

    // now close the modal
    closeModal();
  };

  return (
    <div>
      <BootstrapDialog
        fullWidth
        maxWidth="md"
        onClose={() => handleCloseModal()}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={() => handleCloseModal()}>
          Move To New Cluster
        </BootstrapDialogTitle>

        <DialogContent dividers>
          {getClustersLoading && <div className="m-6 text-lg">Loading data...</div>}
          {!getClustersLoading && clustersData?.length === 0 && (
            <div className="m-4 text-lg">No data found.</div>
          )}

          {clustersData?.length > 0 && (
            <Typography gutterBottom>
              Select one of the following Cluster to move the selected Images to or create a new
              cluster below.
            </Typography>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2 mt-4">
            {clustersData?.map((item, index) => (
              <div
                key={item._id}
                className="flex flex-col items-center"
                onClick={() => handleMoveToNewCluster(item._id)}
              >
                <div className="p-2 rounded-md relative cursor-pointer w-84 h-84">
                  <img
                    className="cursor-pointer rounded-md transition-transform hover:scale-105"
                    src={`data:item/jpeg;base64,${item.faceImagesArray[0]?.faceImage}`}
                    alt="person"
                  />
                </div>

                <Typography className="text-center mt-2 text-xl">
                  {item.faceImagesArray[0]?.faceName.split('_')[0]}
                </Typography>
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-6 mb-1">
            <Typography gutterBottom>
              <Button
                className="rounded-lg bg-white hover:bg-white px-36 my-6 whitespace-nowrap"
                variant="outlined"
                color="primary"
                onClick={handleCreateNewCluster}
              >
                Create a New Cluster
              </Button>
            </Typography>
          </div>

          {isHandleCreateNewClusterClicked && (
            <TextField
              fullWidth
              id="fullWidth"
              label="Cluster Name"
              value={newClusterName}
              onChange={(event) => {
                setNewClusterName(event.target.value);
              }}
            />
          )}
        </DialogContent>

        {newClusterName && (
          <DialogActions>
            <Button
              autoFocus
              onClick={() => handleMoveToNewCluster()}
              style={{ textTransform: 'none' }}
            >
              {newClusterName ? `Move to ${newClusterName}` : ''}
            </Button>
          </DialogActions>
        )}
      </BootstrapDialog>

      {/* <ConfirmationModal isOpen={isConfirmationModalOpen} closeModal={() => setIsConfirmationModalOpen(false)} /> */}
    </div>
  );
}
