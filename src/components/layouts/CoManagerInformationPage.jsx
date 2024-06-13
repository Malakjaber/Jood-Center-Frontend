import { useParams } from "react-router";
import CustomLoader from "../global/CustomLoader";
import useGetJoodTeam from "../queries/useGetJoodTeam";
import ColleagueInformationPage from "./ColleagueInformationPage";
import { useEffect } from "react";

export default function CoManagerInformationPage() {
  const { id } = useParams();

  const { coManagers } = useGetJoodTeam("co_manager", 1, 1, "", id);
  useEffect(() => {
    console.log(coManagers);
  }, [coManagers]);

  const coManager = coManagers[0];
  if (!coManager) {
    return <CustomLoader />;
  }
  return <ColleagueInformationPage data={coManager} position={"Co-Manager"} />;
}
