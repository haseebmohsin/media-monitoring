import PlaceIcon from '@mui/icons-material/Place';
import LinkIcon from '@mui/icons-material/Link';
import PlatformSelectionList from './PlatformSelectionList';

const getBackgroundColorClass = (platform) => {
  switch (platform) {
    case 'web':
      return 'bg-yellow-50';
    case 'twitter':
      return 'bg-blue-50';
    case 'facebook':
      return 'bg-indigo-50';
    case 'youtube':
      return 'bg-red-50';
    default:
      return 'bg-gray-50';
  }
};

function SocialMediaCard({ item, platform }) {
  return (
    <div className={`p-8 rounded-lg shadow-lg ${getBackgroundColorClass(platform)}`}>
      <div id="card-header" className="flex items-center justify-between mb-4 p-2">
        {item.name ||
          (item.channel_name && (
            <span className="text-lg font-semibold">
              Posted by: <span className="text-blue-500">{item.channel_name || item.name}</span>
            </span>
          ))}

        <div>
          <PlatformSelectionList
            className="p-4 rounded-full cursor-default"
            selectedPlatformNames={[platform]}
            overlap
          />
        </div>
      </div>

      <div id="card-body" className="p-2">
        <div>
          {item.description ? (
            <p className="text-gray-600 mb-4">
              {item.description.length > 100
                ? `${item.description.substring(0, 80)}...`
                : item.description}
            </p>
          ) : (
            <div style={{ height: '50px' }} />
          )}
        </div>

        <div>
          <img
            className="h-[250px] w-[300px] object-cover mb-4"
            src={item.image || 'assets/images/apps/social-media-scraping/no-image.png'}
            alt={item.image ? 'post' : 'default'}
          />
        </div>
      </div>

      <div id="card-footer" className="p-2">
        {item.location && (
          <div className="flex items-center">
            <PlaceIcon className="text-blue-700" />
            <span className="text-blue-500">{item.location}</span>
          </div>
        )}

        {item.link && (
          <div className="flex items-center justify-end">
            <a
              className="text-sm hover:text-md"
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ background: 'transparent', textDecoration: 'none' }}
            >
              <div className="flex items-center justify-center gap-2">
                <LinkIcon className="text-blue-700" />
                <span>View Post</span>
              </div>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default SocialMediaCard;
