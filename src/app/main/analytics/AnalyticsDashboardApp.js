/* eslint-disable react/no-unstable-nested-components */

import withReducer from 'app/store/withReducer';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from '@lodash';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { motion } from 'framer-motion';
import reducer from './store';
import { getWidgets, selectWidgets } from './store/widgetsSlice';
import AnalyticsDashboardAppHeader from './AnalyticsDashboardAppHeader';
import MentionsOverviewWidget from './widgets/MentionsOverviewWidget';
import PlatformMentionsWidget from './widgets/PlatformMentionsWidget';
import SentimentAnalysisWidget from './widgets/SentimentAnalysisWidget';
import SocialReachWidget from './widgets/SocialReachWidget';

function AnalyticsDashboardApp() {
  const dispatch = useDispatch();
  const widgets = useSelector(selectWidgets);

  useEffect(() => {
    dispatch(getWidgets());
  }, [dispatch]);

  return (
    <FusePageSimple
      header={<AnalyticsDashboardAppHeader />}
      content={
        <>
          {useMemo(() => {
            const container = {
              show: {
                transition: {
                  staggerChildren: 0.06,
                },
              },
            };

            const item = {
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            };

            return (
              !_.isEmpty(widgets) && (
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-32 w-full p-5"
                  variants={container}
                  initial="hidden"
                  animate="show"
                >
                  <motion.div variants={item} className="sm:col-span-2 lg:col-span-3">
                    <MentionsOverviewWidget />
                  </motion.div>

                  <div className="sm:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-32 w-full">
                    <motion.div variants={item} className="">
                      <PlatformMentionsWidget />
                    </motion.div>

                    <motion.div variants={item} className="">
                      <SentimentAnalysisWidget />
                    </motion.div>

                    <motion.div variants={item} className="">
                      <SocialReachWidget />
                    </motion.div>
                  </div>
                </motion.div>
              )
            );
          }, [widgets])}
        </>
      }
    />
  );
}

export default withReducer('analyticsDashboardApp', reducer)(AnalyticsDashboardApp);
