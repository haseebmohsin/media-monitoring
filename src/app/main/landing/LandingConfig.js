import i18next from 'i18next';

import en from './i18n/en';
import tr from './i18n/tr';
import ar from './i18n/ar';
import Landing from './Landing';

i18next.addResourceBundle('en', 'landingPage', en);
i18next.addResourceBundle('tr', 'landingPage', tr);
i18next.addResourceBundle('ar', 'landingPage', ar);

const LandingConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'landing',
      element: <Landing />,
    },
  ],
};

export default LandingConfig;

/**
 * Lazy load Landing
 */
/*
import React from 'react';

const Landing = lazy(() => import('./Landing'));

const LandingConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'landing',
      element: <Landing />,
    },
  ],
};

export default LandingConfig;
*/
