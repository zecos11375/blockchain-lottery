import AppBar from "../../components/TopBar";
import BottomBar from "../../components/BottomBar";
import MyTicketsCard from "../../components/RoundsCard/MyTicketsCard";
import { Typography, Button } from "@mui/material";
import { formatNumber } from "../../utils/formatNumber";

const myprizes = 1000;

const mytickets = {
  round: 44,
  date: "9 Dec 2022",
  time: "10:00 AM",
  winningNumber: ["1", "2", "3", "4"],
  myTicket: [
    { ticketNumber: ["1", "2", "3", "4"], match: 0, win: 0 },
    { ticketNumber: ["1", "2", "3", "4"], match: 2, win: 2000 },
    { ticketNumber: ["1", "2", "3", "4"], match: 1, win: 100 },
  ],
  currentRound: true,
};

const MyTickets = () => {
  return (
    <>
      <AppBar />
      <div className="p-5">
        <Typography variant="h5">My Tickets</Typography>
      </div>
      <div className="flex flex-col items-center p-">
        <Button
          variant="outlined"
          onClick={() => console.log("claim prizes")}
          className="z-10 h-32 w-64 rounded-full"
        >
          <div className="flex flex-col">
            <Typography variant="h4">฿ {formatNumber(myprizes)}</Typography>
            <div className="p-3" />
            <Typography variant="body1">CLAIM YOUR PRIZES !</Typography>
          </div>
        </Button>
        <div className="p-5" />
        <MyTicketsCard />
      </div>
      <BottomBar />
    </>
  );
};
export default MyTickets;
