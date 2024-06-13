import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export default function NavbarContainer({ title, children }) {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate("/");
  };
  return (
    <div className="py-2 bg-blue flex justify-around items-center text-white font-bold">
      <h1 className=" text-[36px] font-bold">{title}</h1>
      {children}
      <div className="flex">
        <button
          className="text-lg px-3 py-2 mr-6 bg-white text-blue rounded"
          onClick={handleSignOut}
        >
          Logout
        </button>
        <a className="text-lg flex items-center" href="/">
          Home
          <img className="ml-2" src="/assets/icons/right-arrow.svg" alt="" />
        </a>
      </div>
    </div>
  );
}
