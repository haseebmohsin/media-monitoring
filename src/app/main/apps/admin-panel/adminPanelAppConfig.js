import { lazy } from 'react';
import { authRoles } from 'src/app/auth';

const UsersHome = lazy(() => import('./users/UsersHome'));

const adminPanelAppConfig = {
  settings: {
    layout: {},
  },
  auth: authRoles.admin,
  routes: [
    {
      path: 'apps/admin-panel/users',
      element: <UsersHome />,
    },
  ],
};

export default adminPanelAppConfig;
