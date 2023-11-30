import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import reducer from '../store';
import STTDashboardHeader from './STTDashboardHeader';
import STTDashboardContent from './STTDashboardContent';

function STTDashboardHome() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <FusePageCarded
      header={<STTDashboardHeader />}
      content={<STTDashboardContent />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default withReducer('sttApp', reducer)(STTDashboardHome);
