import {
  CircularProgress,
  FormControl,
  FormLabel,
  Option,
  Select,
  Sheet,
  Stack,
} from "@mui/joy";
import React, { useState } from "react";
import SectionNav from "../../../global/SectionNav";
import useGetJoodTeam from "../../../queries/useGetJoodTeam";
import useGetRoles from "../../../queries/useGetRoles";
import CustomTable from "../../../global/CustomTable";
import { Link } from "react-router-dom";
import { titleCase } from "../../../utils/stringUtils";

export default function JoodTeamSection() {
  const [selectedRole, setSelectedRole] = useState("co_manager");
  const [page, setPage] = useState(0); // Page number starts from 0
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { roles, loading: rolesLoading } = useGetRoles();
  const {
    users,
    count,
    loading: usersLoading,
  } = useGetJoodTeam(selectedRole, rowsPerPage, page + 1); // Increment page by 1

  if (usersLoading && rolesLoading) {
    return (
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
    );
  }

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
      <Stack sx={{ p: 5 }} spacing={8}>
        <FormControl sx={{ my: 6 }}>
          <FormLabel sx={{ fontSize: "1.2rem" }}>Role</FormLabel>
          <Select
            defaultValue={selectedRole}
            sx={{ width: "15rem" }}
            size="lg"
            onChange={(e, value) => {
              setSelectedRole(value);
              setPage(0); // Reset to first page when role changes
            }}
          >
            {roles.map((role) => (
              <Option
                defaultChecked={role.id === 1}
                key={role.id}
                value={role.name}
              >
                {titleCase(role.name)}
              </Option>
            ))}
          </Select>
        </FormControl>
        <CustomTable
          rows={users}
          setPage={setPage}
          page={page}
          setRowsPerPage={setRowsPerPage}
          rowsPerPage={rowsPerPage}
          count={count}
          role={selectedRole}
        />
      </Stack>
    </Sheet>
  );
}
