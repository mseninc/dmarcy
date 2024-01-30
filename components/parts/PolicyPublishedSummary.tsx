import { getAlignmentTypeText } from "@/lib/dmarc-report-utils";
import {
  Domain as DomainIcon,
  DomainAdd as DomainAddIcon,
  JoinLeft as JoinLeftIcon,
  JoinRight as JoinRightIcon,
  Percent as PercentIcon,
  Policy as PolicyIcon,
  ReportGmailerrorred as ReportGmailerrorredIcon,
} from "@mui/icons-material";
import { Chip, Stack, Typography } from "@mui/material";
import { OutlinedCard } from "@/components/elements/OutlinedCard";
import { WrappingHorizontalStack } from "@/components/elements/WrappingHorizontalStack";

type PolicyPublishedSummaryProps = {
  policyPublished: PolicyPublishedType;
};

export function PolicyPublishedSummary(props: PolicyPublishedSummaryProps) {
  return (
    <OutlinedCard>
      <WrappingHorizontalStack padding={2} columnGap={3}>
        <WrappingHorizontalStack>
          <PolicyIcon titleAccess="policy published" />
          <Typography variant="h6" color="inherit" component="div">
            {props.policyPublished.domain}
          </Typography>
        </WrappingHorizontalStack>
        <Stack direction="row" spacing={1}>
          <Chip
            variant="outlined"
            avatar={<DomainIcon />}
            label={props.policyPublished.p}
            title="p: The policy to apply to messages from the domain"
          />
          <Chip
            variant="outlined"
            avatar={<DomainAddIcon />}
            label={props.policyPublished.sp}
            title="sp: The policy to apply to messages from subdomains"
          />
          <Chip
            variant="outlined"
            avatar={<PercentIcon />}
            label={props.policyPublished.pct}
            title="pct: The percent of messages to which policy applies"
          />
          {props.policyPublished.fo !== undefined && (
            <Chip
              variant="outlined"
              avatar={<ReportGmailerrorredIcon />}
              label={props.policyPublished.fo}
              title="fo: Failure reporting options in effect"
            />
          )}
          {props.policyPublished.adkim !== undefined && (
            <Chip
              variant="outlined"
              avatar={<JoinRightIcon />}
              label={getAlignmentTypeText(props.policyPublished.adkim)}
              title="adkim: The DKIM alignment mode"
            />
          )}
          {props.policyPublished.aspf !== undefined && (
            <Chip
              variant="outlined"
              avatar={<JoinLeftIcon />}
              label={getAlignmentTypeText(props.policyPublished.aspf)}
              title="aspf: The SPF alignment mode"
            />
          )}
        </Stack>
      </WrappingHorizontalStack>
    </OutlinedCard>
  );
}
