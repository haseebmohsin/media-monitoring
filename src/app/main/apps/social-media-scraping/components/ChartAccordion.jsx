import { useState } from 'react';
import { AccordionDetails } from '@mui/material';
import AnalyticsDashboardApp from 'src/app/main/analytics/AnalyticsDashboardApp';
import { motion } from 'framer-motion';
import CustomAccordion from './CustomAccordion';

const chartItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

function ChartAccordion() {
  const [expanded, setExpanded] = useState([]);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded((prevExpanded) => {
      if (newExpanded) {
        if (prevExpanded.includes(panel)) {
          return prevExpanded.filter((item) => item !== panel);
        }
        return [...prevExpanded, panel];
      }
      return prevExpanded.filter((item) => item !== panel);
    });
  };

  return (
    <div className="pb-3">
      <CustomAccordion
        id="mention-chart"
        title="Mention Charts"
        expanded={expanded}
        handleChange={handleChange}
      >
        <AccordionDetails>
          <motion.div variants={chartItem} className="sm:col-span-2 lg:col-span-3">
            <AnalyticsDashboardApp />
          </motion.div>
        </AccordionDetails>
      </CustomAccordion>
    </div>
  );
}

export default ChartAccordion;
