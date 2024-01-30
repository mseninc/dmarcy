// Type definitions for DMARC report

interface DMARCReport {
  reportFile: string;
  xml: string;
  feedback: FeedbackType;
}

type AlignmentType = "r" | "s";
type DispositionType = "none" | "quarantine" | "reject";
type DMARCResultType = "pass" | "fail";
type DKIMResultType =
  | "none"
  | "pass"
  | "fail"
  | "policy"
  | "neutral"
  | "temperror"
  | "permerror";
type SPFResultType =
  | "none"
  | "pass"
  | "fail"
  | "softfail"
  | "neutral"
  | "temperror"
  | "permerror";
type PolicyType = "none" | "quarantine" | "reject";
type PolicyOverrideType =
  | "forwarded"
  | "sampled_out"
  | "trusted_forwarder"
  | "mailing_list"
  | "local_policy"
  | "other";
type SPFDomainScope = "mfrom" | "helo";

interface FeedbackType {
  version: number;
  report_metadata: ReportMetadataType;
  policy_published: PolicyPublishedType;
  record: RecordType | RecordType[];
}

interface ReportMetadataType {
  org_name: string;
  email: string;
  extra_contact_info?: string;
  report_id: string;
  date_range: DateRangeType;
  error?: string | string[];
}

interface DateRangeType {
  begin: number;
  end: number;
}

interface PolicyPublishedType {
  domain: string;
  adkim?: AlignmentType;
  aspf?: AlignmentType;
  p: DispositionType;
  sp: DispositionType;
  pct: number;
  fo?: string | string[];
}

interface PolicyOverrideReason {
  type: PolicyOverrideType;
  comment?: string;
}

interface RecordType {
  row: RowType;
  identifiers: IdentifierType;
  auth_results: AuthResultType;
}

interface RowType {
  source_ip: string;
  count: number;
  policy_evaluated: PolicyEvaluatedType;
}

interface PolicyEvaluatedType {
  disposition: string;
  dkim: string;
  spf: string;
  reason?: PolicyOverrideReason | PolicyOverrideReason[];
}

interface AuthResultType {
  dkim: DKIMAuthResultType | DKIMAuthResultType[];
  spf: SPFAuthResultType | SPFAuthResultType[];
}

interface DKIMAuthResultType {
  domain: string;
  result: string;
  selector?: string;
  human_result?: string;
}

interface SPFAuthResultType {
  domain: string;
  scope: SPFDomainScope;
  result: string;
}

interface IdentifierType {
  envelope_to?: string;
  envelope_from: string;
  header_from: string;
}
