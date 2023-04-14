import { Button, Typography } from "@mui/material";

const TOPBAR_HEIGHT = 64;

const TopBar = () => {
  return (
    <>
      <div style={{ height: TOPBAR_HEIGHT }}>
        <div className="z-20 fixed top-0 w-full h-[64px] bg-white flex items-center justify-between px-5 border-b-2">
          <Typography variant="h5">ChocolatePie</Typography>
          <Button variant="outlined" color="primary">
            CONNECT WALLET
          </Button>
        </div>
      </div>
    </>
  );
};

export default TopBar;
