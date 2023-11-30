import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Typography } from '@mui/material';
import FuseLoading from '@fuse/core/FuseLoading';
import SocialMediaCard from '../components/SocialMediaCard';
import {
  selectAnalyticsData,
  selectGetScrappedDataLoading,
  selectScrappedData,
  socialMediaSelectors,
} from '../store/socialMediaScrapingSlice';

function SocialMediaDashboardContent() {
  const isGetScrappedDataLoading = useSelector(selectGetScrappedDataLoading);
  const scrappedKeywordOrLinkData = useSelector(socialMediaSelectors.selectAll);
  const scrappedData = useSelector(selectScrappedData);
  const analyticsData = useSelector(selectAnalyticsData);

  const parsedScrappedData = scrappedData
    ? Object.entries(scrappedData).flatMap(([key, innerObject]) => {
        const keyBasedArray = innerObject ? Object.values(innerObject).flat() : [];
        const parsedData = {
          [key]: keyBasedArray,
        };
        return parsedData;
      })
    : [];

  const [web, youtube, twitter] = parsedScrappedData;

  console.log(web);
  console.log(twitter);
  console.log(youtube);

  console.log(analyticsData);

  if (isGetScrappedDataLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <FuseLoading />
      </div>
    );
  }

  if (scrappedData?.length === 0 && scrappedKeywordOrLinkData?.length === 0) {
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
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-20">
      {scrappedKeywordOrLinkData?.map((item, index) => (
        <SocialMediaCard key={index} item={item} platform="twitter" />
      ))}

      {twitter?.Twitter?.map((item, index) => (
        <SocialMediaCard key={index} item={item} platform="twitter" />
      ))}

      {youtube?.Youtube?.map((item, index) => (
        <SocialMediaCard key={index} item={item} platform="youtube" />
      ))}

      {web?.Web?.map((item, index) => (
        <SocialMediaCard key={index} item={item} platform="web" />
      ))}
    </div>
  );
}

export default SocialMediaDashboardContent;
