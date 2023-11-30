/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import withRouter from '@fuse/core/withRouter';
import { showMessage } from 'app/store/fuse/messageSlice';
import { Typography } from '@mui/material';
import { motion } from 'framer-motion';
import FuseLoading from '@fuse/core/FuseLoading/FuseLoading';
import ReactPlayer from 'react-player';
import STTUploadTableHead from './STTUploadTableHead';

const baseUrl = process.env.REACT_APP_STT_BASE_URL;

function STTUploadTable({ sttData }) {
  const dispatch = useDispatch();
  const [isSttDataLoading, setIsSttDataLoading] = useState(false);
  const [selected, setSelected] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);
  // const [sttData, setSttData] = useState([]);
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

  function handleCheck(event, id) {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  }

  function handleCopyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      dispatch(showMessage({ message: 'Text Copied' }));
    });
  }

  // function handleLoadMore() {
  //   try {
  //     const filteredObject = {
  //       ...filters,
  //       oldDataCount: sttData.length,
  //     };

  //     dispatch(getFilteredsttData(filteredObject));
  //   } catch (error) {
  //     console.log(error);
  //     dispatch(showMessage({ message: 'Something went wrong' }));
  //   }
  // }

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
          <STTUploadTableHead
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
                    className={`h-8 cursor-pointer ${isRowExpanded ? 'expanded' : ''}`}
                    hover
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    selected={isSelected}
                    onClick={() => handleClick(n)}
                  >
                    <TableCell className="w-[30%] p-8 md:p-16" component="th" scope="row">
                      {n.video_name && (
                        // <video
                        //   src={`${baseUrl}/videos/${n.video_name}`}
                        //   width="300"
                        //   height="80"
                        //   controls
                        // />

                        <ReactPlayer
                          url={`${baseUrl}/videos/${n.video_name}`}
                          controls
                          width="auto"
                          height="180px"
                        />
                      )}
                    </TableCell>

                    <TableCell className="w-[10%] h-68 p-8 md:p-16" component="th" scope="row">
                      {n.created_date}
                    </TableCell>

                    <TableCell
                      className="w-[60%] h-68 p-8 md:p-16 urdu-text"
                      component="th"
                      scope="row"
                      align="right"
                    >
                      <div className="h-120 overflow-y-auto">
                        <p style={{ lineHeight: '4rem' }}>{n.transcription}</p>
                      </div>
                    </TableCell>
                  </TableRow>

                  {/* {isRowExpanded && (
                    <TableRow>
                      <TableCell
                        colSpan={2}
                        className="p-4 md:p-16 text-right text-2xl urdu-text"
                        component="th"
                        scope="row"
                      >
                        {n.text_ocr}
                      </TableCell>

                      <TableCell
                        colSpan={8}
                        className="p-4 md:p-16 text-right text-2xl urdu-text"
                        component="th"
                        scope="row"
                      >
                        <Tooltip title="Copy to Clipboard" placement="top-start">
                          <IconButton
                            className="ml-24"
                            onClick={() => handleCopyToClipboard(n.text_ocr)}
                            size="small"
                          >
                            <FileCopyIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  )} */}
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* <div className="flex justify-center mt-28 mb-10">
        <Button
          className="rounded-lg whitespace-nowrap px-80"
          variant="outlined"
          color="primary"
          onClick={handleLoadMore}
        >
          Load More
        </Button>
      </div> */}
    </div>
  );
}

export default withRouter(STTUploadTable);
