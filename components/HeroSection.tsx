import { Button, Typography } from "@mui/material";
import useLotteryRound from "../hooks/useLotteryRound";
import { formatNumber } from "../utils/formatNumber";
import useLotteryForClients from "../hooks/useLotteryForClients";

interface Props {
  amountCollected: string;
  priceTicket?: string;
  endDate?: string;
}

const HeroSection = ({ amountCollected, priceTicket, endDate }: Props) => {
  const { currentId, currentLottery, loadingRef, fetchCurrentId } =
    useLotteryRound();
  const { buyTickets } = useLotteryForClients();
  return (
    <>
      <div className="p-3" />
      <Typography variant="h4">ChocolatePie Lotto</Typography>

      {/* still have to  be divided by 10^18 */}
      <Typography variant="h2">
        {formatNumber(currentLottery?.amountCollectedInCake)} PIE
      </Typography>

      <Typography variant="body1">in the prizes pool !</Typography>
      <div className="p-3" />
      <Button
        variant="outlined"
        onClick={() => buyTickets("5", ["1000000", "1000000"])}
        className="z-10 h-64 w-64 rounded-full"
      >
        <div className="flex flex-col">
          {/* still have to  be divided by 10^18 */}
          <Typography variant="h2">
            {currentLottery?.priceTicketInCake} PIE
          </Typography>
          <div className="p-3" />
          <Typography variant="h6">Buy Tickets !</Typography>
        </div>
      </Button>
      <div className="p-5" />
      <div className="flex items-center justify-between w-[80%]">
        <div className="flex flex-col items-center">
          <Typography variant="body1">HOUR</Typography>
          <Typography variant="h4">{}</Typography>
        </div>
        <div className="flex h-full items-end">
          <Typography variant="h4">:</Typography>
        </div>
        <div className="flex flex-col items-center">
          <Typography variant="body1">MIN</Typography>
          <Typography variant="h4">{}</Typography>
        </div>
        <div className="flex h-full items-end">
          <Typography variant="h4">:</Typography>
        </div>
        <div className="flex flex-col">
          <Typography variant="body1">SEC</Typography>
          <Typography variant="h4">{}</Typography>
        </div>
      </div>
      <div className="p-3" />
      <Typography variant="body1">
        Draw at {currentLottery?.endTime[0]} {currentLottery?.endTime[1]}
      </Typography>
    </>
  );
};

export default HeroSection;
