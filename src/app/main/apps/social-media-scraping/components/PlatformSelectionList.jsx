import PlatformSelection from './PlatformSelection';
import platforms from '../data/platforms';

export default function PlatformSelectionList(props) {
  const { selectedPlatformNames, handlePlatformClick, className, overlap = false } = props;

  const space = overlap ? '-space-x-24 hover:space-x-0' : 'space-x-6';

  // Initializing z-index variable
  let zIndexValue = 99;

  // Default no-operation function if handlePlatformClick is not provided
  const defaultHandlePlatformClick = () => {};

  // Filter platforms based on selectedPlatformNames if overlap is true
  const filteredPlatforms = overlap
    ? platforms.filter((platform) => selectedPlatformNames.includes(platform.platformName))
    : platforms;

  return (
    <div className={`flex items-center ${space}`}>
      {filteredPlatforms.map((platform, index) => {
        const currentZIndex = zIndexValue;
        zIndexValue += 1;

        return (
          <PlatformSelection
            className={className}
            key={platform.platformName}
            platform={platform}
            selectedPlatformNames={selectedPlatformNames}
            handlePlatformClick={
              handlePlatformClick
                ? () => handlePlatformClick(platform.platformName)
                : defaultHandlePlatformClick
            }
            // Applying different z-index for each iteration
            ZIndex={currentZIndex}
          />
        );
      })}
    </div>
  );
}
