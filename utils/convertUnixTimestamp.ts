export const convertUnixTimestamp = (unixTimestamp: number): string[] => {
  const date = new Date(unixTimestamp * 1000);
  const day = date.getDate();
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
    date
  );
  const year = date.getFullYear();
  const hour = date.getHours() % 12 || 12;
  const minute = String(date.getMinutes()).padStart(2, "0");
  const ampm = date.getHours() < 12 ? "AM" : "PM";
  const formattedTime = `${hour}:${minute} ${ampm}`;
  return [`${day} ${month} ${year}`, formattedTime];
};
