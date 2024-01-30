"use client";

import { Alert, Box, Stack, Typography } from "@mui/material";
import { OpenFileButton } from "@/components/parts/OpenFileButton";
import { extractXmlFromFile, parseXml } from "@/lib/xml-utils";
import { useCallback, useState } from "react";
import { ReportCard } from "@/components/parts/ReportCard";
import { VerticalScrollBox } from "@/components/elements/VerticalScrollBox";
import { ReportDetail } from "./ReportDetail";
import { OutlinedCard } from "../elements/OutlinedCard";

export function ReportViewer() {
  const [reports, setReports] = useState<DMARCReport[]>([]);

  const [selectedReport, setSelectedReport] = useState<DMARCReport | null>(
    null
  );

  const handleFileUpload = useCallback(
    async (file: File) => {
      if (reports.some((report) => report.reportFile === file.name)) {
        return;
      }
      const xml = await extractXmlFromFile(file);
      const feedback = parseXml(xml);
      const report: DMARCReport = {
        reportFile: file.name,
        xml,
        feedback,
      };
      setReports((prev) => [...prev, report]);
      setSelectedReport((prev) => (prev == null ? report : prev));
    },
    [reports]
  );

  const handleCardClick = useCallback((report: DMARCReport) => {
    setSelectedReport(report);
  }, []);

  const handleCardClose = useCallback(
    (report: DMARCReport) => {
      if (selectedReport === report) {
        setSelectedReport(null);
      }
      setReports(reports.filter((r) => r !== report));
    },
    [reports, selectedReport]
  );

  if (reports.length === 0) {
    return (
      <Box
        sx={{
          display: "grid",
          placeItems: "center",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <OutlinedCard sx={{ padding: 4, borderRadius: 4 }}>
          <Stack direction={"column"} spacing={2}>
            <Typography
              component="p"
              fontSize="h6.fontSize"
              sx={{ textAlign: "center", mb: 2 }}
            >
              Select DMARC Report files
            </Typography>
            <Alert severity="info">
              Compressed files (*.xml.gz, *.xml.zip) are also supported
            </Alert>
            <Alert severity="success">
              Your files will NEVER be uploaded to our server
            </Alert>
            <OpenFileButton onChange={handleFileUpload} />
          </Stack>
        </OutlinedCard>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "320px 1fr",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <VerticalScrollBox
        sx={{
          borderRight: 1,
          borderRightColor: (theme) => theme.palette.divider,
        }}
      >
        <Stack spacing={2} padding={2} paddingBottom={10}>
          {reports.map((report, index) => (
            <ReportCard
              key={index}
              report={report}
              onClick={handleCardClick}
              onClose={handleCardClose}
            />
          ))}
        </Stack>
      </VerticalScrollBox>
      {selectedReport && <ReportDetail report={selectedReport} />}
      <div
        style={{
          position: "fixed",
          bottom: "10px",
          left: "10px",
        }}
      >
        <OpenFileButton onChange={handleFileUpload} />
      </div>
    </Box>
  );
}
