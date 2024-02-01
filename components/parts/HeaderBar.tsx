import { AppBar, Box, Link, Toolbar, Typography } from "@mui/material";
import { WrappingHorizontalStack } from "@/components/elements/WrappingHorizontalStack";
import { InformationDialogButton } from "@/components/parts/InformationDialogButton";
import Image from "next/image";

export function HeaderBar() {
  return (
    <AppBar position="static" sx={{ zIndex: "appBar" }}>
      <Toolbar variant="dense">
        <WrappingHorizontalStack>
          <Image src="/dmarcy-icon_64x64.png" width={28} height={28} alt="" />
          <Typography variant="h6" color="inherit">
            DMARCy
          </Typography>
          <Typography fontSize={"default"} color="#fff" sx={{ opacity: 0.85 }}>
            DMARC report viewer
          </Typography>
        </WrappingHorizontalStack>
        <Box sx={{ flexGrow: 1 }}></Box>
        <WrappingHorizontalStack>
          <Typography fontSize={"default"} color="inherit">
            <Link
              href="https://msen.jp"
              underline="hover"
              color="inherit"
              target="_blank"
              rel="noopener"
            >
              MSEN
            </Link>
          </Typography>
          <InformationDialogButton />
        </WrappingHorizontalStack>
      </Toolbar>
    </AppBar>
  );
}
