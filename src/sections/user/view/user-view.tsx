import Swal from 'sweetalert2';
import { useQuery, useMutation } from '@apollo/client';
import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { MenuItem, Select } from '@mui/material';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { Scrollbar } from 'src/components/scrollbar';

import { TableNoData } from '../table-no-data';
import { UserTableRow } from '../user-table-row';
import { UserTableHead } from '../user-table-head';
import { TableEmptyRows } from '../table-empty-rows';
import { emptyRows, applyFilter, getComparator } from '../utils';
import { SINGLE_PREDICTION } from '../../../graphql/MLPrediction';
import { QUERY_LIST_CANDIDATES } from '../../../graphql/listCandidates';

import type { UserProps} from '../user-table-row';

export function UserView() {
  const table = useTable();
  const [filterName, setFilterName] = useState('');
  const [candidates, setCandidates] = useState<UserProps[]>([]);
  const [loadingPredictId, setLoadingPredictId] = useState<string | null>(null);
  const [batchFilter, setBatchFilter] = useState('ALL');


  const { loading, data: candidatesData, error } = useQuery(QUERY_LIST_CANDIDATES, {
    context: {
      headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    },
  });

  const [singlePredict, { loading: mutationLoading }] = useMutation(SINGLE_PREDICTION, {
    context: {
      headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    },
  });

  // Update state ketika data dari query didapatkan
  useEffect(() => {
    if (candidatesData?.listCandidates) {
      const mapped = candidatesData.listCandidates.map((item: any) => ({
        id: item.nik,
        firstName: item.firstName,
        lastName: item.lastName,
        nik: item.nik,
        phone: item.phone,
        status: item.status,
        basicTest: item.technicalScore.basicTest,
        mathTest: item.technicalScore.mathTest,
        codingTest: item.technicalScore.codingTest,
        batch: item.batch
      }));
      setCandidates(mapped);
    }
  }, [candidatesData]);

  const showPredictLoading = (firstName: string) => {
    let timerInterval: any;
    return Swal.fire({
      title: `Memprediksi status kelulusan untuk ${firstName}`,
      html: 'Forecasting in progress <b></b> milliseconds.',
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup()?.querySelector('b');
        timerInterval = setInterval(() => {
          if (timer) timer.textContent = `${Swal.getTimerLeft()}`;
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      }
    });
  };

  const handleSinglePredict = async (nik: string, firstName: string) => {
    setLoadingPredictId(nik);

    await showPredictLoading(firstName);

    try {
      const { data } = await singlePredict({ variables: { nik } });
      const predictedStatus = data?.predictCandidate?.status ?? 'Unknown';

      setCandidates((prev) =>
        prev.map((candidate) =>
          candidate.nik === nik ? { ...candidate, status: predictedStatus } : candidate
        )
      );
    } catch (e) {
      console.error('Prediction error:', e);
      Swal.fire('Error', 'Terjadi kesalahan saat memprediksi.', 'error');
    } finally {
      setLoadingPredictId(null);
      Swal.close(); // tutup Swal loading manual
    }
  };

  const filteredByBatch = batchFilter === 'ALL'
    ? candidates
    : candidates.filter((c) => c.batch === batchFilter);

  const dataFiltered: UserProps[] = applyFilter({
    inputData: filteredByBatch,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  const uniqueBatches = Array.from(new Set(candidates.map((c) => c.batch)))
    .sort((a, b) => Number(a) - Number(b));

  return (
    <>
      <Box sx={{ mt: 5, mb: 2, display: 'flex', alignItems: 'center' }}>
        <Typography variant="h3" sx={{ flexGrow: 1 }}>
          List Candidates
        </Typography>
        <Select value={batchFilter} onChange={(e) => setBatchFilter(e.target.value)}>
          <MenuItem value="ALL">
            <Typography>All Batches</Typography>
          </MenuItem>
          {uniqueBatches.map((batch) => (
            <MenuItem key={batch} value={batch}>
              <Typography>Batch {batch}</Typography>
            </MenuItem>
          ))}
        </Select>


      </Box>

      <Card>
        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={candidates.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    candidates.map((user) => user.id)
                  )
                }
                headLabel={[
                  { id: 'firstName', label: 'First Name' },
                  { id: 'lastName', label: 'Last Name' },
                  { id: 'nik', label: 'NIK' },
                  { id: 'phone', label: 'Phone' },
                  { id: 'status', label: 'Status' },
                  { id: 'basicTest', label: 'Basic Test' },
                  { id: 'mathTest', label: 'Math Test' },
                  { id: 'codingTest', label: 'Coding Test' },
                  { id: 'predictButton', label: 'ML Prediction' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <UserTableRow
                      key={row.id}
                      row={row}
                      loading={loadingPredictId === row.id}
                      onSelectRow={() => handleSinglePredict(row.id, row.firstName)}
                    />
                  ))}

                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(
                    table.page,
                    table.rowsPerPage,
                    candidates.length
                  )}
                />

                {notFound && <TableNoData searchQuery={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={candidates.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
    </>
  );
}

// hook untuk manajemen table
export function useTable() {
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState('firstName');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const onSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    },
    [order, orderBy]
  );

  const onSelectAllRows = useCallback((checked: boolean, newSelecteds: string[]) => {
    if (checked) {
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }, []);

  const onSelectRow = useCallback(
    (inputValue: string) => {
      const newSelected = selected.includes(inputValue)
        ? selected.filter((value) => value !== inputValue)
        : [...selected, inputValue];

      setSelected(newSelected);
    },
    [selected]
  );

  const onResetPage = useCallback(() => {
    setPage(0);
  }, []);

  const onChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      onResetPage();
    },
    [onResetPage]
  );

  return {
    page,
    order,
    onSort,
    orderBy,
    selected,
    rowsPerPage,
    onSelectRow,
    onResetPage,
    onChangePage,
    onSelectAllRows,
    onChangeRowsPerPage,
  };
}
