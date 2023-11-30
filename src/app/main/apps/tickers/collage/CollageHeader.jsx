import { useState } from 'react';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import Stack from '@mui/material/Stack';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import SendIcon from '@mui/icons-material/Send';
import history from '@history';
import { showMessage } from 'app/store/fuse/messageSlice';
import { toBlob } from 'html-to-image';
import Back from 'app/shared-components/Back';

function CollageHeader(props) {
  const dispatch = useDispatch();
  const selectedTickers = useSelector((state) => state.tickersApp?.tickers?.selectedTickers);
  const [copying, setCopying] = useState(false);
  const [downloading, setDownloading] = useState(false);

  // Check if selectedTickers is empty and navigate to app/tickers/home if it is
  if (!selectedTickers || selectedTickers.length === 0) {
    history.push('/apps/tickers/home');
    return null;
  }

  const handleCopyToClipboard = async () => {
    setCopying(true);
    const collageElement = document.getElementById('collage');

    const blob = await toBlob(collageElement);

    navigator.clipboard.write([
      new ClipboardItem({
        [blob.type]: blob,
      }),
    ]);

    dispatch(showMessage({ message: 'Collage Copied' }));
    setCopying(false);
  };

  const handleDownloadCollage = async () => {
    const collageElement = document.getElementById('collage');

    if (collageElement) {
      try {
        // Capture the content as an image
        const blob = await toBlob(collageElement);

        // Default filename and file type
        const options = {
          suggestedName: 'collage.png',
          types: [
            {
              description: 'PNG Files',
              accept: { 'image/png': ['.png'] },
            },
          ],
          // Set the default download directory to the user's download folder
          startIn: 'downloads',
        };

        // Request access to the file system with default filename, type, and download directory
        const handle = await window.showSaveFilePicker(options);

        // Create a writable stream to the selected file
        const writableStream = await handle.createWritable();

        // Write the image data (blob) to the file
        await writableStream.write(blob);

        // Close the file
        await writableStream.close();

        dispatch(showMessage({ message: 'Collage Downloaded' }));
      } catch (error) {
        console.error('Error saving collage:', error);
      }
    }
  }

  const handleSendOnWhatsApp = () => {
    // const mobileNumber = '923119633700';
    // const url = `https://wa.me/${mobileNumber}`;

    const url = `https://api.whatsapp.com`;
    window.open(url, '_blank');
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between space-y-16 sm:space-y-0 space-x-12 flex-1 w-full py-24 px-2 md:px-8">
      <div className="flex items-center justify-center space-x-16">
        <Back />

        <Typography
          component={motion.span}
          initial={{ x: -20 }}
          animate={{ x: 0, transition: { delay: 0.2 } }}
          delay={800}
          className="text-24 md:text-32 font-bold tracking-wide mr-12"
        >
          Collage
        </Typography>
      </div>

      {selectedTickers?.length > 0 && (
        <div className="flex items-center justify-end mb-14">
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              endIcon={<FileCopyOutlinedIcon />}
              onClick={handleCopyToClipboard}
              disabled={copying}
            >
              {copying ? 'Copying...' : 'Copy to Clipboard'}
            </Button>

            <Button
              variant="outlined"
              endIcon={<DownloadOutlinedIcon />}
              onClick={handleDownloadCollage}
              disabled={downloading}
            >
              {downloading ? 'Downloading...' : 'Download'}
            </Button>

            <Button variant="outlined" endIcon={<SendIcon />} onClick={handleSendOnWhatsApp}>
              Send
            </Button>
          </Stack>
        </div>
      )}
    </div>
  );
}

export default CollageHeader;
