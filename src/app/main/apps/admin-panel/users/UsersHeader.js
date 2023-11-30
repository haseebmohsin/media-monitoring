import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Typography } from '@mui/material';
import Back from 'app/shared-components/Back';
import { motion } from 'framer-motion';
import { getUsers } from '../store/usersSlice';

function UsersHeader(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div className="flex items-center gap-x-16 mb-10">
      <Back />

      <Typography
        component={motion.span}
        initial={{ x: -20 }}
        animate={{ x: 0, transition: { delay: 0.2 } }}
        delay={300}
        className="text-24 md:text-32 font-bold tracking-wider"
      >
        All Users
      </Typography>
    </div>
  );
}

export default UsersHeader;
