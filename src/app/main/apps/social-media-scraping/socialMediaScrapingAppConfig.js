import { lazy } from 'react';

const SocialMediaDashboardHome = lazy(() => import('./dashboard/SocialMediaDashboardHome'));

const ComingSoonPage = lazy(() => import('../../404/ComingSoon'));

const socialMediaScrapingAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/scraping/dashboard',
      element: <SocialMediaDashboardHome />,
    },
  ],
};

export default socialMediaScrapingAppConfig;
