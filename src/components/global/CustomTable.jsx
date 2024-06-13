import Box from "@mui/joy/Box";
import Table from "@mui/joy/Table";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import IconButton from "@mui/joy/IconButton";
import { Link } from "react-router-dom";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Dropdown, Menu, MenuButton, MenuItem } from "@mui/joy";
import { MoreVert } from "@mui/icons-material";

const PositionedMenu = ({ id, position }) => {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: "outlined", color: "neutral" } }}
      >
        <MoreVert />
      </MenuButton>
      <Menu placement="bottom-end">
        <MenuItem
          component={Link}
          to={`/${position === "teachers" ? "teacher" : "co_manager"}/${id}`}
        >
          Details
        </MenuItem>
      </Menu>
    </Dropdown>
  );
};

function labelDisplayedRows({ from, to, count }) {
  return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
}

const headCells = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "Id",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "phone",
    numeric: false,
    disablePadding: false,
    label: "Phone",
  },
  {
    id: "address",
    numeric: false,
    disablePadding: false,
    label: "Address",
  },
  {
    id: "operate",
    numeric: false,
    disablePadding: false,
    label: "Operate",
  },
];

function EnhancedTableHead() {
  return (
    <thead>
      <tr>
        {headCells?.map((headCell) => {
          return (
            <th key={headCell.id}>
              <Typography underline="none" color="neutral" fontWeight="lg">
                {headCell.label}
              </Typography>
            </th>
          );
        })}
      </tr>
    </thead>
  );
}

export default function CustomTable({
  rows,
  setPage,
  page,
  setRowsPerPage,
  rowsPerPage,
  count,
  position,
}) {
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event, newValue) => {
    setRowsPerPage(parseInt(newValue.toString(), 10));
    setPage(0);
  };

  const getLabelDisplayedRowsTo = () => {
    if (rows?.length === -1) {
      return (page + 1) * rowsPerPage;
    }
    return rowsPerPage === -1
      ? rows?.length
      : Math.min(rows?.length, (page + 1) * rowsPerPage);
  };

  if (rows && !rows?.length) {
    return <Typography>No users found</Typography>;
  }
  return (
    <Sheet
      variant="outlined"
      sx={{ width: "100%", boxShadow: "sm", borderRadius: "sm" }}
    >
      <Table
        hoverRow
        size="lg"
        sx={{
          "--TableCell-headBackground": "transparent",
          "--TableCell-selectedBackground": (theme) =>
            theme.vars.palette.success.softBg,
          "& thead th": {
            width: "20%",
            textAlign: "center",
          },
          "& thead th:last-child": {
            width: "10%",
            textAlign: "center",
          },
          "& tr > td": { textAlign: "center" },
        }}
      >
        <EnhancedTableHead />
        <tbody>
          {rows?.map((row) => {
            return (
              <tr key={row.id}>
                <td>{row.id || "-"}</td>
                <td>{row.username || "-"}</td>
                <td>{row.email || "-"}</td>
                <td>{row.phone || "-"}</td>
                <td>{row.address || "-"}</td>
                <td>
                  <PositionedMenu id={row.id} position={position} />
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={6}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  justifyContent: "flex-end",
                }}
              >
                <FormControl orientation="horizontal" size="md">
                  <FormLabel>Rows per page:</FormLabel>
                  <Select
                    onChange={handleChangeRowsPerPage}
                    value={rowsPerPage}
                  >
                    <Option value={5}>5</Option>
                    <Option value={10}>10</Option>
                    <Option value={25}>25</Option>
                  </Select>
                </FormControl>
                <Typography textAlign="center" sx={{ minWidth: 80 }}>
                  {labelDisplayedRows({
                    from: rows?.length === 0 ? 0 : page * rowsPerPage + 1,
                    to: getLabelDisplayedRowsTo(),
                    count: count,
                  })}
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <IconButton
                    size="sm"
                    color="neutral"
                    variant="outlined"
                    disabled={page === 0}
                    onClick={() => handleChangePage(page - 1)}
                    sx={{ bgcolor: "background.surface" }}
                  >
                    <KeyboardArrowLeftIcon />
                  </IconButton>
                  <IconButton
                    size="sm"
                    color="neutral"
                    variant="outlined"
                    disabled={
                      count !== 0
                        ? page >= Math.ceil(count / rowsPerPage)
                        : false
                    }
                    onClick={() => handleChangePage(page + 1)}
                    sx={{ bgcolor: "background.surface" }}
                  >
                    <KeyboardArrowRightIcon />
                  </IconButton>
                </Box>
              </Box>
            </td>
          </tr>
        </tfoot>
      </Table>
    </Sheet>
  );
}
