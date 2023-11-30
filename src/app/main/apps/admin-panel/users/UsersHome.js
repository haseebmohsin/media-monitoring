import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import reducer from '../store';
import UsersHeader from './UsersHeader';
import UsersContent from './UsersContent';

function UsersHome() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <FusePageCarded
      header={<UsersHeader />}
      content={<UsersContent />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default withReducer('adminPanelApp', reducer)(UsersHome);
