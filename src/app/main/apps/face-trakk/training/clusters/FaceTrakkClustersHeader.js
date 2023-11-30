import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Back from 'app/shared-components/Back';
import { showMessage } from 'app/store/fuse/messageSlice';
import FileUpload from 'app/shared-components/FileUpload';
import ButtonComponent from 'app/shared-components/ButtonComponent';
import { makeClusters, startTraining } from '../../store/faceTrakkSlice';

function FaceTrakkClustersHeader(props) {
  const dispatch = useDispatch();
  const [isTrainingLoading, setIsTrainingLoading] = useState(false);

  const handleStartTraining = async () => {
    setIsTrainingLoading(true);

    try {
      const response = await dispatch(startTraining());

      if (response) dispatch(showMessage({ message: response?.payload?.message }));
    } catch (error) {
      dispatch(showMessage({ message: error?.message || 'Something went wrong!' }));
    } finally {
      setIsTrainingLoading(false);
    }
  };

  const handleUpload = async (formData) => {
    dispatch(makeClusters(formData));
  };

  return (
    <div className="flex items-center justify-between w-full gap-x-16 mb-10">
      <Back />

      {/* Render the FileUpload component */}
      <FileUpload onUpload={handleUpload} />

      <ButtonComponent
        title="Start Training"
        loadingText="Training in progress..."
        className="px-40"
        isLoading={isTrainingLoading}
        onClick={handleStartTraining}
      />
    </div>
  );
}

export default FaceTrakkClustersHeader;
