import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Typography } from '@mui/material';
import './Grouping.css'

const columns = [
    { id: 'name', label: 'Name', minWidth: 50 },
    { id: 'regNo', label: 'Registration Number', minWidth: 50 },
    { id: 'email', label: 'Email', minWidth: 70 },
    { id: 'phoneNo', label: 'Phone Number', minWidth: 50 },
  ];
  

function createData(name, regNo,email ,phoneNo ) {
  return {name, regNo,email ,phoneNo};
}

const rows = [

  createData('Hasnain Bhati', '2020-CS-141', 'hkb@gmail.com', 95960483973),
   createData('Ali Tariq', '2020-CS-142', 'ali@gmail.com', 483973782),
  createData('M Ehsaan', '2020-CS-128', 'mehsaan@gmail.com',34605783973),
  createData('M Zeesham', '2020-CS-113', 'yd@gmail.com',28352173),
 
]

const Members=()=> {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div sx={{ display: 'flex', justifyContent: 'center',alignItems: 'center' , width: '100%'}}>
      <h2 align='center' className='font-style'>Group Members</h2>
        <Paper sx={{ width: '90%' , minWidth: 220,mx: 'auto',mt:'1.25rem',alignItems: 'center'}}>
      <TableContainer sx={{maxHeight: 520}}>
        <Table stickyHeader aria-label="sticky table" >
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </Paper>
    </div>
  );
}
export default Members