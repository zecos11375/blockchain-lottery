import { TransactionConfig } from "web3-core/types";

export class BlockchainTx {
  private config: TransactionConfig;
  constructor() {
    // this.config.gas = 300000;
    this.config = {};
    return this;
  }

  data(data: string) {
    this.config.data = data;
    return this;
  }

  from(from: string) {
    this.config.from = from;
    return this;
  }

  to(to: string) {
    this.config.to = to;
    return this;
  }

  gasLimit(gas: number = 300000) {
    this.config.gas = gas;
    return this;
  }

  gasPrice(price: string) {
    this.config.gasPrice = price;
    return this;
  }

  value(value: string) {
    this.config.value = value;
    return this;
  }

  getConfig(): TransactionConfig {
    return this.config;
  }
}

export const newBlockChainTx = () => new BlockchainTx();
