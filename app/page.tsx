"use client";
import { Box } from "@mui/material";
import { ReportViewer } from "@/components/parts/ReportViewer";
import { HeaderBar } from "@/components/parts/HeaderBar";
import { ThemeProvider, createTheme } from "@mui/material";
import { teal } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#105a9c",
    },
    secondary: {
      main: teal[600],
    },
  },
  shape: {
    borderRadius: 6,
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        component="main"
        sx={{
          display: "grid",
          gridTemplateRows: "auto 1fr",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <HeaderBar />
        <ReportViewer />
      </Box>
    </ThemeProvider>
  );
}
