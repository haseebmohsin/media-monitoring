import { useDispatch } from 'react-redux';
import Back from 'app/shared-components/Back';
import FileUpload from 'app/shared-components/FileUpload';
import { liveVideo } from '../store/faceTrakkSlice';

function FRUploadHeader(props) {
  const dispatch = useDispatch();

  const handleUpload = async (formData) => {
    dispatch(liveVideo(formData));
  };

  return (
    <div className="flex justify-between gap-x-16 mb-10 w-full">
      <Back />

      <FileUpload onUpload={handleUpload} />
    </div>
  );
}

export default FRUploadHeader;
