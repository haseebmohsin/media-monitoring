import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import reducer from '../store';
import SocialMediaDashboardHeader from './SocialMediaDashboardHeader';
import SocialMediaDashboardContent from './SocialMediaDashboardContent';

function SocialMediaDashboardHome() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <FusePageCarded
      header={<SocialMediaDashboardHeader />}
      content={<SocialMediaDashboardContent />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default withReducer('socialMediaApp', reducer)(SocialMediaDashboardHome);
