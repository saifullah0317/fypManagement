import * as React from 'react';
import TeacherDateFrameTable from './TeacherDataFrameTable';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { postTeacher } from '../../states/teacher/teacherSlice';
import { useDispatch } from 'react-redux';


const TeacherFrame = () => {


  const dispatch = useDispatch()
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    cnic: '',
    departmentid: '',
    email: '',
    mobile: '',
    departmentName: ''
  })


  const { department } = useSelector(store => store.departmentReducer)


  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const findIdDepartment = (name) => {
    if (department[0].name !== "") {
      const departmentId = department.find(department => department.name === name)
      setForm(form.departmentid = departmentId._id)

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
              {"Add Teacher"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Add Teachers Information in the labled text fields
              </DialogContentText>

              <div style={{ background: 'white', width: '100%', height: '350px', padding: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>


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
                <Autocomplete

                  id="disable-close-on-select"
                  sx={{ width: 300 }}
                  options={department.map(temp => temp.name)}
                  placeholder='Department'
                  renderInput={(params) => <TextField {...params} id='basic' placeholder='Department' size='small'
                    name='departmentName'
                    value={form.departmentName}
                    onSelect={onHandler}
                  />}
                />
                <TextField id="basic" placeholder='Phone Number' variant="outlined" size='small' style={{ margin: '5px', width: '100%' }}
                  name='mobile'
                  value={form.mobile}
                  onChange={onHandler}
                />
                <TextField id="basic" placeholder='CNIC' variant="outlined" size='small' style={{ margin: '5px', width: '100%' }}
                  name='cnic'
                  value={form.cnic}
                  onChange={onHandler}
                />
              </div>


            </DialogContent>
            <DialogActions style={{ background: 'white', display: 'flex', justifyContent: 'center' }}>
              <Button autoFocus
                onClick={() => {
                  handleClose()
                  findIdDepartment(form.departmentName)
                  dispatch(postTeacher(form))
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
        <TeacherDateFrameTable />

      </div>
    </div>
  )
}

export default TeacherFrame