import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export type UserProps = {
  id: string;
  firstName: string;
  lastName: string;
  nik: string;
  phone: string;
  status: string;
  basicTest: number;
  mathTest: number;
  codingTest: number;
  batch: string;
};

type UserTableRowProps = {
  row: UserProps;
  onSelectRow: () => void;
  loading: boolean;
};

export function UserTableRow({ row, onSelectRow, loading = false }: UserTableRowProps) {
  return (
    <TableRow hover tabIndex={-1}>
      <TableCell>
        <Typography variant="subtitle2">{row.firstName}</Typography>
      </TableCell>

      <TableCell>
        <Typography variant="subtitle2">{row.lastName}</Typography>
      </TableCell>

      <TableCell>{row.nik}</TableCell>

      <TableCell>{row.phone}</TableCell>

      <TableCell>
          {row.status === 'PENDING' ? 'Belum ditentukan' : row.status}
      </TableCell>

      <TableCell align="center">{row.basicTest}</TableCell>

      <TableCell align="center">{row.mathTest}</TableCell>

      <TableCell align="center">{row.codingTest}</TableCell>

      <TableCell align="center">
        <Button
          variant="contained"
          color="primary"
          onClick={onSelectRow}
          disabled={row.status !== 'PENDING' || loading}
        >
          {loading ? 'Predicting...': 'Predict'}
        </Button>
      </TableCell>
    </TableRow>
  );
}
