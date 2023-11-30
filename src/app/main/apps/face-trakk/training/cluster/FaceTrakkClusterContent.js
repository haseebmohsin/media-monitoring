/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import frApiService from 'src/services/frApiService';
import { Typography } from '@mui/material';
import { showMessage } from 'app/store/fuse/messageSlice';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import FuseLoading from '@fuse/core/FuseLoading/FuseLoading';
import { getAllPersonNames, setClusterSelectedItemIds } from '../../store/faceTrakkSlice';

function FaceTrakkClusterContent() {
  const dispatch = useDispatch();
  const routeParams = useParams();
  const { clusterId } = routeParams;
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [clusterDetailsData, setClusterDetailsData] = useState(null);
  // State to store the selected item _ids
  const [selectedItemIds, setSelectedItemIds] = useState([]);

  useEffect(() => {
    dispatch(setClusterSelectedItemIds(selectedItemIds));
  }, [selectedItemIds]);

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

  // Function to handle checkbox selection
  const handleCheckboxChange = (itemId) => {
    setSelectedItemIds((prevIds) => {
      if (prevIds.includes(itemId)) {
        return prevIds.filter((iId) => iId !== itemId);
      }
      return [...prevIds, itemId];
    });
  };

  if (isPageLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <FuseLoading />
      </div>
    );
  }

  if (clusterDetailsData.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There are no data available
        </Typography>
      </motion.div>
    );
  }

  return (
    <div className="p-12 px-24">
      {!isPageLoading && clusterDetailsData && (
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-8 mt-2">
          {clusterDetailsData.faceImagesArray.map((item) => (
            <div key={item._id} className="p-1 rounded-md  select-none">
              <div
                className="relative w-[100px] h-[100px] cursor-pointer p-2"
                onClick={() => handleCheckboxChange(item._id)}
              >
                <div className="absolute top-0 right-0 rounded-full px-1 z-50">
                  <input
                    className="h-16 w-16 cursor-pointer mt-1"
                    type="checkbox"
                    checked={selectedItemIds.includes(item._id)}
                    readOnly
                  />
                </div>

                <div className="w-full">
                  <img
                    src={`data:image/jpeg;base64,${item.faceImage}`}
                    alt={item.faceName}
                    width={200}
                    height={150}
                  />
                </div>

                {/* <p className="text-center mt-2 absolute z-99 -bottom-6 left-0">{item.faceName}</p> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FaceTrakkClusterContent;
