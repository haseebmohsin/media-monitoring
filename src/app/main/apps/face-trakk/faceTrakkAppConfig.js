import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const ComingSoonPage = lazy(() => import('../../404/ComingSoon'));

const FaceTrakkClustersHome = lazy(() => import('./training/clusters/FaceTrakkClustersHome'));
const FaceTrakkClusterHome = lazy(() => import('./training/cluster/FaceTrakkClusterHome'));

const FRDashboardHome = lazy(() => import('./dashboard/FRDashboardHome'));
const FRUploadHome = lazy(() => import('./upload/FRUploadHome'));

const faceTrakkAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/face-trakk',
      element: <Navigate to="dashboard" />,
    },

    {
      path: 'apps/face-trakk/dashboard',
      element: <FRDashboardHome />,
    },

    {
      path: 'apps/face-trakk/faces-cloud',
      element: <ComingSoonPage />,
    },

    {
      path: 'apps/face-trakk/training/clusters',
      element: <FaceTrakkClustersHome />,
    },

    {
      path: 'apps/face-trakk/training/clusters/:clusterId',
      element: <FaceTrakkClusterHome />,
    },

    {
      path: 'apps/face-trakk/upload',
      element: <FRUploadHome />,
    },
  ],
};

export default faceTrakkAppConfig;
