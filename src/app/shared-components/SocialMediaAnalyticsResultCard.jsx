import ForumIcon from '@mui/icons-material/Forum';
import CampaignIcon from '@mui/icons-material/Campaign';
import ShareIcon from '@mui/icons-material/Share';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import { Radio } from '@mui/material';

function SocialMediaAnalyticsResultCard(props) {
  const { title, total, unique } = props;

  const titleStyles = {
    'Total Mentions': {
      bgColor: '#D3004D',
      icon: <ForumIcon className="text-3xl text-white transform scale-110 hover:scale-125" />,
    },
    'Social Reach': {
      bgColor: '#4FB8F4',
      icon: <CampaignIcon className="text-3xl text-white transform scale-110 hover:scale-125" />,
    },
    'Social Engagement': {
      bgColor: '#F14F02',
      icon: <ShareIcon className="text-3xl text-white transform scale-110 hover:scale-125" />,
    },
    'Sentiment Analysis': {
      bgColor: '#33B35A',
      icon: (
        <SentimentSatisfiedIcon className="text-3xl text-white transform scale-110 hover:scale-125" />
      ),
    },
  };

  const { bgColor, icon } = titleStyles[title] || {
    bgColor: '#000000',
    icon: <ForumIcon className="text-3xl text-white transform scale-110 hover:scale-125" />,
  };

  const handleRadioChange = () => {
    console.log('hello');
  };

  return (
    <div className="flex items-start justify-between p-3 rounded-lg bg-white">
      <div className="flex items-start justify-between gap-8">
        <div className="p-16 rounded-md cursor-pointer" style={{ backgroundColor: bgColor }}>
          {icon}
        </div>

        <div className="mt-1">
          <div className="text-md text-gray-800">{title}</div>

          <div className="flex items-center">
            <div className="text-sm mr-4">{total} total</div>
            <div className="text-sm">{unique} unique</div>
          </div>
        </div>
      </div>

      <div className="">
        <Radio
          checked={false}
          onChange={handleRadioChange}
          value={false}
          name="radio-buttons"
          inputProps={{ 'aria-label': 'B' }}
        />
      </div>
    </div>
  );
}

export default SocialMediaAnalyticsResultCard;
