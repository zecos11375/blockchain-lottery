import { Button, Typography } from "@mui/material";
import { formatNumber } from "../../utils/formatNumber";
import MatchingNumber from "./MatchingNumber";

const mytickets = {
  round: 44,
  date: "9 Dec 2022",
  time: "10:00 AM",
  winningNumber: ["1", "2", "3", "  4", "5", "6"],
  myTicket: [
    { ticketNumber: ["1", "2", "3", "4", "5", "6"], match: 0, win: 0 },
    { ticketNumber: ["1", "2", "3", "4", "5", "6"], match: 2, win: 2000 },
    { ticketNumber: ["1", "2", "3", "4", "5", "6"], match: 1, win: 100 },
  ],
  currentRound: false,
};

const MyTicketsCard = () => {
  return (
    <div className="flex flex-col bg-white w-[80%] h-fit pb-2 border-2 rounded-3xl drop-shadow-md">
      {mytickets.currentRound && (
        <div className="flex flex-col items-center w-full pt-2">
          <Typography variant="h6">Current Round</Typography>
          <div className="w-full border-b-2 mt-2" />
        </div>
      )}

      <div className="py-3 px-4">
        <div className="flex justify-between">
          <Typography variant="h6">Round {mytickets.round}</Typography>
          <div className="flex flex-col items-end">
            <Typography>Draw at</Typography>
            <Typography>{mytickets.date}</Typography>
            <Typography>{mytickets.time}</Typography>
          </div>
        </div>

        <div className="p-1" />

        <div className="flex flex-col items-center">
          <Typography>Winning Number</Typography>
          <div className="flex">
            {mytickets.winningNumber.map((number, index) => (
              <div
                key={index}
                className="flex items-center justify-center bg-black w-10 h-10 mx-2 rounded-full drop-shadow-lg text-white"
              >
                <Typography>{number}</Typography>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className="mx-5">
          <Typography variant="body1" fontWeight={700}>
            My Tickets:
          </Typography>
        </div>
        {mytickets.myTicket.map((myticket, indexM) => (
          <div key={indexM} className="flex flex-col w-full">
            <div className="border-b-2" />
            <div className="flex items-center justify-between px-5 py-2 w-full">
              <div className="flex">
                {myticket.ticketNumber.map((number, indexN) => (
                  <div
                    key={indexN}
                    className="flex items-center justify-center bg-black w-5 h-5 mx-2 rounded-full drop-shadow-lg text-white"
                  >
                    <Typography variant="caption">{number}</Typography>
                  </div>
                ))}
              </div>
              <div className="w-[40%] h-8">
                {!mytickets.currentRound && (
                  <Button variant="outlined" fullWidth>
                    <Typography variant="caption">
                      ฿ {formatNumber(myticket.win)}
                    </Typography>
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default MyTicketsCard;
