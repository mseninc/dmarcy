import { numberToDateString } from "@/lib/date";
import {
  ContactSupport as ContactSupportIcon,
  Description as DescriptionIcon,
  Email as EmailIcon,
  Event as EventIcon,
  Inbox,
  Tag as TagIcon,
} from "@mui/icons-material";
import { Box, Chip, Typography } from "@mui/material";
import { OutlinedCard } from "@/components/elements/OutlinedCard";
import { WrappingHorizontalStack } from "@/components/elements/WrappingHorizontalStack";

type ReportMetadataSummaryProps = {
  fileName: string;
  reportMetadata: ReportMetadataType;
};

export function ReportMetadataSummary(props: ReportMetadataSummaryProps) {
  const { fileName, reportMetadata } = props;
  return (
    <OutlinedCard>
      <WrappingHorizontalStack padding={2}>
        <WrappingHorizontalStack>
          <Inbox titleAccess="report submitter" />
          <Typography variant="h6" color="text.primary">
            {reportMetadata.org_name}
          </Typography>
          <Chip
            label={fileName}
            title={"report file name"}
            icon={<DescriptionIcon />}
            size="small"
            variant="outlined"
          />
        </WrappingHorizontalStack>
        <WrappingHorizontalStack>
          <Chip
            label={numberToDateString(reportMetadata.date_range.begin)}
            title={`date_range.begin - date_range.end\n${numberToDateString(
              reportMetadata.date_range.begin
            )} - ${numberToDateString(reportMetadata.date_range.end)}`}
            icon={<EventIcon />}
            size="small"
            variant="outlined"
          />
          <Chip
            label={reportMetadata.report_id}
            title={"report_id"}
            icon={<TagIcon />}
            size="small"
            variant="outlined"
          />
          <Chip
            label={reportMetadata.email}
            title={"email"}
            icon={<EmailIcon />}
            size="small"
            variant="outlined"
          />
          {reportMetadata.extra_contact_info && (
            <Chip
              label={reportMetadata.extra_contact_info}
              title={"extra_contact_info"}
              icon={<ContactSupportIcon />}
              size="small"
              variant="outlined"
            />
          )}
        </WrappingHorizontalStack>
      </WrappingHorizontalStack>
    </OutlinedCard>
  );
}
