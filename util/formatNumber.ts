export const formatNumber = (num: number): string => {
  const options = {
    minimumFractionDigits: num % 1 === 0 ? 0 : 2, // show 2 decimal places if num has a decimal part, 0 otherwise
    maximumFractionDigits: num % 1 === 0 ? 0 : 2, // same as minimumFractionDigits
    useGrouping: true, // add a thousands separator
  };

  return num.toLocaleString("en-US", options);
};
