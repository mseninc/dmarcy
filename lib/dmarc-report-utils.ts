import { toArray } from "./array";

export function getAlignmentTypeText(alignmentType: AlignmentType): string {
  switch (alignmentType) {
    case "r":
      return "relaxed";
    case "s":
      return "strict";
    default:
      return "unknown";
  }
}

export function computeRecordScore(record: RecordType): number {
  const dkimScore =
    toArray(record.auth_results.dkim)[0]?.result === "pass" ? 1 : 0;
  const spfScore =
    toArray(record.auth_results.spf)[0]?.result === "pass" ? 1 : 0;
  const dkimScore2 = record.row.policy_evaluated.dkim === "pass" ? 1 : 0;
  const spfScore2 = record.row.policy_evaluated.dkim === "pass" ? 1 : 0;
  return dkimScore + spfScore + dkimScore2 + spfScore2;
}
