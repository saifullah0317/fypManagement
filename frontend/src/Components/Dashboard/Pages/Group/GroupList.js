import  React, {useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { getMembers } from '../../../../actions/groupActions';
import { Button } from '@mui/material';

function createData(
  name,
  calories,
  fat,
  carbs,
  protein
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function GroupList({groupMembers}) {
  
  
 



  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}  aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Roll Number</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {groupMembers?.result?.map((row) => (
            <TableRow
              key={row?.rollNo}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell >
                {row?.rollNo}
              </TableCell>
              <TableCell align="left">{row?.name}</TableCell>
              <TableCell align="left">{row?.email}</TableCell>
              <TableCell align="left"><Button  variant="contained" disabled style={{backgroundColor: row?.status=='confirm'?  '#2cc52c': 'skyblue',color: 'white' }}>{row?.status}</Button></TableCell>
              <TableCell align="left"><Button  variant="contained" disabled style={{borderRadius: '3rem',backgroundColor: row?.memberType=='Group Lead'?  '#2cc52c': 'skyblue',color: 'white' }}>{row?.memberType}</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}