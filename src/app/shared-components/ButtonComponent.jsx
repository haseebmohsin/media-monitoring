import { Button } from '@mui/material';

function ButtonComponent({ title, isLoading = false, loadingText, onClick, className }) {
  const buttonClasses = `rounded-lg bg-white hover:bg-white my-6 whitespace-nowrap px-24 ${
    className || ''
  }`;

  const buttonStyle = {
    padding: '1px 16px',
  };

  return (
    <div
      className={`flex justify-end items-center gap-2 mb-3 text-lg ${
        isLoading ? 'cursor-wait' : ''
      }`}
    >
      <Button
        style={buttonStyle}
        className={buttonClasses}
        variant="outlined"
        color="primary"
        disabled={isLoading}
        onClick={onClick}
      >
        {isLoading ? loadingText : title}
      </Button>
    </div>
  );
}

export default ButtonComponent;
