import { Box } from "@mui/material";
import { PolicyPublishedSummary } from "./PolicyPublishedSummary";
import { ReportMetadataSummary } from "./ReportMetadataSummary";
import { ReportRecordGrid } from "./ReportRecordGrid";
import { toArray } from "@/lib/array";
import { useMemo } from "react";
import { computeRecordScore } from "@/lib/dmarc-report-utils";

type ReportDetailProps = {
  report: DMARCReport;
};

export function ReportDetail(props: ReportDetailProps) {
  const { report } = props;
  const records = useMemo(() => {
    const array = toArray(report.feedback.record); //.slice();
    array.sort((a, b) => {
      const scoreA = computeRecordScore(a);
      const scoreB = computeRecordScore(b);
      if (scoreA !== scoreB) {
        return scoreA - scoreB;
      }
      return a.row.count - b.row.count;
    });
    return array;
  }, [report]);
  return (
    <Box
      display={"grid"}
      padding={2}
      rowGap={1}
      gridTemplateRows={"auto auto 1fr"}
      overflow={"hidden"}
    >
      <PolicyPublishedSummary
        policyPublished={report.feedback.policy_published}
      />
      <ReportMetadataSummary
        fileName={report.reportFile}
        reportMetadata={report.feedback.report_metadata}
      />
      <ReportRecordGrid records={records} />
      {/* <pre>{report.xml}</pre> */}
    </Box>
  );
}
