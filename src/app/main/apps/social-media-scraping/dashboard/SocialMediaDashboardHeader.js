/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useState } from 'react';
import { Button, Grid, Input, Link } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import ChannelFilter from 'app/shared-components/filters/ChannelFilter';
import CategoryFilter from 'app/shared-components/filters/CategoryFilter';
import CountryFilter from 'app/shared-components/filters/CountryFilter';
import SentimentFilter from 'app/shared-components/filters/SentimentFilter';
import RelevanceFilter from 'app/shared-components/filters/RelevanceFilter';
import LanguageFilter from 'app/shared-components/filters/LanguageFilter';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { motion } from 'framer-motion';
import DatePickerComponent from 'app/shared-components/DatePickerComponent';
import AddKeywordOrLink from 'src/app/main/apps/social-media-scraping/components/AddKeywordOrLink';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import useLocalStorage from '@fuse/hooks/useLocalStorage';
import PlatformSelectionList from '../components/PlatformSelectionList';
import ChartAccordion from '../components/ChartAccordion';
import { getFilteredScrappedData, selectRadioValue } from '../store/socialMediaScrapingSlice';

function SocialMediaDashboardHeader() {
  const dispatch = useDispatch();
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedPlatforms, setSelectedPlatform] = useState([]);
  const [enteredLinks, setEnteredLinks] = useLocalStorage('enteredLinks', []);
  const [enteredKeywordsData, setEnteredKeywordsData] = useLocalStorage('enteredKeywordsData', []);
  const selectedRadioValue = useSelector(selectRadioValue);

  const handlePlatformClick = (iconId) => {
    if (selectedPlatforms.includes(iconId)) {
      setSelectedPlatform(selectedPlatforms.filter((platform) => platform !== iconId));
    } else {
      setSelectedPlatform([...selectedPlatforms, iconId]);
    }
  };

  const handleGetScrappedData = () => {
    const keywordArray = enteredKeywordsData.map((item) => item.keyword);

    const data = {
      keyword: search,
      start_date: startDate !== null ? dayjs(startDate).format('YYYY-MM-DD') : null,
      end_date: endDate !== null ? dayjs(endDate).format('YYYY-MM-DD') : null,
      platforms: selectedPlatforms,
      isProfilesBased: selectedRadioValue === 'profile',
      profiles: selectedRadioValue === 'profile' ? enteredLinks : [],
      isKeywordsBased: selectedRadioValue === 'keywords',
      keywords: selectedRadioValue === 'keywords' ? keywordArray : [],
    };

    dispatch(getFilteredScrappedData(data));
  };

  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };

  const handleEnterKey = (event) => {
    if (event.key === 'Enter' && search.trim() !== '') {
      console.log('hello');
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col md:flex-row gap-y-8 items-center justify-between gap-6 w-full">
        <div className="flex flex-col md:flex-row items-center justify-start w-full lg:w-[70%] space-x-6 gap-y-3">
          <div className="w-full md:w-[60%] lg:w-[47%]">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { delay: 0.3 } }}
              className="flex items-center w-full space-x-8 px-16 rounded-lg border-1 shadow-0 bg-white"
            >
              <FuseSvgIcon color="disabled">heroicons-solid:search</FuseSvgIcon>

              <Input
                className="flex flex-1"
                placeholder="Enter Keyword"
                disableUnderline
                fullWidth
                value={search}
                inputProps={{
                  'aria-label': 'Search',
                }}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                onKeyPress={handleEnterKey}
              />
            </motion.div>
          </div>

          <div className="flex items-center justify-center gap-4 w-full lg:w-[40%]">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { delay: 0.3 } }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full"
            >
              <DatePickerComponent
                label="Start Date"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
              />

              <DatePickerComponent
                label="End Date"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
              />
            </motion.div>

            <Button
              className="rounded-lg bg-white hover:bg-white"
              component={Link}
              variant="outlined"
              color="primary"
              type="submit"
              onClick={handleGetScrappedData}
            >
              Apply
            </Button>
          </div>
        </div>

        <div className="flex justify-end gap-8">
          <div>
            <div>
              <PlatformSelectionList
                className="p-8 rounded-md"
                selectedPlatformNames={selectedPlatforms}
                handlePlatformClick={handlePlatformClick}
              />
            </div>
          </div>

          <div>
            <Button
              className="rounded-lg"
              variant="outlined"
              onClick={toggleFilters}
              startIcon={<FilterListIcon />}
            >
              Filters
            </Button>
          </div>
        </div>
      </div>

      {filtersVisible && (
        <div className="w-full py-6">
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={3} lg={2}>
              <ChannelFilter />
            </Grid>

            <Grid item xs={12} sm={6} md={3} lg={2}>
              <CategoryFilter />
            </Grid>

            <Grid item xs={12} sm={6} md={3} lg={2}>
              <RelevanceFilter />
            </Grid>

            <Grid item xs={12} sm={6} md={3} lg={2}>
              <SentimentFilter />
            </Grid>

            <Grid item xs={12} sm={6} md={3} lg={2}>
              <CountryFilter />
            </Grid>

            <Grid item xs={12} sm={6} md={3} lg={2}>
              <LanguageFilter />
            </Grid>
          </Grid>
        </div>
      )}

      {/* <div className="w-full">
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={3}>
            <SocialMediaAnalyticsResultCard title="Total Mentions" total="90" unique="50" />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <SocialMediaAnalyticsResultCard title="Social Reach" total="90" unique="50" />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <SocialMediaAnalyticsResultCard title="Social Engagement" total="90" unique="50" />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <SocialMediaAnalyticsResultCard title="Sentiment Analysis" total="90" unique="50" />
          </Grid>
        </Grid>
      </div> */}

      <AddKeywordOrLink />

      <ChartAccordion />
    </div>
  );
}

export default SocialMediaDashboardHeader;
