import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import TableHead from '@mui/material/TableHead';
import { lighten } from '@mui/material/styles';

const rows = [
  {
    id: 'video_name',
    align: 'left',
    disablePadding: false,
    label: 'Video',
    sort: true,
  },
  {
    id: 'created_date',
    align: 'left',
    disablePadding: false,
    label: 'Created Date',
    sort: true,
  },
  {
    id: 'transcription',
    align: 'right',
    disablePadding: false,
    label: 'Transcription',
    sort: true,
  },
];

function STTUploadTableHead(props) {
  const dispatch = useDispatch();
  const { selectedIds } = props;
  const numSelected = selectedIds.length;
  const [selectedTickersMenu, setSelectedTickersMenu] = useState(null);

  const createSortHandler = (property) => (event) => {
    props.onRequestSort(event, property);
  };

  function openSelectedTickersMenu(event) {
    setSelectedTickersMenu(event.currentTarget);
  }

  function closeSelectedTickersMenu() {
    setSelectedTickersMenu(null);
  }

  function handleMakeCollageClick() {
    props.onMenuItemClick();
    closeSelectedTickersMenu();

    // history.push('/apps/tickers/collage');
  }

  const TableStyles = (theme) => ({
    head1: {
      position: 'sticky',
      top: '0px',
      zIndex: 3,
    },
  });

  return (
    <TableHead className={TableStyles.head1}>
      <TableRow className="h-48 sm:h-64">
        {rows.map((row) => {
          return (
            <TableCell
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === 'light'
                    ? lighten(theme.palette.background.default, 0.4)
                    : lighten(theme.palette.background.default, 0.02),
              }}
              className="p-4 md:p-16"
              key={row.id}
              align={row.align}
              padding={row.disablePadding ? 'none' : 'normal'}
              sortDirection={props.order.id === row.id ? props.order.direction : false}
            >
              {row.sort && (
                <Tooltip
                  title="Sort"
                  placement={row.align === 'right' ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={props.order.id === row.id}
                    direction={props.order.direction}
                    onClick={createSortHandler(row.id)}
                    className="font-semibold"
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              )}
            </TableCell>
          );
        }, this)}

        {/* <TableCell
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? lighten(theme.palette.background.default, 0.4)
                : lighten(theme.palette.background.default, 0.02),
          }}
          className="w-64 z-99"
          align="left"
        >
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < props.rowCount}
            checked={props.rowCount !== 0 && numSelected === props.rowCount}
            onChange={props.onSelectAllClick}
          />

          {numSelected > 0 && (
            <Box
              className="flex items-center justify-center absolute w-64 top-0 ltr:left-26 rtl:right-0 mx-56 h-64 z-10 border-b-1"
              sx={{
                background: (theme) => theme.palette.background.default,
              }}
            >
              <IconButton
                aria-owns={selectedTickersMenu ? 'selectedTickersMenu' : null}
                aria-haspopup="true"
                onClick={openSelectedTickersMenu}
                size="large"
              >
                <FuseSvgIcon>heroicons-outline:dots-vertical</FuseSvgIcon>
              </IconButton>
              <Menu
                id="selectedTickersMenu"
                anchorEl={selectedTickersMenu}
                open={Boolean(selectedTickersMenu)}
                onClose={closeSelectedTickersMenu}
              >
                <MenuList>
                  <MenuItem onClick={handleMakeCollageClick}>
                    <ListItemIcon className="min-w-40">
                      <FuseSvgIcon>heroicons-outline:menu</FuseSvgIcon>
                    </ListItemIcon>
                    <ListItemText primary="Apply" />
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          )}
        </TableCell> */}
      </TableRow>
    </TableHead>
  );
}

export default STTUploadTableHead;
