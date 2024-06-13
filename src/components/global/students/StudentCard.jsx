import { Link } from "react-router-dom";
import PositionedMenu from "../PositionedMenu";
import { Box } from "@mui/material";

export default function StudentCard({
  student,
  editable,
  handleRemoveStudent,
}) {
  return (
    <div className="relative h-full">
      {editable && (
        <Box
          sx={{
            position: "absolute",
            right: "0",
            top: "0",
            marginTop: "1rem",
            marginRight: "1rem",
            fontSize: "2rem",
            color: "#203c4c",
          }}
        >
          <PositionedMenu
            handleRemoveStudent={handleRemoveStudent}
            studentId={student.st_id}
          />
        </Box>
      )}
      <Link
        to={`/student/${student.st_id}`}
        className="w-[17rem] h-full st-card flex flex-col justify-between text-center px-8 py-8 rounded-3xl shadow-lg"
      >
        <img
          className="min-w-[4.5rem] max-w-[4.5rem] self-center"
          src="/assets/user.png"
          alt=""
        />
        <h1 className="mt-5 text-xl font-semibold ">{student.name}</h1>
        {/* <h1 className=" font-semibold">COO</h1> */}
      </Link>
    </div>
  );
}
