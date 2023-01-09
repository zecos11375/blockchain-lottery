import { Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import HomeIcon from "@mui/icons-material/Home";
import HelpIcon from "@mui/icons-material/Help";

const BOTTOMBAR_HEIGHT = 64;
const screenConfigs: Array<{
  name: string;
  icon: JSX.Element;
  href: string;
}> = [
  {
    name: "Home",
    icon: <HomeIcon />,
    href: "/",
  },
  {
    name: "My Tickets",
    icon: <ConfirmationNumberIcon />,
    href: "/mytickets",
  },
  {
    name: "How To",
    icon: <HelpIcon />,
    href: "/howto",
  },
];

const BottomBar = () => {
  const router = useRouter();

  return (
    <>
      <div style={{ height: BOTTOMBAR_HEIGHT }}>
        <div className="fixed bottom-0 w-full h-[64px] bg-white flex items-center justify-between px-5 border-t-2">
          {screenConfigs.map((item, index) => (
            <div
              onClick={() => {
                router.push(item.href);
              }}
              key={index}
              className="flex flex-col items-center justify-center"
            >
              <div>{item.icon}</div>
              <Typography variant="body1">{item.name}</Typography>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BottomBar;
