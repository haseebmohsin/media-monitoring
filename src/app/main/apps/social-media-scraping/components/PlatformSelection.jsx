/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

export default function PlatformSelection(props) {
  const { platform, selectedPlatformNames, handlePlatformClick, className, ZIndex } = props;

  const defaultClasses = 'p-4 rounded-md cursor-pointer';
  const classes = className ?? defaultClasses;

  let { backgroundColor } = platform;

  // Check if at least one platform is selected
  const isAtLeastOneSelected = selectedPlatformNames?.length > 0;

  // Check if the platform is selected
  const isSelected = selectedPlatformNames?.includes(platform.platformName);

  if (isAtLeastOneSelected) {
    if (isSelected) {
      backgroundColor = platform.backgroundColor;
    } else {
      backgroundColor = '#6B7280';
    }
  }

  const dynamicStyles = {
    backgroundColor,
    zIndex: ZIndex,
  };

  return (
    <div
      id={platform.platformName}
      className={classes}
      style={dynamicStyles}
      onClick={() => handlePlatformClick(platform.platformName)}
    >
      {platform.icon}
    </div>
  );
}
