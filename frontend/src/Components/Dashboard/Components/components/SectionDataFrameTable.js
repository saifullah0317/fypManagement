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
import { Form } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateSection } from '../../states/section/sectionSlice';
import { deleteSection, getSection } from '../../states/section/sectionSlice';


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

export default function SectionDataFrameTable() {

  const dispatch = useDispatch()
  const { section, isChanged } = useSelector(store => store.sectionReducer)
  const { session } = useSelector(store => store.sessionReducer)
  const [form, setForm] = useState({
    name: '',
    Session_Id: '',
    sessionName: '',
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
  const sessionName = (id) => {
    const sessionName = session.find(department => department._id === id)
    return sessionName.Session
  }
  function onHandler(event) {
    const { name, value } = event.target
    console.log(value);
    setForm(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const findIdDepartment = (name) => {
    if (session[0].name !== "") {
      const SessionId = session.find(department => department.Session === name)
      setForm(form.Session_Id = SessionId._id)

    }
  }

  React.useEffect(() => {
    dispatch(getSection())
  }, [isChanged])

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby=""
      >
        <DialogTitle id="">
          {"Edit Section"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Manage Section info
          </DialogContentText>

          <div style={{ background: 'white', width: '100%', height: '350px', padding: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>


            <TextField id="basic" placeholder='Section' size='small' style={{ margin: '5px', width: '100%' }}
              name='name'
              value={form.name}
              onChange={onHandler}
            />
            <Autocomplete

              id="disable-close-on-select"
              sx={{ width: 300 }}
              options={session.map((temp) => temp.Session)}
              placeholder='Session'
              renderInput={(params) => <TextField {...params} id='basic' placeholder={form.sessionName} size='small'
                name='sessionName'
                value={form.sessionName}
                onSelect={onHandler}
              />}
            />

          </div>


        </DialogContent>
        <DialogActions style={{ background: 'white', display: 'flex', justifyContent: 'center' }}>
          <Button autoFocus onClick={() => {

            handleClose()
            findIdDepartment(form.sessionName)
            dispatch(updateSection(form))
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

              <StyledTableCell align="left">Session</StyledTableCell>
              <StyledTableCell align="left">Section</StyledTableCell>

              <StyledTableCell align="left"></StyledTableCell>
              <StyledTableCell align="left"></StyledTableCell>


            </TableRow>
          </TableHead>
          {section[0].name !== "" && session[0].Session !== "" && <TableBody>
            {section.map((row) => (
              <StyledTableRow key={row._id}>

                <StyledTableCell align="left">{sessionName(row.Session_Id)}</StyledTableCell>
                <StyledTableCell align="left">{row.name}</StyledTableCell>
                <StyledTableCell align="left"></StyledTableCell>


                <TableCell align="right">
                  <Button
                    variant="contained"
                    size='small'
                    style={{ margin: '6px' }}
                    onClick={() => {

                      handleClickOpen()
                      setForm(prev => {
                        return {
                          ...prev,
                          name: row.name,
                          Session_Id: row.Session_Id,
                          sessionName: sessionName(row.Session_Id),
                          _id: row._id
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
                    onClick={() => {
                      dispatch(deleteSection(row._id))
                    }}

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