export const formatNumber = (numStr: string | undefined = "0"): string => {
  const num = parseFloat(numStr);
  if (isNaN(num)) {
    return "0";
  }

  const options = {
    minimumFractionDigits: num % 1 === 0 ? 0 : 2,
    maximumFractionDigits: num % 1 === 0 ? 0 : 2,
    useGrouping: true,
  };

  return num.toLocaleString("en-US", options);
};
