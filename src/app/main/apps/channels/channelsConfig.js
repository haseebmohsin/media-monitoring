import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const Channels = lazy(() => import('./Channels'));

const channelsConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'channels',
      element: <Channels />,
    },
    {
      path: 'channels/:channelSlug',
      element: <Channels />,
    },
  ],
};

export default channelsConfig;
