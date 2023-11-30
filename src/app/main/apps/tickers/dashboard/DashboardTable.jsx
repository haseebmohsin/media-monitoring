import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import withRouter from '@fuse/core/withRouter';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { showMessage } from 'app/store/fuse/messageSlice';
import { Button, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import formatDate from 'src/app/helpers/formatDate';
import FuseLoading from '@fuse/core/FuseLoading/FuseLoading';
import DashboardTableHead from './DashboardTableHead';
import {
  getFilteredTickers,
  selectFilters,
  setSelectedTicker,
  tickersSelectors,
} from '../store/tickersSlice';

function DashboardTable(props) {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const tickers = useSelector(tickersSelectors.selectAll);
  const isTickersLoading = useSelector((state) => state.tickersApp.tickers.isTickersLoading);
  const [expandedRows, setExpandedRows] = useState([]);
  const [selected, setSelected] = useState([]);
  const [selectedWithNumbers, setSelectedWithNumbers] = useState([]);
  const [order, setOrder] = useState({
    direction: 'asc',
    id: null,
  });

  useEffect(() => {
    // Create an object to map the selected IDs to their respective numbers
    const selectedNumbersMap = {};
    selected.forEach((id, index) => {
      selectedNumbersMap[id] = index + 1;
    });

    // Update selectedWithNumbers array when selected checkboxes change
    const selectedWithNumbersArray = selected.map((id) => ({
      id,
      number: selectedNumbersMap[id], // Use the number from the map
    }));

    setSelectedWithNumbers(selectedWithNumbersArray);

    // Update the selectedTickers in Redux with the selected objects in the correct sequence
    const selectedObjects = selected.map((id) => tickers.find((ticker) => ticker.id === id));
    dispatch(setSelectedTicker(selectedObjects));
  }, [dispatch, selected, tickers]);

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
      setSelected(tickers.map((n) => n.id));
      return;
    }
    setSelected([]);
  }

  function handleDeselect() {
    setSelected([]);
  }

  function handleClick(item) {
    const rowIndex = expandedRows.indexOf(item.id);
    if (rowIndex === -1) {
      setExpandedRows([...expandedRows, item.id]);
    } else {
      const newExpandedRows = [...expandedRows];
      newExpandedRows.splice(rowIndex, 1);
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

  function handleLoadMore() {
    try {
      const filteredObject = {
        ...filters,
        oldDataCount: tickers.length,
      };

      dispatch(getFilteredTickers(filteredObject));
    } catch (error) {
      console.log(error);
      dispatch(showMessage({ message: 'Something went wrong' }));
    }
  }

  if (isTickersLoading && tickers.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <FuseLoading />
      </div>
    );
  }

  if (tickers?.length === 0) {
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
          <DashboardTableHead
            selectedIds={selected}
            order={order}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={tickers?.length}
            onMenuItemClick={handleDeselect}
          />

          <TableBody>
            {tickers.map((n) => {
              const isSelected = selected.indexOf(n.id) !== -1;
              const isRowExpanded = expandedRows.includes(n.id);
              const selectedNumber = selectedWithNumbers.find((item) => item.id === n.id)?.number;

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
                    <TableCell
                      className="w-[45px] h-44 px-4 md:px-8"
                      component="th"
                      scope="row"
                      padding="none"
                    >
                      <img
                        className="w-full h-full"
                        src={`assets/images/apps/tickers/logos/${n.channel_image}`}
                        alt={n.channel_image}
                      />
                    </TableCell>

                    <TableCell
                      className="sm:w-[250px] md:w-[350px] lg:w-[430px] xl:w-[550px] h-68 px-8 md:px-6"
                      component="th"
                      scope="row"
                      padding="none"
                    >
                      <img
                        className="w-full h-full object-fill"
                        src={`${process.env.REACT_APP_TICKERS_BASE_URL}/static/${n.ticker_image}`}
                        alt={n.channel_image}
                      />
                    </TableCell>

                    <TableCell className="w-[90px] h-68 p-8 md:p-16" component="th" scope="row">
                      {formatDate(n.date)}
                    </TableCell>

                    <TableCell className="w-[90px] h-68 p-8 md:p-16" component="th" scope="row">
                      {n.time}
                    </TableCell>

                    <TableCell className="w-64" align="left">
                      <Checkbox
                        checked={isSelected}
                        onClick={(event) => event.stopPropagation()}
                        onChange={(event) => handleCheck(event, n.id)}
                      />

                      {isSelected && selectedNumber && (
                        <span style={{ marginLeft: '8px' }}>{selectedNumber}</span>
                      )}
                    </TableCell>
                  </TableRow>

                  {isRowExpanded && (
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
                  )}
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-center mt-28 mb-10">
        <Button
          className="rounded-lg whitespace-nowrap px-80"
          variant="outlined"
          color="primary"
          onClick={handleLoadMore}
        >
          Load More
        </Button>
      </div>
    </div>
  );
}

export default withRouter(DashboardTable);
