import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import reducer from '../../store';
import FaceTrakkClustersHeader from './FaceTrakkClustersHeader';
import FaceTrakkClustersContent from './FaceTrakkClustersContent';

function FaceTrakkClustersHome() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <FusePageCarded
      header={<FaceTrakkClustersHeader />}
      content={<FaceTrakkClustersContent />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default withReducer('faceTrakkApp', reducer)(FaceTrakkClustersHome);
