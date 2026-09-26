import { Link } from "react-router-dom";
import homebck from "../image/bckgrnd.png";
import cusport from "../image/cusport.png";

const Landing = () => {
  return (
    <div
      className="w-full max-w-7xl mx-auto h-full"
      style={{ backgroundImage: `url(${homebck})` }}
    >
      <div className="flex h-lvh items-center justify-center">
        <div className="grid grid-cols-2 gap-2 w-full">
          <div className="flex flex-col items-center justify-center gap-2.5">
            <div className="text-blue-400 text-3xl">Welcome to</div>
            <div className=" text-3xl font-mono ">
              Archiving and
              <span className="text-blue-400 ml-2">Tracking Management</span>
            </div>
          </div>
          <span className="flex flex-col items-center justify-center">
            <img
              src={cusport}
              width="420px"
              height="500px"
              alt=""
              style={{ position: "relative" }}
            />

            <Link to="/auth/login">
              <p className="bg-amber-200 py-2 px-2 rounded-sm">
                Plese click here to login
              </p>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Landing;
