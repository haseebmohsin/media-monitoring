import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

const platforms = [
  {
    platformName: 'web',
    icon: (
      <InsertDriveFileIcon className="text-xl text-white transform scale-105 hover:scale-110 -z-50" />
    ),
    backgroundColor: '#F39C12',
  },
  {
    platformName: 'twitter',
    icon: <TwitterIcon className="text-xl text-white transform scale-105 hover:scale-110 -z-50" />,
    backgroundColor: '#1D9BF0',
  },
  {
    platformName: 'facebook',
    icon: <FacebookIcon className="text-xl text-white transform scale-105 hover:scale-110 -z-50" />,
    backgroundColor: '#4867AA',
  },
  {
    platformName: 'youtube',
    icon: <YouTubeIcon className="text-xl text-white transform scale-105 hover:scale-110 -z-50" />,
    backgroundColor: '#FF0000',
  },
];

export default platforms;
