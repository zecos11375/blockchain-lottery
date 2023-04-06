import { useCallback, useEffect, useRef, useState } from "react";
import { ChocolatePieLottery } from "../libs/ChocolatePieLottery";
// import { useWallet } from "../providers/walletProvider";
import { utils } from "../utils";

const useChocolatePieLottery = () => {
  const provider = utils.chain.getChainProvider();

  const contractAddress = "0x6B3F1e8667ab53C95fb6BEef19A2022b474E6a84";
  const privateKey =
    "291a898b58fd553895654e80a840dce67adea67e0f09d582b095a4506aeb5d46";
  const address = "0x3FEa2E387dCea2De77D03303f1F9205011Abc5cF";

  const loadingRef = useRef(false);
  const [loading, setLoading] = useState(false);
  const [contract, setContract] = useState<ChocolatePieLottery>();

  const [currentId, setCurrentId] = useState<string>();

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

      setCurrentId(id);
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
  }, [contractAddress, address, privateKey, provider]);

  return {
    currentId,
    fetchCurrentId,
    loadingRef,
  };
};
