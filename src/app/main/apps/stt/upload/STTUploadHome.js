import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import reducer from '../store';
import STTUploadHeader from './STTUploadHeader';
import STTUploadContent from './STTUploadContent';

function STTUploadHome() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <FusePageCarded
      header={<STTUploadHeader />}
      content={<STTUploadContent />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default withReducer('sttApp', reducer)(STTUploadHome);
