"use client";

import { Fab, styled } from "@mui/material";
import { ChangeEvent, useCallback } from "react";
import { FileOpen as FileOpenIcon } from "@mui/icons-material";

type OpenFileButtonProps = {
  onChange: (file: File) => void;
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export function OpenFileButton(props: OpenFileButtonProps) {
  const { onChange } = props;
  const handleOnChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) {
        return;
      }
      for (let index = 0; index < e.target.files.length; index++) {
        const file = e.target.files[index];
        onChange(file);
      }
      e.target.value = ""; // reset file input
    },
    [onChange]
  );

  return (
    <Fab
      component="label"
      size="large"
      aria-label="Open files"
      color="secondary"
      variant="extended"
    >
      <FileOpenIcon sx={{ mr: 1 }} />
      Open files
      <VisuallyHiddenInput type="file" onChange={handleOnChange} multiple />
    </Fab>
  );
}
