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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getSession, deleteSession, updateSession } from '../../states/session/sessionSlice';

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

function createData(Dept, Section, Session) {
  return { Dept, Section, Session };
}

const rows = [
  createData('Computer Science', 'A,B,C', 2020),
  createData('Computer Engineering', 'A,B,C', 2020),
  createData('Eclair', 262, 16.0),
  createData('Cupcake', 305, 3.7),
  createData('Gingerbread', 356, 16.0),
];

export default function SessionFrameTable() {
  const dispatch = useDispatch()
  const { session, isChanged } = useSelector(store => store.sessionReducer)
  const { department } = useSelector(store => store.departmentReducer)
  const [form, setForm] = useState({
    Session: '',
    Dep_Id: '',
    Members_Limit_In_Group: '',
    Year: '',
    departmentName: '',
    _id: ''
  })



  const [open, setOpen] = React.useState(false);
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

  useEffect(() => {
    dispatch(getSession())
  }, [isChanged])

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
      setForm(form.Dep_Id = departmentId._id)

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
          {"Edit Session"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Manage Department and their relevant sections
          </DialogContentText>

          <div style={{ background: 'white', width: '100%', height: '350px', padding: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>


            <Autocomplete

              id="disable-close-on-select"
              sx={{ width: 300 }}
              options={department.map((temp) => temp.name)}
              placeholder='Department'
              renderInput={(params) => <TextField {...params} id='basic' placeholder={form.departmentName} size='small'
                name='departmentName'
                value={form.departmentName}
                onSelect={onHandler}
              />}
            />

            <TextField id="basic" placeholder='Session' size='small' style={{ margin: '5px', width: '100%' }}
              name='Session'
              value={form.Session}
              onChange={onHandler}
            />
            <TextField id="basic" placeholder='Group Limit' size='small' style={{ margin: '5px', width: '100%' }}
              name='Members_Limit_In_Group'
              value={form.Members_Limit_In_Group}
              onChange={onHandler}
            />
            <TextField id="basic" placeholder='Year' size='small' style={{ margin: '5px', width: '100%' }}
              name='Year'
              value={form.Year}
              onChange={onHandler}
            />

          </div>


        </DialogContent>
        <DialogActions style={{ background: 'white', display: 'flex', justifyContent: 'center' }}>
          <Button autoFocus onClick={() => {

            handleClose()
            findIdDepartment(form.departmentName)
            dispatch(updateSession(form))

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
              <StyledTableCell align="left">Department</StyledTableCell>
              <StyledTableCell align="left">Session</StyledTableCell>
              <StyledTableCell align="left">Group Limit</StyledTableCell>

              <StyledTableCell align="left">Year</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>


            </TableRow>
          </TableHead>

          {department[0].name !== "" && session[0].Session !== "" && <TableBody>
            {session.map((row) => (
              <StyledTableRow key={row._id}>

                <StyledTableCell align="left">{departmentName(row.Dep_Id)}</StyledTableCell>
                <StyledTableCell align="left">{row.Session}</StyledTableCell>
                <StyledTableCell align="left">{row.Members_Limit_In_Group}</StyledTableCell>
                <StyledTableCell align="left">{row.Year}</StyledTableCell>


                <TableCell align="right">
                  <Button
                    variant="contained"
                    size='small'
                    style={{ margin: '6px' }}
                    onClick={() => {
                      handleClickOpen()
                      setForm({
                        Session: row.Session,
                        Dep_Id: row.Dep_Id,
                        Members_Limit_In_Group: row.Members_Limit_In_Group,
                        Year: row.Year,
                        departmentName: departmentName(row.Dep_Id),
                        _id: row._id
                      })
                    }}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="contained"
                    color="error"
                    size='small'
                    onClick={() => dispatch(deleteSession(row._id))}

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