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
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getCommitie } from '../../states/committee/commitieSlice';
import { useEffect } from 'react';
import { deleteCommitie, updateCommitie } from '../../states/committee/commitieSlice';
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


export default function CommittieTable() {
  const dispatch = useDispatch()
  const { isChanged } = useSelector(store => store.commitieReducer)
  const [form, setForm] = useState({
    name: '',
    NoOfMembers: '',
    CommitieMembers: '',
    id: ''
  })

  useEffect(() => {
    dispatch(getCommitie())
  }, [isChanged])


  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


  const { commitie } = useSelector(store => store.commitieReducer);

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
          {"Edit Section"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Form Committees
          </DialogContentText>

          <div style={{ background: 'white', width: '100%', height: '350px', padding: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <TextField id="basic" placeholder='Name' size='small' style={{ margin: '5px', width: '100%' }}
              name='name'
              value={form.name}
              onChange={onHandler}
            />

            <TextField id="basic" placeholder='No of Members' size='small' style={{ margin: '5px', width: '100%' }}
              name='NoOfMembers'
              value={form.NoOfMembers}
              onChange={onHandler}
            />
            <TextField id="basic" placeholder='Committee Members' size='small' style={{ margin: '5px', width: '100%' }}
              name='CommitieMembers'
              value={form.CommitieMembers}
              onChange={onHandler}
            />

          </div>


        </DialogContent>
        <DialogActions style={{ background: 'white', display: 'flex', justifyContent: 'center' }}>
          <Button autoFocus onClick={() => {
            handleClose()
            dispatch(updateCommitie(form))
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
              <StyledTableCell align="left">Name</StyledTableCell>
              <StyledTableCell align="left">No of Members</StyledTableCell>
              <StyledTableCell align="left">Committee Members</StyledTableCell>

              <StyledTableCell align="right"></StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>


            </TableRow>
          </TableHead>
          <TableBody>
            {commitie.map((row) => (
              <StyledTableRow key={row._id}>

                <StyledTableCell align="left">{row.name}</StyledTableCell>
                <StyledTableCell align="left">{row.NoOfMembers}</StyledTableCell>
                <StyledTableCell align="left">{row.CommitieMembers}</StyledTableCell>
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
                          name: row.name,
                          NoOfMembers: row.NoOfMembers,
                          CommitieMembers: row.CommitieMembers,
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
                    onClick={() => dispatch(deleteCommitie(row._id))}
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