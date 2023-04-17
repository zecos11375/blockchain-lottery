import { useCallback, useEffect, useRef, useState } from "react";
import { ChocolatePieLottery } from "../libs/ChocolatePieLottery";
// import { useWallet } from "../providers/walletProvider";
import { hexToArray } from "../utils/hexToArray";
import { utils } from "../utils";
import Web3 from "web3";


interface userInfoForLotteryId{
size: string;
ticketIds: string[];
ticketNumbers: string[];
status: string[];
}

const useLotteryTicket = (lotteryId: string) => {
  const provider = utils.chain.getChainProvider();

  const contractAddress = "0x6B3F1e8667ab53C95fb6BEef19A2022b474E6a84";
  const privateKey =
    "291a898b58fd553895654e80a840dce67adea67e0f09d582b095a4506aeb5d46";
  const address = "0x3FEa2E387dCea2De77D03303f1F9205011Abc5cF";

  const loadingRef = useRef(false);
  const [loading, setLoading] = useState(false);
  const [contract, setContract] = useState<ChocolatePieLottery>();

  const [currentTicketId, setCurrentTicketId] = useState<number>();
  const [ticketNumberStatus, setTicketNumberStatus] = useState<any>();
  const [rewards, setRewards] = useState<any>();
  const [userTicket, setUserTicket] = useState<any>();
  // const [currentLottery, setCurrentLottery] = useState<any>();

  const objectifyViewUserInfoForLotteryId = (arr: string[]): userInfoForLotteryId => {
    const ticketCount = parseInt(arr[3]);
    console.log(ticketCount)

    const obj: userInfoForLotteryId = {
      size: arr[3],
      ticketIds: arr.slice(5, 5+ticketCount),
      ticketNumbers: arr.slice(5+ticketCount+1, 5+ticketCount+1+ticketCount),
      status: arr.slice(5+ticketCount+1+ticketCount+1, 5+ticketCount+1+ticketCount+1+ticketCount)
    };
    return obj;
  };


  const onChangeLoading = useCallback((v: boolean) => {
    setLoading(v);
    loadingRef.current = v;
  }, []);

  const fetchCurrentTicketId = useCallback(async () => {
    try {
      if (loadingRef.current) return;
      onChangeLoading(true);

      const currentTicketId = await contract?.currentTicketId();

      //just try
      const user = await contract?.viewUserInfoForLotteryId(
        address,
        '3',
        "0",
        "101"
      );
      if (user) setUserTicket(objectifyViewUserInfoForLotteryId(hexToArray(user)));

      //just try
      const r = await contract?.viewRewardsForTicketId("3", "89", "1");
      if (r) setRewards(Web3.utils.hexToNumber(r));

      onChangeLoading(false);

      //just try
      const tickets = await contract?.viewNumbersAndStatusesForTicketIds([
        "0x78",
        "89",
        "56",
        "45",
      ]);
      if (tickets) setTicketNumberStatus(hexToArray(tickets));

      if (currentTicketId !== undefined) {
        setCurrentTicketId(parseInt(currentTicketId, 16));
      }
    } catch (e) {
      onChangeLoading(false);
      console.log(e);
    }
  }, [contract, onChangeLoading]);

  useEffect(() => {
    fetchCurrentTicketId();
  }, [contract, fetchCurrentTicketId]);

  useEffect(() => {
    if (contractAddress && address && privateKey) {
      setContract(
        new ChocolatePieLottery(provider, contractAddress, privateKey, address)
      );
    }
  }, []);

  return {
    currentTicketId,
    rewards,
    userTicket,
    ticketNumberStatus,
    fetchCurrentTicketId,
    loadingRef,
  };
};

export default useLotteryTicket;
