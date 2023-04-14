import { Typography } from "@mui/material";
import { divide } from "../../utils/divide";
import { formatNumber } from "../../utils/formatNumber";
import MatchingShape from "./MatchingNumber";
import useLotteryRound from "../../hooks/useLotteryRound";
import useLotteryTicket from "../../hooks/useLotteryTicket";

// const winningNo = {
//   winningNumber: ["1", "2", "3", "4"],
//   matchFirstOne: { prizes: 1000, tickets: 10 },
// };

// const rounds = {
//   id: 44,
//   date: "9 Dec 2022",
//   time: "10:00 AM",
//   pot: 20000,
//   winningNumber: ["1", "2", "3", "4"],
//   prizes: [1000, 2000, 3000, 4000],
//   winningTickets: [30, 10, 5, 0],
//   prizeEach: [33.33, 200, 600, 0], // prize won by each
// };

interface Props {
  id: number;
  date: string;
  time: string;
  pot: number;
  winningNumber: string[];
  prizes: number[];
  winningTickets: number[];
  prizeEach?: number[];
}

interface Lottery {
  status: string;
  startTime: string;
  endTime: string;
  priceTicketInCake: string;
  discountDivisor: string;
  rewardsBreakdown: string[];
  treasuryFee: string;
  cakePerBracket: string[];
  countWinnersPerBracket: string[];
  firstTicketId: string;
  firstTicketIdNextLottery: string;
  amountCollectedInCake: string;
  finalNumber: string;
}

const PrizesCard = ({
  id,
  date,
  time,
  pot,
  winningNumber,
  prizes,
  winningTickets,
  prizeEach,
}: Props) => {
  const { currentId, currentLottery, loadingRef, fetchCurrentId } =
    useLotteryRound();
  const { currentTicketId, ticketNumberStatus, rewards, userTicket } =
    useLotteryTicket();

  const calculateReward = (
    total: string,
    rewardsBreakdown: string,
    treasuryFee: string
  ): string => {
    const rewardPerBracket =
      parseInt(total) *
      ((10000 - parseInt(treasuryFee)) / 10000) *
      (parseInt(rewardsBreakdown) / 10000);

    return rewardPerBracket.toString();
  };

  return (
    <div className="flex flex-col bg-white w-[80%] h-fit pb-4 border-2 rounded-3xl drop-shadow-md">
      <div className="flex flex-col items-center w-full pt-2">
        <div onClick={() => console.log(currentLottery)}>log lottery info</div>
        <div onClick={() => console.log(ticketNumberStatus)}>log ticket id</div>
        <div onClick={() => console.log(userTicket)}>user Ticket</div>
        <div onClick={() => console.log(rewards)}>rewards</div>
        <Typography variant="h6">Current Round</Typography>
        <div className="w-full border-b-2 mt-2" />
      </div>

      <div className="py-3 px-4">
        <div className="flex justify-between">
          <Typography variant="h6" onClick={() => console.log(currentId)}>
            Round {currentId}
          </Typography>
          <div className="flex flex-col items-end">
            <Typography>Draw at</Typography>
            <Typography>{currentLottery?.endTime[0]}</Typography>
            <Typography>{currentLottery?.endTime[1]}</Typography>
          </div>
        </div>

        <div className="p-1" />

        <div className="flex flex-col items-center">
          <Typography variant="body1">Prizes Pool</Typography>
          <Typography variant="h5">
            {formatNumber(currentLottery?.amountCollectedInCake ?? "0")} PIE
          </Typography>
          <div className="p-2" />
          <Typography>Winning Number</Typography>
          <div className="flex">
            {currentLottery?.finalNumber
              .split("")
              .slice(1)
              .reverse()
              .map((digit, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center bg-black w-7 h-7 mx-1 rounded-full drop-shadow-lg text-white"
                >
                  <Typography>{digit}</Typography>
                </div>
              ))}
          </div>
        </div>

        <div>
          {currentLottery?.cakePerBracket.map((reward, index) => (
            <div key={index} className="flex justify-between h-16 mt-8">
              <div className="flex flex-col items-center w-[40%]">
                {index !== currentLottery.rewardsBreakdown.length - 1 ? (
                  <Typography>Match First {index + 1}</Typography>
                ) : (
                  <Typography>Match ALL</Typography>
                )}
                <div className="p-1" />
                <MatchingShape match={index} />
              </div>
              <div className="flex flex-col w-[60%] items-end">
                <div className="flex justify-end w-full">
                  <Typography variant="h6">
                    {formatNumber(
                      calculateReward(
                        currentLottery.amountCollectedInCake,
                        currentLottery.rewardsBreakdown[index],
                        currentLottery.treasuryFee
                      )
                    )}{" "}
                    PIE
                  </Typography>
                </div>
                <div className="flex flex-col items-end">
                  <Typography variant="caption">
                    {currentLottery.countWinnersPerBracket[index]} winning
                    tickets
                  </Typography>
                  <Typography variant="caption">
                    {formatNumber(reward)} each
                  </Typography>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrizesCard;
