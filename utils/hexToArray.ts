export const hexToArray = (hex: string): string[] => {
  if (!hex || typeof hex !== "string") {
    return [];
  }

  hex = hex.slice(2);

  // Split the hex string into chunks of 64 characters
  const hexChunks = hex.match(/.{1,64}/g);

  // Prepend "0x" to each chunk of hex values
  return hexChunks!.map((chunk) => parseInt(`0x${chunk}`, 16).toString());
};

// const bytesArray = Web3.utils.hexToBytes(hex);
// const numbersArray = [];

// for (let i = 0; i < bytesArray.length; i += 32) {
//   const slice = bytesArray.slice(i, i + 32);
//   const sliceString =
//     "0x" + slice.map((n) => n.toString(16).padStart(2, "0")).join("");
//   const number = Web3.utils.toBN(sliceString).toString();
//   numbersArray.push(number);
// }
// return numbersArray;
