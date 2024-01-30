import { Chip } from "@mui/material";
import { useMemo } from "react";

type DispositionTypeChipProps = {
  disposition: DispositionType;
};

export function DispositionTypeChip(props: DispositionTypeChipProps) {
  const { disposition } = props;
  const color = useMemo(() => {
    switch (disposition) {
      case "none":
        return "default";
      case "quarantine":
        return "warning";
      case "reject":
        return "success";
      default:
        return "default";
    }
  }, [disposition]);
  return (
    <Chip variant="outlined" label={disposition} color={color} size="small" />
  );
}
