import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import reducer from '../store';
import KeywordsCloudHeader from './KeywordsCloudHeader';
import KeywordsCloudContent from './KeywordsCloudContent';

function KeywordsCloudHome() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <FusePageCarded
      header={<KeywordsCloudHeader />}
      content={<KeywordsCloudContent />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default withReducer('tickersApp', reducer)(KeywordsCloudHome);
