"use client";

import { Info as InfoIcon } from "@mui/icons-material";
import {
  Alert,
  Dialog,
  DialogTitle,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";

function Pronoun(props: { children: string }) {
  return (
    <Typography
      component="span"
      sx={{
        color: "text.secondary",
        fontFamily:
          '"Arial Unicode MS", "Lucida Grande", "Lucida Sans Unicode", sans-serif;',
      }}
    >
      {props.children}
    </Typography>
  );
}

export function InformationDialogButton() {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton onClick={() => setOpen(true)} color="inherit">
        <InfoIcon />
      </IconButton>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>
          About DMARCy <Pronoun>diːmɑ́rsi</Pronoun>
        </DialogTitle>
        <Stack spacing={1} padding={2} paddingTop={0}>
          <Alert severity="info">This is a simple DMARC report viewer.</Alert>
          <Alert severity="success">
            Files are opened only locally in your browser, and are not uploaded
            to any server. You don&apos;t have to worry about your privacy.
          </Alert>
          <Alert severity="warning">
            We do not guarantee the accuracy of the information displayed. If
            you have any questions, please contact the sender of the report.
          </Alert>
          <Alert severity="info">
            If you find any bugs, please report them via{" "}
            <Link
              href="https://github.com/mseninc/dmarcy/issues"
              target="_blank"
              rel="noopener"
            >
              GitHub issues
            </Link>
            .
          </Alert>
          <Alert severity="info" variant="outlined">
            Hosted by{" "}
            <Link href="https://msen.jp" target="_blank" rel="noopener">
              MSEN Inc.
            </Link>{" "}
            Developed by{" "}
            <Link
              href="https://github.com/kenzauros"
              target="_blank"
              rel="noopener"
            >
              kenzauros
            </Link>
            .
          </Alert>
        </Stack>
      </Dialog>
    </>
  );
}
