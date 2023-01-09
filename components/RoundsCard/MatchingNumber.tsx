interface Props {
  match: number;
}

const MatchingShape = ({ match }: Props) => {
  return (
    <div className="flex gap-2 justify-center">
      {match >= 0 ? (
        <div className="bg-green-500 h-3 w-3 rounded-full" />
      ) : (
        <div className="bg-red-500 h-3 w-3 rounded-full" />
      )}
      {match >= 1 ? (
        <div className="bg-green-500 h-3 w-3 rounded-full" />
      ) : (
        <div className="bg-red-500 h-3 w-3 rounded-full" />
      )}
      {match >= 2 ? (
        <div className="bg-green-500 h-3 w-3 rounded-full" />
      ) : (
        <div className="bg-red-500 h-3 w-3 rounded-full" />
      )}
      {match >= 3 ? (
        <div className="bg-green-500 h-3 w-3 rounded-full" />
      ) : (
        <div className="bg-red-500 h-3 w-3 rounded-full" />
      )}
    </div>
  );
};

export default MatchingShape;

// const MatchingNumberMyTicket = (match:number, current)
