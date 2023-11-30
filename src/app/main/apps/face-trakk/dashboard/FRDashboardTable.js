/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import FuseLoading from '@fuse/core/FuseLoading';
import VideoPlayerModal from 'app/shared-components/modals/VideoPlayerModal';
import axios from 'axios';
import FRDashboardTableHead from './FRDashboardTableHead';
import { selectFaceTrakkLoading } from '../store/faceTrakkSlice';

function FRDashboardTable() {
  const dispatch = useDispatch();
  const [isVideoPlayerModalOpen, setIsVideoPlayerModalOpen] = useState(false);
  const isFaceTrakkLoading = useSelector(selectFaceTrakkLoading);
  // const faceTrakk = useSelector(faceTrakkSelectors.selectAll);
  const [faceTrakk, setFaceTrakk] = useState([]);

  const [selected, setSelected] = useState([]);
  const [order, setOrder] = useState({
    direction: 'asc',
    id: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_FR_FAST_API);
        // console.log(JSON.parse(response.data));
        setFaceTrakk(JSON.parse(response.data));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    const interId = setInterval(fetchData, 10000);
    return () => {
      clearInterval(interId);
    };
  }, []);

  // useEffect(() => {
  //   dispatch(getThumbnails());
  // }, [dispatch]);

  const handleRequestSort = (property) => {
    const id = property;
    const direction = order.id === property && order.direction === 'desc' ? 'asc' : 'desc';

    setOrder({ direction, id });
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelected(faceTrakk.map((n) => n._id));
    } else {
      setSelected([]);
    }
  };

  const handleDeselect = () => {
    setSelected([]);
  };

  // const handleCheck = (event, id) => {
  //   const selectedIndex = selected.indexOf(id);
  //   let newSelected = [];

  //   if (selectedIndex === -1) {
  //     newSelected = [...selected, id];
  //   } else {
  //     newSelected = selected.filter((item) => item !== id);
  //   }

  //   setSelected(newSelected);
  // };

  if (isFaceTrakkLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <FuseLoading />
      </div>
    );
  }

  if (faceTrakk.length === 0) {
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
    <div className="w-full flex flex-col min-h-full pb-12 bg-grey-50">
      <Table stickyHeader className="min-w-xl">
        <FRDashboardTableHead
          selectedIds={selected}
          order={order}
          onSelectAllClick={handleSelectAllClick}
          onRequestSort={handleRequestSort}
          rowCount={faceTrakk.length}
          onMenuItemClick={handleDeselect}
        />

        <TableBody>
          {faceTrakk.map((n) => {
            const isSelected = selected.indexOf(n._id) !== -1;

            return (
              <TableRow
                className="cursor-pointer py-4"
                hover
                role="checkbox"
                aria-checked={isSelected}
                tabIndex={-1}
                selected={isSelected}
                key={n._id}
              >
                <TableCell
                  className="w-[45px] px-4 md:px-8"
                  component="th"
                  scope="row"
                  padding="none"
                >
                  <img
                    className=""
                    src={`data:image/jpeg;base64,${n.thumbnail}`}
                    alt="thumbnail"
                    width={80}
                    height={80}
                    onClick={() => setIsVideoPlayerModalOpen(true)}
                  />
                </TableCell>

                <TableCell className="w-[90px] p-8 md:p-16" component="th" scope="row">
                  {n.name}
                </TableCell>

                <TableCell className="w-[90px] p-8 md:p-16" component="th" scope="row">
                  {n.startTime}
                </TableCell>

                <TableCell className="w-[90px] p-8 md:p-16" component="th" scope="row">
                  {n.endTime}
                </TableCell>

                <TableCell className="w-[90px] p-8 md:p-16" component="th" scope="row">
                  {n.coverageTime}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {faceTrakk.map(
        (item) =>
          item.videoURL && (
            <VideoPlayerModal
              key={item._id}
              isOpen={isVideoPlayerModalOpen}
              onClose={() => setIsVideoPlayerModalOpen(false)}
              startTime={item.startTime[0]}
              videoURL={item.videoURL}
            />
          )
      )}
    </div>
  );
}

export default FRDashboardTable;
