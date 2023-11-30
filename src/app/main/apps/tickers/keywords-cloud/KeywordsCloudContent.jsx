import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactWordcloud from 'react-wordcloud';
import withReducer from 'app/store/withReducer';
import { Button, Divider, Link, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import html2pdf from 'html2pdf.js';
import { motion } from 'framer-motion';
import FuseLoading from '@fuse/core/FuseLoading';
import reducer from '../store';
import { selectIsKeywordsCloudLoading, selectKeywordsCloudData } from '../store/keywordsCloudSlice';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// const words = [
//   { text: 'پاکستان', value: 30 },
//   { text: 'انتخابات', value: 25 },
//   { text: 'سیاست', value: 22 },
// ];

const options = {
  colors: ['#450E02', '#006C16', '#1B0091', '#505000', '#C60A00'],
  transitionDuration: 1200,
  rotations: 0,
  rotationAngles: [0],
  fontScale: 0.7,
  fontSizes: [20, 50],
  fontWeight: 'normal',
  fontStyle: 'normal',
  scale: 'log',
  spiral: 'archimedean',
  padding: 10,
  fontFamily: 'Alvi Lahori Nastaleeq',
};

function KeywordsCloudContent() {
  const dispatch = useDispatch();
  const [pdfDownloadLoading, setPdfDownloadLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedWord, setClickedWord] = useState({
    text: '',
    value: '',
    objects: [],
  });

  const isKeywordsCloudLoading = useSelector(selectIsKeywordsCloudLoading);
  const keywordsCloudData = useSelector(selectKeywordsCloudData);

  const callbacks = {
    onWordClick: (e) => {
      setIsModalOpen(true);

      setClickedWord({
        text: e.text,
        value: e.value,
        objects: e.objects,
      });
    },
    onWordMouseOver: console.log,
    getWordTooltip: (word) => `${word.text} (${word.value}) [${word.value > 50 ? '' : ''}]`,
    //   getWordColor: (word) => (word.value > 50 ? 'blue' : 'red'),
  };

  const downloadKeywordsTablePDF = () => {
    setPdfDownloadLoading(true);
    const element = document.getElementById('keywords-cloud-container');

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

  if (isKeywordsCloudLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <FuseLoading />
      </div>
    );
  }

  if (keywordsCloudData?.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There are no data available
        </Typography>
      </motion.div>
    );
  }

  return (
    <>
      <div className="flex flex-col p-12 m-20">
        <div className="p-8 bg-white h-[600px]" id="keyword-cloud">
          {keywordsCloudData?.length > 0 && (
            <ReactWordcloud words={keywordsCloudData} callbacks={callbacks} options={options} />
          )}
        </div>
      </div>

      <Dialog
        open={isModalOpen}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        maxWidth="md"
        onClose={() => setIsModalOpen(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <div className="flex items-center justify-between mb-16">
            <div>
              Selected Trending Word: "{clickedWord.text}" is Repeated {clickedWord.value} Times"
            </div>

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
        </DialogTitle>

        <DialogContent>
          <DialogContentText>Table of news</DialogContentText>

          <div id="keywords-cloud-container">
            {clickedWord?.objects?.map((item, index) => (
              <div key={index} className="p-6">
                <div className="flex items-center">
                  <img
                    className="shrink-0 w-52 h-52 mr-12 rounded-lg overflow-hidden object-fill object-center"
                    src={`assets/images/apps/tickers/logos/${item.channel_image}`}
                    alt="Notification"
                  />

                  <div className="flex flex-col flex-auto">
                    <div
                      className="line-clamp-2 text-xl h-64 text-end pr-12 urdu-text"
                      dangerouslySetInnerHTML={{ __html: item.text_ocr }}
                    />

                    <Typography className="mt-4 text-md leading-none" color="text.secondary">
                      <span className="flex justify-end items-end mr-4">
                        <span>
                          <span className="mr-4">{item.date}</span>
                          {item.time}
                        </span>
                      </span>
                    </Typography>
                  </div>
                </div>

                <Divider className="my-6" />
                {index > 0 && (index + 1) % 9 === 0 && <div className="html2pdf__page-break" />}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default withReducer('tickersApp', reducer)(KeywordsCloudContent);
