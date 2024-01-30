import { Box } from "@mui/material";

type WrappingHorizontalStackProps = Parameters<typeof Box>[0];

export function WrappingHorizontalStack(props: WrappingHorizontalStackProps) {
  const { children, ...rest } = props;
  return (
    <Box
      display={"flex"}
      flexWrap={"wrap"}
      rowGap={0.5}
      columnGap={1}
      alignItems={"center"}
      {...rest}
    >
      {children}
    </Box>
  );
}
