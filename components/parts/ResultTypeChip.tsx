import { Chip } from "@mui/material";
import { useMemo } from "react";

type ResultTypeChipProps = {
  result: DMARCResultType | DKIMResultType | SPFResultType;
};

export function ResultTypeChip(props: ResultTypeChipProps) {
  const { result } = props;
  const color = useMemo(() => {
    switch (result) {
      case "pass":
        return "success";
      case "fail":
        return "error";
      case "none":
        return "warning";
      case "neutral":
        return "info";
      case "softfail":
        return "warning";
      case "temperror":
        return "info";
      case "permerror":
        return "error";
      default:
        return "default";
    }
  }, [result]);
  return <Chip variant="outlined" label={result} color={color} size="small" />;
}
