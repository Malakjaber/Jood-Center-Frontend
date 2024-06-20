import Box from "@mui/joy/Box";
import Table from "@mui/joy/Table";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import IconButton from "@mui/joy/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";
import { FormControl, FormLabel, Option, Select } from "@mui/joy";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

function EnhancedTableHead({ headCells }) {
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
        <th>
          <Typography underline="none" color="neutral" fontWeight="lg">
            Operate
          </Typography>
        </th>
      </tr>
    </thead>
  );
}

export default function DocsTable({
  rows,
  headCells,
  cellLinkTo,
  emptyMsg,
  setPage,
  limit,
  page,
  count,
}) {
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  if (rows && !rows?.length) {
    return <Typography level="h4">{emptyMsg}</Typography>;
  }
  return (
    <Sheet
      variant="outlined"
      sx={{ width: "80%", boxShadow: "sm", borderRadius: "sm" }}
    >
      <Table
        hoverRow
        size="lg"
        sx={{
          "--TableCell-headBackground": "transparent",
          "--TableCell-selectedBackground": (theme) =>
            theme.vars.palette.success.softBg,
          "& thead th": {
            width: "27%",
            textAlign: "center",
          },
          "& thead th:last-child": {
            width: "10%",
            textAlign: "center",
          },
          "& thead th:first-child": {
            width: "10%",
            textAlign: "center",
          },
          "& tr > td": { textAlign: "center" },
        }}
      >
        <EnhancedTableHead headCells={headCells} />
        <tbody>
          {rows?.map((row) => (
            <tr key={row.id}>
              {headCells.map((cell) => (
                <td className="truncate ..." key={cell.id}>
                  {row[cell.id] || "-"}
                </td>
              ))}
              <td className="text-center">
                <Link to={`/${cellLinkTo}/${row.id}`}>
                  <VisibilityIcon />
                </Link>
              </td>
            </tr>
          ))}
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
                <Typography textAlign="center" sx={{ minWidth: 80 }}>
                  Total {count}
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <IconButton
                    size="sm"
                    color="neutral"
                    variant="outlined"
                    disabled={page === 1}
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
                      (count !== 0
                        ? page >= Math.ceil(count / limit)
                        : false) || rows?.length < limit
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
