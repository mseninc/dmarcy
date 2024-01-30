import { Card } from "@mui/material";

type OutlinedCardProps = Parameters<typeof Card>[0];

export function OutlinedCard(props: OutlinedCardProps) {
  return <Card variant="outlined" {...props} />;
}
