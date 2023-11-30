/* eslint-disable jsx-a11y/media-has-caption */

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import withRouter from '@fuse/core/withRouter';
import { Typography } from '@mui/material';
import { motion } from 'framer-motion';
import FuseLoading from '@fuse/core/FuseLoading/FuseLoading';
import ReactPlayer from 'react-player';
import STTDashboardTableHead from './STTDashboardTableHead';
import { sttSelectors } from '../store/sttSlice';

const baseUrl = process.env.REACT_APP_STT_BASE_URL;

function STTDashboardTable() {
  const isSttDataLoading = useSelector((state) => state.sttApp.sttData.isSttDataLoading);
  const sttData = useSelector(sttSelectors.selectAll);
  const [selected, setSelected] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);

  const [order, setOrder] = useState({
    direction: 'asc',
    id: null,
  });

  function handleRequestSort(event, property) {
    const id = property;
    let direction = 'desc';

    if (order.id === property && order.direction === 'desc') {
      direction = 'asc';
    }

    setOrder({
      direction,
      id,
    });
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      setSelected(sttData.map((n) => n.id));
      return;
    }
    setSelected([]);
  }

  function handleDeselect() {
    setSelected([]);
  }

  function handleClick(item) {
    const rowIndex = expandedRows?.indexOf(item.id);
    if (rowIndex === -1) {
      setExpandedRows([...expandedRows, item.id]);
    } else {
      const newExpandedRows = [...expandedRows];
      newExpandedRows?.splice(rowIndex, 1);
      setExpandedRows(newExpandedRows);
    }
  }

  if (isSttDataLoading && sttData.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <FuseLoading />
      </div>
    );
  }

  if (sttData?.length === 0) {
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
      <div className="">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <STTDashboardTableHead
            selectedIds={selected}
            order={order}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={sttData?.length}
            onMenuItemClick={handleDeselect}
          />

          <TableBody>
            {sttData.map((n) => {
              const isSelected = selected.indexOf(n.id) !== -1;
              const isRowExpanded = expandedRows.includes(n.id);

              return (
                <React.Fragment key={n.id}>
                  <TableRow
                    className={`h-2 cursor-pointer ${isRowExpanded ? 'expanded' : ''}`}
                    hover
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    selected={isSelected}
                    onClick={() => handleClick(n)}
                  >
                    <TableCell className="w-[30%] p-2 md:p-8" component="th" scope="row">
                      {n.video_name && (
                        // <audio controls>
                        //   <source src={`${baseUrl}/audio/${n.audio_name}`} type="audio/wav" />
                        //   Your browser does not support the audio element.
                        // </audio>

                        <ReactPlayer
                          url={`${baseUrl}/videos/${n.video_name}`}
                          controls
                          width="auto"
                          height="180px"
                        />
                      )}
                    </TableCell>

                    <TableCell className="w-[10%] h-68 p-2 md:p-8" component="th" scope="row">
                      {n.created_date}
                    </TableCell>

                    <TableCell className="w-[10%] h-68 p-2 md:p-8" component="th" scope="row">
                      {n.created_time}
                    </TableCell>

                    <TableCell
                      className="w-[60%] h-68 p-2 md:p-8 urdu-text"
                      component="th"
                      scope="row"
                      align="right"
                    >
                      <div className="h-120 overflow-y-auto">
                        <p style={{ lineHeight: '4rem' }}>{n.transcription}</p>
                      </div>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default withRouter(STTDashboardTable);
