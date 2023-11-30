import { memo, useEffect, useState } from 'react';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Typography from '@mui/material/Typography';
import withReducer from 'app/store/withReducer';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import useLocalStorage from '@fuse/hooks/useLocalStorage';
import { Button, Divider, Link, Tabs, Tab } from '@mui/material';
import html2pdf from 'html2pdf.js';
import NotificationCard from './NotificationCard';
import {
  dismissItem,
  getNotifications,
  selectNotifications,
  updateNotifications,
} from './store/dataSlice';
import reducer from './store';
import {
  closeNotificationPanel,
  selectNotificationPanelState,
  toggleNotificationPanel,
} from './store/stateSlice';

const urduChannels = ['Geo', 'Ary', 'Samaa', 'Express', 'Dunya'];
const englishChannels = ['IndiaToday', 'Aljazeera', 'Cnn', 'Rt', 'Bbc'];

const StyledSwipeableDrawer = styled(SwipeableDrawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    backgroundColor: theme.palette.background.default,
    width: 750,
  },
}));

function NotificationPanel(props) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const location = useLocation();
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState('urdu');
  const [pdfDownloadLoading, setPdfDownloadLoading] = useState(false);
  const state = useSelector(selectNotificationPanelState);
  const notifications = useSelector(selectNotifications);

  const [wordsListUrdu, setWordsListUrdu] = useLocalStorage('wordsListUrdu');
  const [wordsListEnglish, setWordsListEnglish] = useLocalStorage('wordsListEnglish');
  const [notificationsLargestId, setNotificationsLargestId] = useLocalStorage(
    'notificationsLargestId',
    null
  );

  const englishNotifications = notifications.filter((notification) =>
    englishChannels.includes(notification.channel_name)
  );

  const urduNotifications = notifications.filter((notification) =>
    urduChannels.includes(notification.channel_name)
  );

  useEffect(() => {
    const fetchNotifications = () => {
      const wordsList = [...wordsListUrdu, ...wordsListEnglish];
      const data = {
        wordsList,
        notificationsLargestId,
      };
      dispatch(getNotifications(data));
    };

    // Call the function immediately when the component mounts
    fetchNotifications();

    // Set up an interval to call the function every 30 seconds
    const intervalId = setInterval(fetchNotifications, 30000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [dispatch, notificationsLargestId, wordsListEnglish, wordsListUrdu]);

  useEffect(() => {
    if (state) {
      dispatch(closeNotificationPanel());
    }
    // eslint-disable-next-line
	}, [location, dispatch]);

  function handleClose() {
    dispatch(closeNotificationPanel());
  }

  function handleDismiss(id) {
    dispatch(dismissItem(id));
  }

  function handleDismissAll() {
    // Find the largest ID in the notifications array
    const largestId = Math.max(...notifications.map((notification) => notification.id));

    // Store the largest ID in localStorage
    setNotificationsLargestId(largestId);

    const wordsList = [...wordsListUrdu, ...wordsListEnglish];

    const data = {
      wordsList,
      notificationsLargestId,
    };
    dispatch(updateNotifications(JSON.stringify(data)));
  }

  // function demoNotification() {
  //   const item = NotificationModel({ title: 'Great Job! this is awesome.' });

  //   enqueueSnackbar(item.title, {
  //     key: item.id,
  //     // autoHideDuration: 3000,
  //     content: () => (
  //       <NotificationTemplate
  //         item={item}
  //         onClose={() => {
  //           closeSnackbar(item.id);
  //         }}
  //       />
  //     ),
  //   });

  //   dispatch(addNotification(item));
  // }

  const downloadKeywordsTablePDF = () => {
    setPdfDownloadLoading(true);
    const element = document.getElementById('notifications-container');

    const opt = {
      margin: 5,
      filename: 'keywords-cloud-report.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    html2pdf()
      .from(element)
      .save()
      .then(() => {
        setPdfDownloadLoading(false);
      });
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <StyledSwipeableDrawer
      open={state}
      anchor="right"
      onOpen={(ev) => {}}
      onClose={(ev) => dispatch(toggleNotificationPanel())}
      disableSwipeToOpen
    >
      <IconButton className="m-4 absolute top-0 right-0 z-999" onClick={handleClose} size="large">
        <FuseSvgIcon color="action">heroicons-outline:x</FuseSvgIcon>
      </IconButton>

      {notifications.length > 0 ? (
        <FuseScrollbars className="p-16">
          <div className="flex flex-col">
            <div className="flex flex-col pt-136 mb-36">
              <div className="flex justify-between items-center mb-12">
                <Tabs
                  value={selectedTab}
                  onChange={handleTabChange}
                  variant="fullWidth"
                  indicatorColor="secondary"
                  textColor="secondary"
                >
                  <Tab label="Urdu" value="urdu" />
                  <Tab label="English" value="english" />
                </Tabs>
                <Button
                  className="rounded-lg bg-white hover:bg-white"
                  component={Link}
                  variant="outlined"
                  color="secondary"
                  onClick={downloadKeywordsTablePDF}
                  disabled={pdfDownloadLoading}
                >
                  {pdfDownloadLoading ? 'Downloading...' : 'Download Report'}
                </Button>
              </div>

              <div className="flex justify-between">
                <Typography className="flex items-center text-28 font-semibold leading-none">
                  Notifications{' '}
                  {selectedTab === 'urdu' ? (
                    <span className="text-20 ml-12">{urduNotifications.length}</span>
                  ) : (
                    <span className="text-20 ml-12">{englishNotifications.length}</span>
                  )}
                </Typography>

                <Typography
                  className="underline cursor-pointer"
                  color="secondary"
                  onClick={handleDismissAll}
                >
                  dismiss all
                </Typography>
              </div>
            </div>

            <div id="notifications-container">
              {selectedTab === 'urdu' &&
                urduNotifications.length > 0 &&
                urduNotifications.map((item, index) => (
                  <div key={item.id}>
                    <NotificationCard className="mb-12 p-4" item={item} onClose={handleDismiss} />

                    <Divider className="my-6" />

                    {index > 0 && (index + 1) % 9 === 0 && <div className="html2pdf__page-break" />}
                  </div>
                ))}

              {selectedTab === 'english' &&
                englishNotifications.length > 0 &&
                englishNotifications.map((item, index) => (
                  <div key={item.id}>
                    <NotificationCard className="mb-12 p-4" item={item} onClose={handleDismiss} />

                    <Divider className="my-6" />

                    {index > 0 && (index + 1) % 9 === 0 && <div className="html2pdf__page-break" />}
                  </div>
                ))}
            </div>
          </div>
        </FuseScrollbars>
      ) : (
        <div className="flex flex-1 items-center justify-center p-16">
          <Typography className="text-24 text-center" color="text.secondary">
            There are no notifications for now.
          </Typography>
        </div>
      )}

      {/* <div className="flex items-center justify-center py-16">
        <Button size="small" variant="outlined" onClick={demoNotification}>
          Create a notification example
        </Button>
      </div> */}
    </StyledSwipeableDrawer>
  );
}

export default withReducer('notificationPanel', reducer)(memo(NotificationPanel));
