import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
  GridTreeNodeWithRender,
  gridClasses,
} from "@mui/x-data-grid";

import { toArray } from "@/lib/array";
import { ResultTypeChip } from "./ResultTypeChip";
import { DispositionTypeChip } from "./DispositionTypeChip";
import { Article } from "@mui/icons-material";

type ReportRecordGridProps = {
  records: RecordType[];
};

function renderResultCell(
  params: GridRenderCellParams<
    any,
    DMARCResultType | DKIMResultType | SPFResultType,
    any,
    GridTreeNodeWithRender
  >
): JSX.Element | null {
  if (!params.value) {
    return null;
  }
  return <ResultTypeChip result={params.value} />;
}

function renderDispositionCell(
  params: GridRenderCellParams<
    any,
    DispositionType,
    any,
    GridTreeNodeWithRender
  >
): JSX.Element | null {
  if (!params.value) {
    return null;
  }
  return <DispositionTypeChip disposition={params.value} />;
}

const columns: GridColDef<RecordType, any, any>[] = [
  {
    field: "source_ip",
    valueGetter: (params) => params.row.row.source_ip,
    headerName: "Source IP",
    width: 130,
  },
  {
    field: "count",
    valueGetter: (params) => params.row.row.count,
    headerName: "Count",
    width: 60,
    type: "number",
  },
  {
    field: "disposition",
    valueGetter: (params) => params.row.row.policy_evaluated.disposition,
    renderCell: renderDispositionCell,
    headerName: "Eval/Disposition",
    width: 80,
  },
  {
    field: "dkim",
    valueGetter: (params) => params.row.row.policy_evaluated.dkim,
    renderCell: renderResultCell,
    headerName: "Eval/DKIM",
    width: 80,
  },
  {
    field: "spf",
    valueGetter: (params) => params.row.row.policy_evaluated.spf,
    renderCell: renderResultCell,
    headerName: "Eval/SPF",
    width: 80,
  },
  {
    field: "header_from",
    valueGetter: (params) => params.row.identifiers.header_from,
    headerName: "Header from",
    width: 150,
  },
  {
    field: "envelope_from",
    valueGetter: (params) => params.row.identifiers.envelope_from,
    headerName: "Envelope from",
    width: 150,
  },
  {
    field: "auth_result/dkim",
    valueGetter: (params) => toArray(params.row.auth_results.dkim)[0]?.result,
    renderCell: renderResultCell,
    headerName: "DKIM",
    width: 80,
  },
  {
    field: "auth_result/dkim/domain",
    valueGetter: (params) => toArray(params.row.auth_results.dkim)[0]?.domain,
    headerName: "DKIM Domain",
    width: 150,
  },
  {
    field: "auth_result/spf",
    valueGetter: (params) => toArray(params.row.auth_results.spf)[0]?.result,
    renderCell: renderResultCell,
    headerName: "SPF",
    width: 80,
  },
  {
    field: "auth_result/spf/domain",
    valueGetter: (params) => toArray(params.row.auth_results.spf)[0]?.domain,
    headerName: "SPF Domain",
    width: 150,
  },
  {
    field: "record",
    valueGetter: (params) => JSON.stringify(params.row, null, 2),
    renderCell: (params) => {
      return <Article color="secondary" titleAccess={params.value} />;
    },
    headerName: "Record",
    width: 70,
  },
];

const getRowId = (record: RecordType) => JSON.stringify(record);

export function ReportRecordGrid(props: ReportRecordGridProps) {
  const { records } = props;

  return (
    <DataGrid
      rows={records}
      columns={columns}
      getRowId={getRowId}
      getRowHeight={() => "auto"}
      columnHeaderHeight={32}
      disableRowSelectionOnClick
      sx={{
        [`& .${gridClasses.cell}`]: {
          py: 1,
        },
      }}
    />
  );
}
