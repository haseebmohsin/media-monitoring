import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import reducer from '../store';
import CollageHeader from './CollageHeader';
import CollageContent from './CollageContent';

function CollageHome() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <FusePageCarded
      header={<CollageHeader />}
      content={<CollageContent />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default withReducer('tickersApp', reducer)(CollageHome);
