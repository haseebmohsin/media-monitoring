import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import reducer from '../store';
import FRDashboardHeader from './FRDashboardHeader';
import FRDashboardContent from './FRDashboardContent';

function FRDashboardHome() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <FusePageCarded
      header={<FRDashboardHeader />}
      content={<FRDashboardContent />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default withReducer('faceTrakkApp', reducer)(FRDashboardHome);
