import { lazy } from 'react';

const STTUploadHome = lazy(() => import('./upload/STTUploadHome'));
const STTDashboardHome = lazy(() => import('./dashboard/STTDashboardHome'));
const ComingSoonPage = lazy(() => import('../../404/ComingSoon'));

const sttAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/stt/dashboard',
      element: <STTDashboardHome />,
    },
    {
      path: 'apps/stt/keywords-cloud',
      element: <ComingSoonPage />,
    },
    {
      path: 'apps/stt/topic-modeling',
      element: <ComingSoonPage />,
    },
    {
      path: 'apps/stt/upload',
      element: <STTUploadHome />,
    },
  ],
};

export default sttAppConfig;
