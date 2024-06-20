import Sheet from "@mui/joy/Sheet";
import SectionNav from "../../../global/SectionNav";
import useGetClasses from "../../../queries/useGetClasses";
import ClassCard from "./ClassCard";
import { Link } from "react-router-dom";
import useDeleteClass from "../../../queries/useDeleteClass";
import { useEffect, useState } from "react";
import MySnackbar from "../../../global/MySnackbar";

export default function ClassesSection() {
  const [revision, setRevision] = useState(1);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarProps, setSnackbarProps] = useState({
    severity: "",
    content: "",
  });
  const { classes } = useGetClasses(undefined, true, revision);
  const { deleteClass, data, error } = useDeleteClass();

  const handleConfirmRemove = (id) => {
    deleteClass(id);
  };

  useEffect(() => {
    if (data?.message === "success") {
      setRevision((rev) => rev + 1);
      setSnackbarProps({
        severity: "success",
        content: "Class Removed Successfully",
      });
      setOpenSnackbar(true);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setSnackbarProps({
        severity: "error",
        content: error,
      });
      setOpenSnackbar(true);
    }
  }, [error]);

  return (
    <Sheet id={"classes"}>
      <MySnackbar
        {...snackbarProps}
        open={openSnackbar}
        handleClose={() => {
          setOpenSnackbar(false);
        }}
      />
      <SectionNav title={"Jood Classes"}>
        <Link
          to={"/create-class"}
          className="border-2 border-white px-2 py-[0.1rem] rounded-md font-Itim text-lg"
        >
          Create new class
        </Link>
      </SectionNav>
      <Sheet
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: "2rem",
          pb: "6rem",
        }}
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 w-[95%]">
          {classes?.map((item) => (
            <div
              key={item.class_id}
              className="flex flex-col justify-between gap-6"
            >
              <ClassCard
                classData={item}
                handleConfirmRemove={handleConfirmRemove}
              />
            </div>
          ))}
        </div>
      </Sheet>
    </Sheet>
  );
}
