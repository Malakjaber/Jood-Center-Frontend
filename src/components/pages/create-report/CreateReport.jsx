import { useEffect, useState } from "react";
import SectionNav from "../../global/SectionNav";
import TextFieldForm from "../../global/TextFieldForm";
import { useParams } from "react-router-dom";
import useApi from "../../hooks/useApi";
import useRoleRedirect from "../../hooks/useRoleRedirect";
import { useAuth } from "../../contexts/AuthContext";
import MySnackbar from "../../global/MySnackbar";

export default function CreateReport() {
  const [content, setContent] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarProps, setSnackbarProps] = useState({
    severity: "",
    content: "",
  });

  const { user } = useAuth();
  const { post, data, loading, error } = useApi();
  const { id: st_id, stName } = useParams();
  useRoleRedirect(["teacher"]);

  useEffect(() => {
    if (data.message === "success") {
      setSnackbarProps({
        severity: "success",
        content: "Report Sent Successfully",
      });
      setSnackbarOpen(true);
    }
  }, [data]);

  const onSubmit = () => {
    post("/reports", {
      content: content,
      date: new Date().toISOString(),
      st_id,
      teacher_id: user?.userId,
    });
  };

  return (
    <div>
      <MySnackbar
        {...snackbarProps}
        open={snackbarOpen}
        handleClose={() => setSnackbarOpen(false)}
      />
      <SectionNav title={"Submit Report"} />
      <TextFieldForm
        setContent={setContent}
        onSubmit={onSubmit}
        selected={stName}
        type="report"
      />
    </div>
  );
}
