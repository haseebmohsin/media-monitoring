import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import reducer from '../../store';
import FaceTrakkClusterHeader from './FaceTrakkClusterHeader';
import FaceTrakkClusterContent from './FaceTrakkClusterContent';

function FaceTrakkClusterHome() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <FusePageCarded
      header={<FaceTrakkClusterHeader />}
      content={<FaceTrakkClusterContent />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default withReducer('faceTrakkApp', reducer)(FaceTrakkClusterHome);
