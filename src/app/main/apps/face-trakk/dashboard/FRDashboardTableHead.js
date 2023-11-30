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
    id: 'thumbnail',
    align: 'left',
    disablePadding: false,
    label: 'Thumbnail',
    sort: true,
  },
  {
    id: 'person_name',
    align: 'left',
    disablePadding: false,
    label: 'Person Name',
    sort: true,
  },
  {
    id: 'start_time',
    align: 'left',
    disablePadding: false,
    label: 'Start Time',
    sort: true,
  },
  {
    id: 'end_time',
    align: 'left',
    disablePadding: false,
    label: 'End Time',
    sort: true,
  },
  {
    id: 'coverage_time',
    align: 'left',
    disablePadding: false,
    label: 'Coverage Time',
    sort: true,
  },
];

function FRDashboardTableHead(props) {
  const { selectedIds } = props;
  const numSelected = selectedIds.length;

  const dispatch = useDispatch();
  const [selectedMenu, setSelectedMenu] = useState(null);

  const createSortHandler = (property) => (event) => {
    props.onRequestSort(event, property);
  };

  function openSelectedMenu(event) {
    setSelectedMenu(event.currentTarget);
  }

  function closeSelectedMenu() {
    setSelectedMenu(null);
  }

  return (
    <TableHead>
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
      </TableRow>
    </TableHead>
  );
}

export default FRDashboardTableHead;
