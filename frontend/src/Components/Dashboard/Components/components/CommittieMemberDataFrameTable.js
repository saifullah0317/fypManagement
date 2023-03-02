import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Autocomplete, Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getCommitie } from '../../states/committee/commitieSlice';
import { useEffect } from 'react';
import { deleteCommitie, updateCommitie } from '../../states/committee/commitieSlice';
import { useState } from 'react';
import { getcommitteeMember, deleteMember, updateMember } from '../../states/comitteeMember/committeeMemberSlice';




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


export default function CommittieMemberDataFrameTable() {
  const dispatch = useDispatch()
  const { isChanged } = useSelector(store => store.committieMemberReducer)
  const [form, setForm] = useState({
    Committee_Id: '',
    Teacher_Id: '',
    commitieName: '',
    teacherName: '',
    _id: ''
  })

  useEffect(() => {
    dispatch(getcommitteeMember())
  }, [isChanged])


  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


  const { comitteeMember } = useSelector(store => store.committieMemberReducer)
  const { commitie } = useSelector(store => store.commitieReducer)
  const { teacher } = useSelector(store => store.teacherReducer)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const teachertName = (id) => {
    if (teacher[0].firstname !== "") {
      const tech = teacher.find(department => department._id === id)
      console.log("tech" + tech);
      return (tech.firstname + " " + tech.lastname)
    }
  }

  const committeeName = (id) => {
    if (commitie[0].name !== "") {
      const committee = commitie.find(department => department._id === id)
      return (committee.name)
    }
  }

  const findIdteacher = (name) => {
    if (teacher[0].firstname !== "") {
      const teach = teacher.find((tec) => tec.firstname + " " + tec.lastname === name)
      setForm(form.Teacher_Id = teach._id)

    }
  }

  const findIdcommitie = (name) => {
    if (commitie[0].name !== "") {
      const teach = commitie.find(tec => tec.name === name)
      setForm(form.Committee_Id = teach._id)

    }
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


  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby=""
      >
        <DialogTitle id="">
          {"Edit Commttie Member"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Form Committees
          </DialogContentText>

          <div style={{ background: 'white', width: '100%', height: '350px', padding: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>


            <Autocomplete
              style={{ margin: '5px' }}
              id="disable-close-on-select"

              sx={{ width: 300 }}
              options={teacher.map((option) => option.firstname + " " + option.lastname)}
              placeholder='Department'
              renderInput={(params) => <TextField {...params} id='basic' placeholder={form.teacherName} size='small'
                name='teacherName'
                value={form.teacherName}
                onSelect={onHandler}

              />}
            />
            <Autocomplete
              style={{ margin: '5px' }}
              id="disable-close-on-select"
              sx={{ width: 300 }}
              options={commitie.map((option) => option.name)}
              placeholder='Department'
              renderInput={(params) => <TextField {...params} id='basic' placeholder={form.commitieName} size='small'
                name='commitieName'
                value={form.commitieName}
                onSelect={onHandler}
              />}
            />


          </div>


        </DialogContent>
        <DialogActions style={{ background: 'white', display: 'flex', justifyContent: 'center' }}>
          <Button autoFocus onClick={() => {
            handleClose()
            findIdteacher(form.teacherName)
            findIdcommitie(form.commitieName)
            dispatch(updateMember(form))
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

              <StyledTableCell align="left">Teacher</StyledTableCell>
              <StyledTableCell align="left">Committee</StyledTableCell>


              <StyledTableCell align="right"></StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>


            </TableRow>
          </TableHead>
          {teacher[0].firstname !== "" && commitie[0].name !== "" && <TableBody>
            {comitteeMember.map((row) => (
              <StyledTableRow key={row._id}>

                <StyledTableCell align="left">{teachertName(row.Teacher_Id)}</StyledTableCell>
                <StyledTableCell align="left">{committeeName(row.Committee_Id)}</StyledTableCell>
                <StyledTableCell align="left"></StyledTableCell>



                <TableCell align="right">
                  <Button
                    variant="contained"
                    size='small'
                    style={{ margin: '6px' }}
                    onClick={() => {
                      handleClickOpen()
                      setForm(() => {
                        return {
                          Committee_Id: row.Committee_Id,
                          Teacher_Id: row.Teacher_Id,
                          commitieName: committeeName(row.Committee_Id),
                          teacherName: teachertName(row.Teacher_Id),
                          id: row._id
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
                    onClick={() => dispatch(deleteMember(row._id))}
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