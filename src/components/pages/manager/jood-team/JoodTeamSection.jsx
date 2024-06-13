import { CircularProgress, Option, Select, Sheet, Stack } from "@mui/joy";
import React, { useState } from "react";
import SectionNav from "../../../global/SectionNav";
import useGetJoodTeam from "../../../queries/useGetJoodTeam";
import CustomTable from "../../../global/CustomTable";
import { Link } from "react-router-dom";

export default function JoodTeamSection() {
  const [position, setPosition] = useState("teachers");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { teachers, coManagers, count, loading } = useGetJoodTeam(
    position,
    rowsPerPage,
    page,
    ""
  );
  return (
    <Sheet sx={{ pb: "5rem" }} id={"team"}>
      <SectionNav title={"Jood Team"}>
        <Link
          to={"/signup"}
          className="border-2 border-white px-2 py-[0.1rem] rounded-md font-Itim text-lg"
        >
          Create new user
        </Link>
      </SectionNav>
      {!loading ? (
        <Stack sx={{ p: 4 }} spacing={6}>
          <Select
            defaultValue={position}
            sx={{ width: "15rem", mb: 4 }}
            size="lg"
            onChange={(e, value) => {
              setPosition(value);
            }}
          >
            <Option value={"teachers"}>Teachers</Option>
            <Option value={"co_managers"}>Co-Managers</Option>
          </Select>
          {position === "teachers" ? (
            <CustomTable
              rows={teachers}
              setPage={setPage}
              page={page}
              setRowsPerPage={setRowsPerPage}
              rowsPerPage={rowsPerPage}
              count={count}
              position={position}
            />
          ) : (
            <CustomTable
              rows={coManagers}
              setPage={setPage}
              page={page}
              setRowsPerPage={setRowsPerPage}
              rowsPerPage={rowsPerPage}
              count={count}
              position={position}
            />
          )}
        </Stack>
      ) : (
        <Sheet
          sx={{
            minHeight: "15rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress variant="solid" color="neutral" />
        </Sheet>
      )}
    </Sheet>
  );
}
