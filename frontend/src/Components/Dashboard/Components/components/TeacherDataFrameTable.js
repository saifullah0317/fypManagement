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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { deleteTeacher, updateTeacher } from '../../states/teacher/teacherSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getTeachers } from '../../states/teacher/teacherSlice';
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


export default function TeacherDataFrameTable() {
  const dispatch = useDispatch()
  const { teacher, isChanged } = useSelector(store => store.teacherReducer)
  const { department } = useSelector(store => store.departmentReducer)

  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    cnic: '',
    departmentid: '',
    email: '',
    mobile: '',
    departmentName: '',
    id: ''
  })


  useEffect(() => {
    dispatch(getTeachers())
  }, [isChanged])

  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const departmentName = (id) => {
    const departmentName = department.find(department => department._id === id)
    return departmentName.name
  }
  function onHandler(event) {
    const { name, value } = event.target
    setForm(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }
  const findIdDepartment = (name) => {
    if (department[0].name !== "") {
      const departmentId = department.find(department => department.name === name)
      setForm(form.departmentid = departmentId._id)

    }
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
          {"Edit Teacher"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edit Teachers Information in the labled text fields
          </DialogContentText>

          <div style={{ background: 'white', width: '100%', height: '350px', padding: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>


            <TextField id="basic" placeholder='First Name' size='small' style={{ margin: '5px', width: '100%' }}
              name='firstname' value={form.firstname} onChange={onHandler}
            />
            <TextField id="basic" placeholder='Last Name' size='small' style={{ margin: '5px', width: '100%' }}
              name='lastname' value={form.lastname} onChange={onHandler}
            />
            <TextField id="basic" placeholder='Email' size='small' style={{ margin: '5px', width: '100%' }}
              name='email' value={form.email} onChange={onHandler}
            />
            <Autocomplete

              id="disable-close-on-select"
              disableCloseOnSelect
              sx={{ width: 300 }}
              options={department.map((temp) => temp.name)}
              placeholder='Department'
              renderInput={(params) => <TextField {...params} id='basic' placeholder={form.departmentName} size='small'
                name='departmentName'
                value={form.departmentName}
                onSelect={onHandler}
              />
              }

            />
            <TextField id="basic" placeholder='Phone Number' variant="outlined" size='small' style={{ margin: '5px', width: '100%' }}
              name='mobile' value={form.mobile} onChange={onHandler}
            />
            <TextField id="basic" placeholder='ID' variant="outlined" size='small' style={{ margin: '5px', width: '100%' }}
              name='cnic' value={form.cnic} onChange={onHandler}
            />
          </div>


        </DialogContent>
        <DialogActions style={{ background: 'white', display: 'flex', justifyContent: 'center' }}>
          <Button autoFocus onClick={() => {
            handleClose()
            findIdDepartment(form.departmentName)
            dispatch(updateTeacher(form))
          }} variant='contained'>
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
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="left">Email</StyledTableCell>
              <StyledTableCell align="left">Department</StyledTableCell>
              <StyledTableCell align="left">Phone Number</StyledTableCell>
              <StyledTableCell align="left">CNIC</StyledTableCell>
              <StyledTableCell align="left"></StyledTableCell>


            </TableRow>
          </TableHead>
          {teacher[0].firstname !== ""
            && department[0].name !== "" && <TableBody>
              {teacher.map((row) => (
                <StyledTableRow key={row._id}>
                  <StyledTableCell component="th" scope="row">
                    {row.firstname + " " + row.lastname}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.email}</StyledTableCell>
                  <StyledTableCell align="left">{departmentName(row.departmentid)}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.mobile}</StyledTableCell>
                  <StyledTableCell align="left">{row.cnic}</StyledTableCell>

                  <TableCell align="right">
                    <Button
                      variant="contained"
                      size='small'
                      style={{ margin: '6px' }}
                      onClick={() => {
                        handleClickOpen()
                        setForm({
                          firstname: row.firstname,
                          lastname: row.lastname,
                          cnic: row.cnic,
                          departmentid: row.departmentid,
                          email: row.email,
                          mobile: row.mobile,
                          departmentName: departmentName(row.departmentid),
                          id: row._id
                        })
                      }}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="contained"
                      color="error"
                      size='small'
                      onClick={() => dispatch(deleteTeacher(row._id))}

                    >
                      Delete
                    </Button>
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>}

        </Table>
      </TableContainer>
    </div>
  );
}
