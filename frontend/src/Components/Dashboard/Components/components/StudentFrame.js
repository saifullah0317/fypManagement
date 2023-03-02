import * as React from 'react';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import StudentDataFrameTable from './StudentDataFrameTable';
import { useState } from 'react';
import { useDispatch } from 'react-redux';  
import { postStudent } from '../../states/student/studentSlice';

const StudentFrame = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    cnic: '',
    RegistrationNo: '',
    email: '',
    mobile: '',
    code: '',
    password: '',
  })

  function onHandler(event) {
    const { name, value } = event.target
    setForm(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }
  const handleSubmit = () => {
    dispatch(postStudent(form))
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
              {"Add Student"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Add Student Information in the labled text fields
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
                handleSubmit()
                handleClose()
              }} variant='contained'>
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
        <StudentDataFrameTable />

      </div>
    </div >


  )
}

export default StudentFrame