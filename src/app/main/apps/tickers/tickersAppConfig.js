import { lazy } from 'react';

const DashboardHome = lazy(() => import('./dashboard/DashboardHome'));
const CollageHome = lazy(() => import('./collage/CollageHome'));
const KeywordsCloudHome = lazy(() => import('./keywords-cloud/KeywordsCloudHome'));

const ComingSoonPage = lazy(() => import('../../404/ComingSoon'));

const tickersAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/tickers/dashboard',
      element: <DashboardHome />,
    },
    {
      path: 'apps/tickers/keywords-cloud',
      element: <KeywordsCloudHome />,
    },
    {
      path: 'apps/tickers/collage',
      element: <CollageHome />,
    },
    {
      path: 'apps/tickers/topic-modeling',
      element: <ComingSoonPage />,
    },
  ],
};

export default tickersAppConfig;
