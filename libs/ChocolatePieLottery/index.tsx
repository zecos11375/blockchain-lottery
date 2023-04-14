import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { Account, TransactionConfig } from "web3-core/types";
import { ChocolatePieLotteryAbi } from "./abi";
import { BlockchainTx, newBlockChainTx } from "../blockchainTx";

export class ChocolatePieLottery {
  private provider: Web3;
  private contract: Contract;
  private defaultOwnerAddress: string;
  private account: Account;
  private contractAddress: string;

  constructor(
    provider: Web3,
    contractAddress: string,
    privateKey: string,
    defaultOwnerAddress: string
  ) {
    this.provider = provider;

    this.contract = new this.provider.eth.Contract(
      ChocolatePieLotteryAbi,
      contractAddress,
      {
        from: defaultOwnerAddress,
      }
    );

    this.defaultOwnerAddress = defaultOwnerAddress;
    this.account = this.provider.eth.accounts.privateKeyToAccount(privateKey);
    this.contractAddress = contractAddress;
  }

  async callTx(tx: TransactionConfig) {
    return await this.provider.eth.call(tx);
  }

  async sendTx(tx: TransactionConfig) {
    const signed = await this.account.signTransaction(tx);

    if (!signed.rawTransaction) {
      throw new Error("Raw transaction is undefined");
    }

    const res = await this.provider.eth.sendSignedTransaction(
      signed.rawTransaction
    );

    return res;
  }

  async buyTickets(lotteryId: string, ticketNumbers: string[]) {
    const payload = this.contract.methods
      .buyTickets(lotteryId, ticketNumbers)
      .encodeABI();

    const tx = newBlockChainTx()
      .from(this.defaultOwnerAddress)
      .to(this.contractAddress)
      .gasLimit(500000)
      .data(payload)
      .getConfig();

    return await this.sendTx(tx);
  }

  async claimTickets(
    lotteryId: string,
    ticketIds: string[],
    brackets: string[]
  ) {
    const payload = this.contract.methods
      .claimTickets(lotteryId, ticketIds, brackets)
      .encodeABI();

    const tx = newBlockChainTx()
      .from(this.defaultOwnerAddress)
      .to(this.contractAddress)
      .gasLimit(300000)
      .data(payload)
      .getConfig();

    return await this.sendTx(tx);
  }

  async viewCurrentLotteryId() {
    const payload = this.contract.methods.viewCurrentLotteryId().encodeABI();

    const tx = newBlockChainTx()
      .from(this.defaultOwnerAddress)
      .to(this.contractAddress)
      .data(payload)
      .getConfig();

    const val = await this.callTx(tx);

    return val;
  }

  async viewLottery(lotteryId: string) {
    const payload = this.contract.methods.viewLottery(lotteryId).encodeABI();

    const tx = newBlockChainTx()
      .from(this.defaultOwnerAddress)
      .to(this.contractAddress)
      .data(payload)
      .getConfig();

    const val = await this.callTx(tx);
    return val;
  }

  async currentTicketId() {
    const payload = this.contract.methods.currentTicketId().encodeABI();

    const tx = newBlockChainTx()
      .from(this.defaultOwnerAddress)
      .to(this.contractAddress)
      .data(payload)
      .getConfig();

    const val = await this.callTx(tx);

    return val;
  }
  async viewNumbersAndStatusesForTicketIds(ticketIds: string[]) {
    const payload = this.contract.methods
      .viewNumbersAndStatusesForTicketIds(ticketIds)
      .encodeABI();

    const tx = newBlockChainTx()
      .from(this.defaultOwnerAddress)
      .to(this.contractAddress)
      .data(payload)
      .getConfig();

    const val = await this.callTx(tx);

    return val;
  }

  async viewRewardsForTicketId(
    lotteryId: string,
    ticketId: string,
    bracket: string
  ) {
    const payload = this.contract.methods
      .viewRewardsForTicketId(lotteryId, ticketId, bracket)
      .encodeABI();

    const tx = newBlockChainTx()
      .from(this.defaultOwnerAddress)
      .to(this.contractAddress)
      .data(payload)
      .getConfig();

    const val = await this.callTx(tx);

    return val;
  }

  async viewUserInfoForLotteryId(
    user: string,
    lotteryId: string,
    cursor: string,
    size: string
  ) {
    const payload = this.contract.methods
      .viewUserInfoForLotteryId(user, lotteryId, cursor, size)
      .encodeABI();

    const tx = newBlockChainTx()
      .from(this.defaultOwnerAddress)
      .to(this.contractAddress)
      .data(payload)
      .getConfig();

    const val = await this.callTx(tx);

    return val;
  }

  // async sendTx(tx: TransactionConfig) {
  //   const signed = await this.account.signTransaction(tx);

  //   const res = await this.provider.eth.sendSignedTransaction(
  //     signed.rawTransaction
  //   );

  // return res;
}
