import React from "react";
import { Pagination, Stack } from "@mui/material";

export default function PaginationComponent({ page, changePage, totalPages }) {
  return (
    <Stack mt={1.5} spacing={5} alignItems="center">
      <Pagination
        page={page}
        count={totalPages}
        onChange={(event, value) => changePage(value)}
        size="large"
        color="primary"
        shape="rounded"
      />
    </Stack>
  );
}
