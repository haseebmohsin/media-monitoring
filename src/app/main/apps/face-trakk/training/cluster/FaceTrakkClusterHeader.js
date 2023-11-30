import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import frApiService from 'src/services/frApiService';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import history from '@history';
import { showMessage } from 'app/store/fuse/messageSlice';
import { useParams } from 'react-router-dom';
import Back from 'app/shared-components/Back';
import InputModal from 'app/shared-components/InputModal';
import MoveToNewClusterModal from 'app/shared-components/MoveToNewClusterModal';
import ButtonComponent from 'app/shared-components/ButtonComponent';
import {
  createAdditionalTrainingDatasets,
  getAllPersonNames,
  moveToNewCluster,
  selectPersonNames,
  selectSelectedItemIds,
} from '../../store/faceTrakkSlice';

function FaceTrakkClusterHeader(props) {
  const dispatch = useDispatch();
  const routeParams = useParams();
  const { clusterId } = routeParams;

  const [isInputModalOpen, setIsInputModalOpen] = useState(false);
  const [isMoveToNewClusterModalOpen, setIsMoveToNewClusterModalOpen] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);

  const personNames = useSelector(selectPersonNames);
  const selectedItemIds = useSelector(selectSelectedItemIds);

  const [clusterDetailsData, setClusterDetailsData] = useState(null);
  const [correctedName, setCorrectedName] = useState('');

  // const [correctedName, setCorrectedName] = useState(
  //   clusterDetailsData?.faceImagesArray[0]?.faceName.split('_')[0]
  // );

  // State to store the selected item _ids
  // const [selectedItemIds, setSelectedItemIds] = useState([]);

  useEffect(() => {
    dispatch(getAllPersonNames());
  }, [dispatch]);

  useEffect(() => {
    if (clusterId) {
      fetchClusterDetails();
    }
  }, [clusterId]);

  const fetchClusterDetails = async () => {
    try {
      const response = await frApiService({ path: `api/training/getClusterData/${clusterId}` });
      setClusterDetailsData(response.cluster);
    } catch (error) {
      dispatch(showMessage({ message: error?.message || 'Something went wrong!' }));
    }

    setIsPageLoading(false);
  };

  const handleSubmit = async () => {
    if (selectedItemIds.length < 5) {
      dispatch(showMessage({ message: 'You must select minimum 5 images' }));
      return;
    }

    setIsSubmitLoading(true);

    const data = {
      cluster_id: clusterDetailsData._id,
      selectedItemIds,
      label: correctedName.replace(/\s+/g, '_'),
    };

    try {
      const response = dispatch(createAdditionalTrainingDatasets(data));

      if (response) {
        dispatch(showMessage({ message: response?.payload?.message || 'Done!' }));
        history.push('/apps/face-trakk/training/clusters');
      }
    } catch (error) {
      dispatch(showMessage({ message: error?.message || 'Something went wrong!' }));
    }

    setIsSubmitLoading(false);
  };

  const handleMoveToNewCluster = async (clusId) => {
    const data = {
      clusterId: clusId || '',
      selectedItemIds,
    };

    try {
      const response = dispatch(moveToNewCluster(data));

      if (response) {
        dispatch(showMessage({ message: response?.message }));
        history.push('/apps/face-trakk/training/clusters');
      }
    } catch (error) {
      dispatch(showMessage({ message: error?.message || 'Something went wrong!' }));
    }
  };

  const handleAddNewName = () => {
    setIsInputModalOpen(true);
  };

  return (
    <>
      <div className="flex items-center justify-between gap-x-6 mb-10">
        <Back />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 w-full my-6">
          <div className="flex w-full gap-3">
            <ButtonComponent title="Add New Name" onClick={() => handleAddNewName()} />

            <FormControl sx={{ m: 1, minWidth: 220 }} size="small">
              <InputLabel id="fr-label">Choose Person Name</InputLabel>
              <Select
                className="bg-white"
                labelId="fr-label"
                id="fr"
                value={correctedName}
                label="Choose Person Name"
                onChange={(e) => setCorrectedName(e.target.value)}
              >
                {personNames?.map((person) => (
                  <MenuItem key={person._id} value={person.personName}>
                    {person.personName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <ButtonComponent
              title="Submit"
              loadingText="Processing..."
              isLoading={isSubmitLoading}
              onClick={() => handleSubmit(clusterDetailsData?._id, clusterDetailsData?.clusterName)}
            />
          </div>
        </div>

        {selectedItemIds.length > 0 && (
          <ButtonComponent
            title="Move to New Cluster"
            onClick={() => setIsMoveToNewClusterModalOpen(true)}
          />
        )}
      </div>

      <InputModal isOpen={isInputModalOpen} closeModal={() => setIsInputModalOpen(false)} />

      <MoveToNewClusterModal
        isOpen={isMoveToNewClusterModalOpen}
        closeModal={() => setIsMoveToNewClusterModalOpen(false)}
        handleMoveToNewCluster={handleMoveToNewCluster}
      />
    </>
  );
}

export default FaceTrakkClusterHeader;
