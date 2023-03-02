import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TeacherDateFrameTable from './TeacherDataFrameTable';
import { Button, Grid } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import DepartmentFrameTable from './DepartmentFrameTable';
import SectionDataFrameTable from './SectionDataFrameTable';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postDepartment } from '../../states/department/departmentSlice';



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
  createData('Frozen yoghurt', 159, 6.0),
  createData('Ice cream sandwich', 237, 9.0),
  createData('Eclair', 262, 16.0),
  createData('Cupcake', 305, 3.7),
  createData('Gingerbread', 356, 16.0),
];

const DepartmentFrame = () => {

  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: '',
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
    <div style={{ marginLeft: '260px', marginRight: '280px', marginTop: '100px', width: '80%', background: 'white', height: '600px', color: 'white', display: 'block' }}>
      <div style={{ width: '100%', height: '100px', background: 'white', }}>
        <div >{/*style={{height:'45px', width:'150px', float: 'right', margin:'23px'}}>*/}
          {/* <Button variant="contained" style={{width:'100px', float: 'right', margin:'15px', marginTop:'30px'}}>ADD</Button> */}
          <Button variant="contained" onClick={handleClickOpen} style={{ width: '100px', float: 'right', margin: '15px', marginTop: '30px' }}>ADD</Button>


          <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby=""
          >
            <DialogTitle id="">
              {"Add Department"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Add Department
              </DialogContentText>

              <div style={{ background: 'white', width: '100%', height: '150px', padding: '30px', display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
                <TextField id="basic" placeholder='Department Name' size='small' style={{ margin: '5px', width: '100%' }}
                  name='name'
                  value={form.name}
                  onChange={onHandler}
                />
              </div>


            </DialogContent>
            <DialogActions style={{ background: 'white', display: 'flex', justifyContent: 'center' }}>
              <Button autoFocus onClick={() => {
                handleClose()
                dispatch(postDepartment(form))
              }
              } variant='contained'>
                Save
              </Button>
              <Button onClick={handleClose} autoFocus color='error' variant='contained'>
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
      <div style={{ height: '500px', width: '100%', background: 'white' }}>
        <DepartmentFrameTable />

      </div>
    </div>

  )
}

export default DepartmentFrame
