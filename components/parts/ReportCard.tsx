"use client";

import {
  CardContent,
  Typography,
  Stack,
  Chip,
  ButtonBase,
  CardHeader,
  IconButton,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorIcon from "@mui/icons-material/Error";
import EmailIcon from "@mui/icons-material/Email";
import { numberToDateString } from "@/lib/date";
import { toArray } from "@/lib/array";
import { OutlinedCard } from "@/components/elements/OutlinedCard";
import { Close as CloseIcon } from "@mui/icons-material";
import { MouseEventHandler, use, useCallback } from "react";

type ReportCardProps = {
  report: DMARCReport;
  onClick: (report: DMARCReport) => void | Promise<void>;
  onClose: (report: DMARCReport) => void | Promise<void>;
};

export function ReportCard(props: ReportCardProps) {
  const { report, onClick, onClose } = props;
  const { reportFile, feedback } = report;
  const totalCount = toArray(feedback.record).reduce(
    (prev, current) => prev + current.row.count,
    0
  );
  const failCount = toArray(feedback.record).reduce(
    (prev, current) =>
      current.row.policy_evaluated.dkim === "fail" ||
      current.row.policy_evaluated.spf === "fail"
        ? prev + current.row.count
        : prev,
    0
  );

  const handleClose = useCallback<MouseEventHandler<HTMLAnchorElement>>(
    (e) => {
      e.stopPropagation();
      onClose(report);
    },
    [onClose, report]
  );

  return (
    <OutlinedCard>
      <ButtonBase
        onClick={() => onClick(report)}
        sx={{
          textAlign: "left",
          display: "block",
          width: "100%",
        }}
      >
        <CardHeader
          action={
            <IconButton
              component="a"
              aria-label="settings"
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          }
          sx={{ padding: 1.5, paddingBottom: 0.5 }}
          title={feedback.report_metadata.org_name}
          subheader={feedback.policy_published.domain}
        />
        <CardContent sx={{ padding: 1.5, paddingTop: 0 }}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            {numberToDateString(
              feedback.report_metadata.date_range.begin
            ).substring(0, 10)}
          </Typography>
          <Typography
            sx={{
              fontSize: 12,
              textOverflow: "ellipsis",
              overflow: "hidden",
              mb: 2,
            }}
            color="text.secondary"
            title={reportFile}
          >
            {reportFile}
          </Typography>
          <Stack direction="row" spacing={1}>
            <Chip
              icon={<CheckCircleOutlineIcon fontSize="small" />}
              label={totalCount - failCount}
              color="success"
              sx={{ opacity: totalCount - failCount === 0 ? 0.5 : 1 }}
              variant="outlined"
              size="small"
            />
            <Chip
              icon={<ErrorIcon fontSize="small" />}
              label={failCount}
              color={"error"}
              sx={{ opacity: failCount === 0 ? 0.5 : 1 }}
              variant="outlined"
              size="small"
            />
          </Stack>
        </CardContent>
      </ButtonBase>
    </OutlinedCard>
  );
}
