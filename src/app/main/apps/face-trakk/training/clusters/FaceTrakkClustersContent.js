/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  getClusters,
  selectClustersData,
  selectGetClustersLoading,
  selectMakeClustersLoading,
} from '../../store/faceTrakkSlice';

function FaceTrakkClustersContent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getClustersLoading = useSelector(selectGetClustersLoading);
  const makeClustersLoading = useSelector(selectMakeClustersLoading);
  const clustersData = useSelector(selectClustersData);

  const [error, setError] = useState('');

  useEffect(() => {
    dispatch(getClusters());
  }, [dispatch]);

  return (
    <main className="py-10 px-24">
      <div className="flex flex-col items-center">
        {/* Render the rest of your Clusters component code */}
        {getClustersLoading ||
          (makeClustersLoading && <div className="m-10 text-lg">Loading data...</div>)}

        {!getClustersLoading && !makeClustersLoading && clustersData?.length === 0 && (
          <div className="m-14 text-lg">No data found.</div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 mt-24">
          {clustersData?.map((item, index) => (
            <div
              key={item._id}
              className="flex flex-col items-center"
              onClick={() => navigate(`/apps/face-trakk/training/clusters/${item._id}`)}
            >
              <div className="p-4 rounded-md relative cursor-pointer w-[120px] h-[120px]">
                <img
                  className="cursor-pointer rounded-md transition-transform hover:scale-105"
                  src={`data:item/jpeg;base64,${item.faceImagesArray[0]?.faceImage}`}
                  alt="person"
                />
              </div>

              <p className="text-center mt-6 text-xl">
                {item.faceImagesArray[0]?.faceName.split('_')[0]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default FaceTrakkClustersContent;
