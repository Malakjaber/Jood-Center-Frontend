import Grid from "@mui/joy/Grid";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { useParams } from "react-router";
import useGetClasses from "../queries/useGetClasses";
import CustomLoader from "../global/CustomLoader";
import { Sheet } from "@mui/joy";

const dataMap = (classData) => {
  const map = [
    { label: "Class Id: ", value: classData.class_id },
    { label: "Class Name: ", value: classData.className },
    { label: "Students: ", value: classData.studentCount },
    { label: "Teacher Name: ", value: classData.teacherName },
  ];
  return map;
};

export default function ClassPageLayout() {
  const { id } = useParams();

  const { classes, loading } = useGetClasses(id, true);

  if (loading) {
    return <CustomLoader />;
  }

  if (!classes.length) {
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

  const classData = classes[0];

  return (
    <Stack
      sx={{
        minHeight: "100vh",
        p: "5rem",
      }}
    >
      <Typography
        level="h2"
        sx={{ fontFamily: "Itim", fontWeight: 500, mb: "3rem" }}
      >
        Class Details
      </Typography>
      <Stack sx={{ width: "fit-content" }}>
        {dataMap(classData).map(({ label, value }) => (
          <div
            key={value}
            className="flex border-b border-b-lightgray my-5 p-5"
          >
            <p className=" text-gray text-2xl mr-3">{label}</p>
            <p className=" text-2xl overflow-hidden">{value}</p>
          </div>
        ))}
      </Stack>
    </Stack>
  );
}
