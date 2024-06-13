import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { useParams } from "react-router";
import useGetClasses from "../queries/useGetClasses";
import CustomLoader from "../global/CustomLoader";
import Sheet from "@mui/joy/Sheet";
import { useState } from "react";
import useGetTeacherTreatments from "../queries/useGetTeacherTreatments";
import DocsTable from "../global/DocsTable";
import CircularProgress from "@mui/joy/CircularProgress";
import SectionNav from "../global/SectionNav";

const dataMap = (classData) => {
  const map = [
    { label: "Class Id: ", value: classData.class_id },
    { label: "Class Name: ", value: classData.className },
    { label: "Students: ", value: classData.studentCount },
    { label: "Teacher Name: ", value: classData.teacherName },
  ];
  return map;
};

const treatmentsHeadCells = [
  {
    id: "id",
    label: "Id",
  },
  {
    id: "teacherName",
    label: "Teacher",
  },
  {
    id: "className",
    label: "Class",
  },
  {
    id: "date",
    label: "Date",
  },
  {
    id: "content",
    label: "Content",
  },
];

export default function ClassPageLayout() {
  const { id } = useParams();

  const { classes, loading } = useGetClasses(id, true);
  const [treatmentsLimit, setTreatmentsLimit] = useState(5);
  const [treatmentsPage, setTreatmentsPage] = useState(1);

  const {
    treatments,
    count: treatmentsCount,
    loading: treatmentsLoading,
  } = useGetTeacherTreatments(
    id,
    null,
    null,
    null,
    treatmentsLimit,
    treatmentsPage
  );

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
    <>
      <SectionNav title={"Class Details"} />
      <Stack
        sx={{
          // minHeight: "100vh",
          px: "5rem",
          py: "3rem",
        }}
      >
        {/* <Typography
          level="h2"
          sx={{ fontFamily: "Itim", fontWeight: 500, mb: "3rem" }}
        ></Typography> */}
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
      <SectionNav
        id="treatments"
        title={`${classData.className} Treatment Plans`}
      />
      {!treatmentsLoading ? (
        <div className="min-h-[50vh] flex justify-center items-center">
          <DocsTable
            rows={treatments}
            emptyMsg={"No Treatments Found!"}
            headCells={treatmentsHeadCells}
            cellLinkTo={"treatment"}
            setPage={setTreatmentsPage}
            limit={treatmentsLimit}
            page={treatmentsPage}
            count={treatmentsCount}
          />
        </div>
      ) : (
        <Sheet
          sx={{
            width: "100vw",
            minHeight: "50vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress variant="solid" color="neutral" />
        </Sheet>
      )}
    </>
  );
}
