import { Box } from "@mui/material";

type BoxProps = Parameters<typeof Box>[0];

type VerticalScrollBoxProps = BoxProps;

export function VerticalScrollBox(props: VerticalScrollBoxProps) {
  return <Box {...props} style={{ overflowY: "auto" }} />;
}
