import { useEffect, useState } from "react";
import SectionNav from "../../global/SectionNav";
import TextFieldForm from "../../global/TextFieldForm";
import useCreateTreatmentPlan from "../../queries/useCreateTreatmentPlan";
import MySnackbar from "../../global/MySnackbar";
import { Box, Sheet } from "@mui/joy";

export default function CreateTreatementPlan({ classes, setRevision }) {
  const [selectedClass, setSelectedClass] = useState(classes[0].class_id);
  const [content, setContent] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarProps, setSnackbarProps] = useState({
    severity: "",
    content: "",
  });

  const { createTreatment, data, error } = useCreateTreatmentPlan();

  const onSubmit = () => {
    createTreatment(selectedClass, content);
  };

  useEffect(() => {
    if (data.message === "success") {
      setSnackbarProps({
        severity: "success",
        content: "Treatment Plan Sent Successfully",
      });
      setOpenSnackbar(true);
      setRevision((old) => old + 1);
    }
  }, [data, setRevision]);
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
    <Box id="treatment">
      <MySnackbar
        {...snackbarProps}
        open={openSnackbar}
        handleClose={() => {
          setOpenSnackbar(false);
        }}
      />
      <SectionNav title={"Create Treatement Plan"} />
      <TextFieldForm
        value={selectedClass}
        setValue={setSelectedClass}
        setContent={setContent}
        onSubmit={onSubmit}
        type={"treatement"}
        options={classes}
      />
    </Box>
  );
}
