/* eslint-disable jsx-a11y/no-static-element-interactions */
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
import { makeStyles } from '@mui/styles';
import EditIcon from '@mui/icons-material/Edit';
import UsersTableHead from './UsersTableHead';
import { selectGetUsersLoading, usersSelectors } from '../store/usersSlice';
import UserDetailsModal from '../components/UserDetailsModal';

const useStyles = makeStyles((theme) => ({
  admin: {
    backgroundColor: '#557C55',
  },
  staff: {
    backgroundColor: '#BD9505',
  },
  user: {
    backgroundColor: '#606060',
  },
}));

function UsersTable() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const isUsersLoading = useSelector(selectGetUsersLoading);
  const users = useSelector(usersSelectors.selectAll);
  const [selectedUser, setSelectedUser] = useState({});
  const [selected, setSelected] = useState([]);
  const [order, setOrder] = useState({
    direction: 'asc',
    id: null,
  });

  useEffect(() => {
    console.log(users);
  }, [users]);

  const handleRequestSort = (property) => {
    const id = property;
    const direction = order.id === property && order.direction === 'desc' ? 'asc' : 'desc';

    setOrder({ direction, id });
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelected(users.map((n) => n._id));
    } else {
      setSelected([]);
    }
  };

  const handleDeselect = () => {
    setSelected([]);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsUserModalOpen(true);
  };

  if (isUsersLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <FuseLoading />
      </div>
    );
  }

  if (users.length === 0) {
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
        <UsersTableHead
          selectedIds={selected}
          order={order}
          onSelectAllClick={handleSelectAllClick}
          onRequestSort={handleRequestSort}
          rowCount={users.length}
          onMenuItemClick={handleDeselect}
        />

        <TableBody>
          {users.map((user) => {
            const isSelected = selected.indexOf(user._id) !== -1;

            return (
              <TableRow
                className="cursor-pointer py-4"
                hover
                role="checkbox"
                aria-checked={isSelected}
                tabIndex={-1}
                selected={isSelected}
                key={user._id}
              >
                <TableCell
                  className="w-[45px] px-4 md:px-8"
                  component="th"
                  scope="row"
                  padding="none"
                >
                  <img
                    className=""
                    src={`/assets/images/avatars/${user.photo}`}
                    alt="thumbnail"
                    width={60}
                    height={50}
                    onClick={() => setIsUserModalOpen(true)}
                  />
                </TableCell>

                <TableCell className="w-[90px] p-4 md:p-10" component="th" scope="row">
                  {user.displayName}
                </TableCell>

                <TableCell className="w-[90px] p-4 md:p-10" component="th" scope="row">
                  {user.email}
                </TableCell>

                <TableCell className="w-[90px] p-4 md:p-10" component="th" scope="row">
                  <span
                    className={`${
                      classes[user.role[0]]
                    } py-8 px-14 rounded-full text-white select-none`}
                  >
                    {user.role[0]}
                  </span>
                </TableCell>

                <TableCell
                  className="w-[90px] p-4 md:p-10"
                  component="th"
                  scope="row"
                  align="right"
                >
                  <span className="mr-24 text-blue-700" onClick={() => handleEditUser(user)}>
                    <EditIcon />
                  </span>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <UserDetailsModal
        selectedUser={selectedUser}
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
      />
    </div>
  );
}

export default UsersTable;
