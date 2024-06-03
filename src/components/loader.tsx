import { Box, CircularProgress } from "@mui/material";

/**
 * Loader component displays a loading spinner.
 * @returns {JSX.Element} The loading spinner component.
 */
const Loader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        alignItems: "center",
        height: "60vh",
      }}
    >
      <CircularProgress size={70} />
    </Box>
  );
};

export default Loader;
