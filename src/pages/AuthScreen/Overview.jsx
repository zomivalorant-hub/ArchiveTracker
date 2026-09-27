import { useAllTravel } from "../../services/travel/travQuery";

const Overview = () => {
  const { data: travels = [], isLoading } = useAllTravel();

  if (isLoading) return <p>Loading...</p>;

  const draftCount = travels.filter((item) => item.status === "Draft").length;
  const receiveCount = travels.filter(
    (item) => item.status === "Recieve",
  ).length;
  const approved = travels.filter((item) => item.status === "Approved").length;

  return (
    <div className="flex gap-2 items-center justify-center">
      <div className="bg-blue-700 w-80 h-40 shadow-md rounded-2xl">
        <div className="flex flex-col items-center justify-center gap-2 h-40">
          <p className="text-2xl text-yellow-100">{draftCount}</p>
          <p className="font-mono text-2xl text-yellow-100">Draft</p>
          <p>Document-Tracking</p>
        </div>
      </div>
      <div className="bg-blue-700 w-80 h-40 shadow-md rounded-2xl">
        <div className="flex flex-col items-center justify-center gap-2 h-40">
          <p className="text-2xl text-yellow-100">{receiveCount}</p>
          <p className="font-mono text-2xl text-yellow-100">Recieved</p>
          <p>Document-Tracking</p>
        </div>
      </div>
      <div className="bg-blue-700 w-80 h-40 shadow-md rounded-2xl">
        <div className="flex flex-col items-center justify-center gap-2 h-40">
          <p className="text-2xl text-yellow-100">{approved}</p>
          <p className="font-mono text-2xl text-yellow-100">Approved</p>
          <p>Document-Tracking</p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
