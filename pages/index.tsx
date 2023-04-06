import { Button, Typography } from "@mui/material";
import TopBar from "../components/TopBar";
import BottomBar from "../components/BottomBar";
import PrizesCard from "../components/RoundsCard/PrizesCard";

// import Web3 from "web3";
// import abi from '../PancakeSwapLottery.json'

// const web3 = new Web3('https://eth-goerli.alchemyapi.io/v2/EbP8TCRBU1sKes-h6gt9x5_4vHFp7e36')
// const contractAddress = '0xbC80dB4bb95883200eBBE701ccec46A5e0B3a31E'

// const myContract = new web3.eth.Contract(abi, contractAddress);

const pot = 20000;
const drawAt = "9 Dec 2022 10:00 AM";
const timeLeft = { hour: "14", min: "56", sec: "44" };

//database only store necessary field, and use function to calculate

const rounds = {
  roundId: 44,
  date: "9 Dec 2022",
  time: "10:00 AM",
  pot: 20000,
  winningNumber: ["1", "2", "3", "4", "5", "6"],
  prizes: [1000, 2000, 3000, 4000, 5000, 6000],
  winningTickets: [30, 10, 5, 0, 0, 0],

  prizeEach: [33.33, 200, 600, 0, 0, 0], // prize won by each
};

// const mytickets = {
//   //input roundId:44,
//   myTicket: [
//     { ticketNumber: ["1", "2", "3", "4"], match: 1, win: 33.33 },
//     { ticketNumber: ["1", "2", "3", "4"], match: 2, win: 2000 },
//     { ticketNumber: ["1", "2", "3", "4"], match: 1, win: 100 },
//   ],
// };

export default function Home() {
  return (
    <>
      <TopBar />
      <div
        // style={{ height: "100vh" }}
        style={{ height: "calc(100vh - 120px)" }}
        className="flex flex-col w-full items-center bg-red-00 border-b-2"
      >
        <div className="p-3" />
        <Typography variant="h2">My Lotto</Typography>
        <Typography variant="h2">฿ {pot.toLocaleString()}</Typography>
        <Typography variant="body1">in the prizes pool !</Typography>
        <div className="p-3" />
        <Button
          variant="outlined"
          onClick={() => console.log("hi")}
          className="z-10 h-64 w-64 rounded-full"
        >
          <div className="flex flex-col">
            <Typography variant="h2">฿ 50</Typography>
            <div className="p-3" />
            <Typography variant="h6">Buy Tickets !</Typography>
          </div>
        </Button>
        <div className="p-5" />
        <div className="flex items-center justify-between w-[80%]">
          <div className="flex flex-col items-center">
            <Typography variant="body1">HOUR</Typography>
            <Typography variant="h4">{timeLeft.hour}</Typography>
          </div>
          <div className="flex h-full items-end">
            <Typography variant="h4">:</Typography>
          </div>
          <div className="flex flex-col items-center">
            <Typography variant="body1">MIN</Typography>
            <Typography variant="h4">{timeLeft.min}</Typography>
          </div>
          <div className="flex h-full items-end">
            <Typography variant="h4">:</Typography>
          </div>
          <div className="flex flex-col">
            <Typography variant="body1">SEC</Typography>
            <Typography variant="h4">{timeLeft.sec}</Typography>
          </div>
        </div>
        <div className="p-3" />
        <Typography variant="body1">Draw at {drawAt}</Typography>
      </div>

      <div className="flex justify-center h-screen w-full mt-10">
        <PrizesCard
          id={rounds.roundId}
          date={rounds.date}
          time={rounds.time}
          pot={rounds.pot}
          prizes={rounds.prizes}
          winningNumber={rounds.winningNumber}
          winningTickets={rounds.winningTickets}
        />
      </div>

      <BottomBar />
    </>
  );
}
