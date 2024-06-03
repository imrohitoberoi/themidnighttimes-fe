import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
  tableCellClasses,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getMostSearchedKeyword } from "../services";
import { keyboard } from "@testing-library/user-event/dist/keyboard";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

/**
 * Component to display the most searched keywords in a table format.
 * @returns {JSX.Element} - The MostSearchedKeyword component.
 */
const MostSearchedKeyword = () => {
  const [data, setData] = useState<{ keyword: string; count: number; }[]>([{ keyword: '', count: 0 }]);

  useEffect(() => {
    // Prefetch data on page load
    getMostSearchedKeyword().then((response) => setData(response));
  }, []);

  return (
    <Box sx={{ marginBottom: "20px" }}>
      <h2 style={{ marginBlock: 0 }}>Most Searched Keyword(s)</h2>
      <TableContainer
        sx={{ width: "50%", marginTop: "20px" }}
        component={Paper}
      >
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Keyword</StyledTableCell>
              <StyledTableCell>Count</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <StyledTableRow key={row.keyword}>
                <StyledTableCell>{row.keyword}</StyledTableCell>
                <StyledTableCell>{row.count}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MostSearchedKeyword;
