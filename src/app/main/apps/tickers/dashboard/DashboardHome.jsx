import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import reducer from '../store';
import DashboardHeader from './DashboardHeader';
import DashboardTable from './DashboardTable';

function DashboardHome() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <FusePageCarded
      header={<DashboardHeader />}
      content={<DashboardTable />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default withReducer('tickersApp', reducer)(DashboardHome);
