import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { getStudents, updateStudent } from '../../states/student/studentSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { deleteStudent } from '../../states/student/studentSlice';
import { useState } from 'react';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function StudentDataFrameTable() {
  const dispatch = useDispatch();
  const { isChanged } = useSelector(store => store.studentReducer)
  console.log(isChanged);
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    cnic: '',
    RegistrationNo: '',
    email: '',
    mobile: '',
    code: '',
    password: '',
    id: ''
  })


  useEffect(() => {
    dispatch(getStudents())
  }, [isChanged])

  const { student } = useSelector(store => store.studentReducer)
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function onHandler(event) {
    const { name, value } = event.target
    setForm(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby=""
      >
        <DialogTitle id="">
          {"Edit Student"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edit Student Information in the labled text fields
          </DialogContentText>

          <div style={{ background: 'white', width: '100%', height: '450px', padding: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>


            <TextField id="basic" placeholder='First Name' size='small' style={{ margin: '5px', width: '100%' }}
              name='firstname'
              value={form.firstname}
              onChange={onHandler}
            />
            <TextField id="basic" placeholder='Last Name' size='small' style={{ margin: '5px', width: '100%' }}
              name='lastname'
              value={form.lastname}
              onChange={onHandler}
            />
            <TextField id="basic" placeholder='Email' size='small' style={{ margin: '5px', width: '100%' }}
              name='email'
              value={form.email}
              onChange={onHandler}
            />
            <TextField id="basic" placeholder='CNIC' size='small' style={{ margin: '5px', width: '100%' }}
              name='cnic'
              value={form.cnic}
              onChange={onHandler}
            />
            <TextField id="basic" placeholder='Phone Number' variant="outlined" size='small' style={{ margin: '5px', width: '100%' }}
              name='mobile'
              value={form.mobile}
              onChange={onHandler}
            />
            <TextField id="basic" placeholder='Code' variant="outlined" size='small' style={{ margin: '5px', width: '100%' }}
              name='code'
              value={form.code}
              onChange={onHandler}
            />
            <TextField id="basic" placeholder='Password' variant="outlined" size='small' style={{ margin: '5px', width: '100%' }}
              name='password'
              value={form.password}
              onChange={onHandler}
            />
            <TextField id="basic" placeholder='Reg No.' variant="outlined" size='small' style={{ margin: '5px', width: '100%' }}
              name='RegistrationNo'
              value={form.RegistrationNo}
              onChange={onHandler}
            />
          </div>


        </DialogContent>
        <DialogActions style={{ background: 'white', display: 'flex', justifyContent: 'center' }}>
          <Button autoFocus onClick={() => {
            handleClose()
            dispatch(updateStudent(form))
          }} variant='contained' >
            Save
          </Button>
          <Button onClick={handleClose} autoFocus color='error' variant='contained'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>First Name</StyledTableCell>
              <StyledTableCell align="right">Last Name</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
              <StyledTableCell align="right">CNIC</StyledTableCell>
              <StyledTableCell align="right">Mobile</StyledTableCell>
              <StyledTableCell align="right">Code</StyledTableCell>
              <StyledTableCell align="right">Password</StyledTableCell>
              <StyledTableCell align="right">Registration No</StyledTableCell>


              <StyledTableCell align="right"></StyledTableCell>



            </TableRow>
          </TableHead>
          <TableBody>
            {student.map((row) => (
              <StyledTableRow key={row._id}>
                <StyledTableCell component="th" scope="row">
                  {row.firstname}
                </StyledTableCell>
                <StyledTableCell align="right">{row.lastname}</StyledTableCell>
                <StyledTableCell align="right">{row.email}</StyledTableCell>
                <StyledTableCell align="right">{row.cnic}</StyledTableCell>
                <StyledTableCell align="right">{row.mobile}</StyledTableCell>
                <StyledTableCell align="right">{row.code}</StyledTableCell>
                <StyledTableCell align="right">{row.password}</StyledTableCell>
                <StyledTableCell align="right">{row.RegistrationNo}</StyledTableCell>


                <TableCell align="right">
                  <Button
                    variant="contained"
                    size='small'
                    style={{ margin: '6px' }}
                    onClick={() => {
                      handleClickOpen()
                      setForm(() => {
                        return {
                          id: row._id,
                          firstname: row.firstname,
                          lastname: row.lastname,
                          email: row.email,
                          cnic: row.cnic,
                          mobile: row.mobile,
                          code: row.code,
                          password: row.password,
                          RegistrationNo: row.RegistrationNo
                        }

                      })
                    }}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="contained"
                    color="error"
                    size='small'
                    onClick={() => dispatch(deleteStudent(row._id))}

                  >
                    Delete
                  </Button>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
