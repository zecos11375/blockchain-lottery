import { useCallback, useEffect, useRef, useState } from "react";
import { ChocolatePieLottery } from "../libs/ChocolatePieLottery";
// import { useWallet } from "../providers/walletProvider";
import { utils } from "../utils";
import { hexToArray } from "../utils/hexToArray";
import { convertUnixTimestamp } from "../utils/convertUnixTimestamp";
import Web3 from "web3";

// interface Obj {
//   [key: string]: string;
// }

interface Lottery {
  status: string;
  startTime: string[];
  endTime: string[];
  priceTicketInCake: string;
  discountDivisor: string;
  rewardsBreakdown: string[];
  treasuryFee: string;
  cakePerBracket: string[];
  countWinnersPerBracket: string[];
  firstTicketId: string;
  firstTicketIdNextLottery: string;
  amountCollectedInCake: string;
  finalNumber: string;
}

const useLotteryRound = () => {
  const provider = utils.chain.getChainProvider();

  const contractAddress = "0x6B3F1e8667ab53C95fb6BEef19A2022b474E6a84";
  const privateKey =
    "291a898b58fd553895654e80a840dce67adea67e0f09d582b095a4506aeb5d46";
  const address = "0x3FEa2E387dCea2De77D03303f1F9205011Abc5cF";

  const loadingRef = useRef(false);
  const [loading, setLoading] = useState(false);
  const [contract, setContract] = useState<ChocolatePieLottery>();

  const [currentId, setCurrentId] = useState<any>();
  const [currentLottery, setCurrentLottery] = useState<Lottery>();

  // const lottertKey = [
  //   "status",
  //   "startTime",
  //   "endtime",
  //   "priceTicketInCake",
  //   "discountDivisor",
  //   "rewardsBreakdown0",
  //   "rewardsBreakdown1",
  //   "rewardsBreakdown2",
  //   "rewardsBreakdown3",
  //   "rewardsBreakdown4",
  //   "rewardsBreakdown5",
  //   "treasuryFee",
  //   "cakePerBracket0",
  //   "cakePerBracket1",
  //   "cakePerBracket2",
  //   "cakePerBracket3",
  //   "cakePerBracket4",
  //   "cakePerBracket5",
  //   "countWinnersPerBracket0",
  //   "countWinnersPerBracket1",
  //   "countWinnersPerBracket2",
  //   "countWinnersPerBracket3",
  //   "countWinnersPerBracket4",
  //   "countWinnersPerBracket5",
  //   "firstTicketId",
  //   "firstTicketIdNextLottery",
  //   "amountCollectedInCake",
  //   "finalNumber",
  // ];

  // const arrayToObj = (keys: string[], values: string[]) => {
  //   const obj = values.reduce((acc: Obj, value, index) => {
  //     const key = keys[index];
  //     acc[key] = value;
  //     return acc;
  //   }, {});
  //   return obj;
  // };

  const transformArrayToObject = (arr: string[]): Lottery => {
    const obj: Lottery = {
      status: arr[0],
      startTime: convertUnixTimestamp(Number(arr[1])),
      endTime: convertUnixTimestamp(Number(arr[2])),
      priceTicketInCake: arr[3],
      discountDivisor: arr[4],
      rewardsBreakdown: [arr[5], arr[6], arr[7], arr[8], arr[9], arr[10]],
      treasuryFee: arr[11],
      cakePerBracket: [arr[12], arr[13], arr[14], arr[15], arr[16], arr[17]],
      countWinnersPerBracket: [
        arr[18],
        arr[19],
        arr[20],
        arr[21],
        arr[22],
        arr[23],
      ],
      firstTicketId: arr[24],
      firstTicketIdNextLottery: arr[25],
      amountCollectedInCake: arr[26],
      finalNumber: arr[27],
    };
    return obj;
  };

  const onChangeLoading = useCallback((v: boolean) => {
    setLoading(v);
    loadingRef.current = v;
  }, []);

  const fetchCurrentId = useCallback(async () => {
    try {
      if (loadingRef.current) return;
      onChangeLoading(true);

      const id = await contract?.viewCurrentLotteryId();

      onChangeLoading(false);

      if (id !== undefined) {
        setCurrentId(Web3.utils.hexToNumberString(id));
        const hexLottery = await contract?.viewLottery(id);
        if (hexLottery)
          setCurrentLottery(transformArrayToObject(hexToArray(hexLottery)));
      }
    } catch (e) {
      onChangeLoading(false);
      console.log(e);
    }
  }, [contract, onChangeLoading]);

  useEffect(() => {
    fetchCurrentId();
  }, [contract, fetchCurrentId]);

  useEffect(() => {
    if (contractAddress && address && privateKey) {
      setContract(
        new ChocolatePieLottery(provider, contractAddress, privateKey, address)
      );
    }
  }, []);

  return {
    currentId,
    currentLottery,
    fetchCurrentId,
    loadingRef,
  };
};

export default useLotteryRound;
