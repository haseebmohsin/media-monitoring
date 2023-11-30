import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import reducer from '../store';
import FRUploadHeader from './FRUploadHeader';
import FRUploadContent from './FRUploadContent';

function FRUploadHome() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <FusePageCarded
      header={<FRUploadHeader />}
      content={<FRUploadContent />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default withReducer('faceTrakkApp', reducer)(FRUploadHome);
