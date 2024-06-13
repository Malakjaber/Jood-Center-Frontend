import Pagination from "@mui/material/Pagination";

export default function MyPagination({ handlePageChange, page, limit, count }) {
  const pageCount = Math.ceil(count / limit);

  return (
    <Pagination
      count={pageCount}
      page={page}
      onChange={handlePageChange}
      variant="outlined"
      shape="rounded"
    />
  );
}
