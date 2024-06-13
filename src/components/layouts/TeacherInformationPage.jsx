import { useParams } from "react-router";
import useGetTeacherInfo from "../queries/useGetTeacherInfo";
import CustomLoader from "../global/CustomLoader";
import ColleagueInformationPage from "./ColleagueInformationPage";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";

export default function TeacherInformationPage() {
  const { id } = useParams();

  const { teacher, loading } = useGetTeacherInfo(id);

  if (loading) {
    return <CustomLoader />;
  }
  if (!teacher) {
    return (
      <Sheet
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography level="h2" mb={2}>
          Class Not Found!
        </Typography>
        <Typography level="title-lg">Contact us below</Typography>
      </Sheet>
    );
  }
  return <ColleagueInformationPage position={"Teacher"} data={teacher} />;
}
