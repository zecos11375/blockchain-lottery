import Web3 from "web3";
import { environments } from "../environments";

const getChainProvider = (
  providerNodeUri: string = environments.chainProviderNodeUri
) => {
  const web3 = new Web3();
  web3.setProvider(new Web3.providers.HttpProvider(providerNodeUri));

  return web3;
};

export const chain = {
  getChainProvider,
};
