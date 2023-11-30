const formatDate = (inputDate) => {
  const parts = inputDate.split('-');

  if (parts.length === 3) {
    // Get the last two digits of the year
    const year = parts[0].slice(-2);

    return `${parts[2]}-${parts[1]}-${year}`;
  }
  return 'Invalid Date Format';
};

export default formatDate;
