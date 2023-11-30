/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

export default function PlatformSelection(props) {
  const { platform, selectedPlatform, handlePlatformClick, className = '' } = props;

  const defaultClasses = 'p-4 rounded-md cursor-pointer';
  let { backgroundColor } = platform;

  // Check if at least one platform is selected
  const isAtLeastOneSelected = selectedPlatform.length > 0;

  // Check if the platform is selected
  const isSelected = selectedPlatform.includes(platform.platformName);

  if (isAtLeastOneSelected) {
    if (isSelected) {
      backgroundColor = platform.backgroundColor;
    } else {
      backgroundColor = '#6B7280';
    }
  }

  const dynamicStyles = {
    backgroundColor,
  };

  return (
    <div
      id={platform.platformName}
      className={`${defaultClasses} ${className}`}
      style={dynamicStyles}
      onClick={() => handlePlatformClick(platform.platformName)}
    >
      {platform.icon}
    </div>
  );
}
