import { useCallback, useEffect, useState } from "react";
import { ChocolatePieLottery } from "../libs/ChocolatePieLottery";
import { utils } from "../utils";

const useLotteryForClients = () => {
  const provider = utils.chain.getChainProvider();

  const contractAddress = "0x6B3F1e8667ab53C95fb6BEef19A2022b474E6a84";
  const privateKey =
    "291a898b58fd553895654e80a840dce67adea67e0f09d582b095a4506aeb5d46";
  const address = "0x3FEa2E387dCea2De77D03303f1F9205011Abc5cF";

  const [contract, setContract] = useState<ChocolatePieLottery>();

  useEffect(() => {
    if (contractAddress && address && privateKey) {
      setContract(
        new ChocolatePieLottery(provider, contractAddress, privateKey, address)
      );
    }
  }, []);

  const buyTickets = useCallback(
    async (lotteryId: string, ticketNumbers: string[]) => {
      const regex = /^1\d{6}$/;
      for (const element of ticketNumbers) {
        if (!regex.test(element)) {
          throw new Error("Invalid ticket format");
        }
      }
      try {
        await contract?.buyTickets(lotteryId, ticketNumbers);
        console.log("Transaction successful");
      } catch (error) {
        console.error("Transaction failed:", error);
      }
    },
    [contract]
  );

  const claimTickets = useCallback(
    async (lotteryId: string, ticketIds: string[], brackets: string[]) => {
      try {
        await contract?.claimTickets(lotteryId, ticketIds, brackets);
        console.log("Transaction successful");
      } catch (error) {
        console.error("Transaction failed:", error);
      }
    },
    [contract]
  );

  return { buyTickets };
};

export default useLotteryForClients;
