import { Button, Typography } from "@mui/material";
import TopBar from "../components/TopBar";
import BottomBar from "../components/BottomBar";
import PrizesCard from "../components/RoundsCard/PrizesCard";
import HeroSection from "../components/HeroSection";

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
        <HeroSection amountCollected={""} priceTicket={""} endDate={""} />
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

      <div className="py-24" />

      <BottomBar />
    </>
  );
}
