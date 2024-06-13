import { useEffect, useState } from "react";
import NavbarContainer from "../global/NavbarContainer";
import Hero from "../pages/teacher/Hero";
import StudentsSectionContainer from "./StudentsSectionContainer";
import TreatmentSection from "../global/TreatmentSection";
import CreateTreatementPlan from "../pages/create-tratement-plan/CreateTreatementPlan";
import { Link } from "react-scroll";
import { Stack } from "@mui/material";
import useRoleRedirect from "../hooks/useRoleRedirect";
import useGetTeacherClasses from "../queries/useGetTeacherClasses";
import { useAuth } from "../contexts/AuthContext";
import CustomLoader from "../global/CustomLoader";
import useGetTeacherTreatments from "../queries/useGetTeacherTreatments";
import DocsTable from "../global/DocsTable";
import SectionNav from "../global/SectionNav";
import { CircularProgress, Sheet } from "@mui/joy";

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

export default function TeacherPageLayout() {
  useRoleRedirect(["teacher"]);
  const { user } = useAuth();
  const [revision, setRevision] = useState(0);

  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);

  const { classes, loading: classesLoading } = useGetTeacherClasses(
    user?.userId
  );
  const {
    treatments,
    loading: treatmentsLoading,
    count,
  } = useGetTeacherTreatments(
    null,
    user?.userId,
    undefined,
    revision,
    limit,
    page
  );

  if (classesLoading) {
    return <CustomLoader />;
  }

  return (
    <Stack>
      <NavbarContainer title={"Teacher"}>
        <Link
          className="hover:cursor-pointer text-lg"
          to="students"
          spy={true}
          smooth={true}
          duration={500}
        >
          Students
        </Link>
        <Link
          className="hover:cursor-pointer text-lg"
          to="treatment"
          spy={true}
          smooth={true}
          duration={500}
        >
          Create Treatment Plan
        </Link>
      </NavbarContainer>
      <Hero />
      <StudentsSectionContainer />
      <SectionNav title={"Treatments"} id="treatments" />

      {!treatmentsLoading ? (
        <div className="min-h-[50vh] flex justify-center items-center py-12">
          <DocsTable
            rows={treatments}
            emptyMsg={"No Treatments Found!"}
            headCells={treatmentsHeadCells}
            cellLinkTo={"treatment"}
            page={page}
            setPage={setPage}
            limit={limit}
            count={count}
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
      {classes[0] ? (
        <CreateTreatementPlan classes={classes} setRevision={setRevision} />
      ) : (
        ""
      )}
    </Stack>
  );
}
