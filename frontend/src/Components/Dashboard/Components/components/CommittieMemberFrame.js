import * as React from 'react';
import { Autocomplete, Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import CommittieTable from './CommittieTable'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postCommitie } from '../../states/committee/commitieSlice';
import CommittieMemberDataFrameTable from './CommittieMemberDataFrameTable';
import { useSelector } from 'react-redux';
import { postMember } from '../../states/comitteeMember/committeeMemberSlice';

const CommittieMemberFrame = () => {

  const dispatch = useDispatch();

  const { commitie } = useSelector(store => store.commitieReducer)
  const { teacher } = useSelector(store => store.teacherReducer)
  const [form, setForm] = useState({
    Committee_Id: '',
    Teacher_Id: '',
    commitieName: '',
    teacherName: ''
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


  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const findIdteacher = (name) => {
    if (teacher[0].name !== "") {
      const tech = teacher.find(tec => tec.firstname + " " + tec.lastname === name)
      setForm(form.Teacher_Id = tech._id)

    }
  }

  const findIdcommittee = (name) => {
    if (commitie[0].name !== "") {
      const com = commitie.find(comi => comi.name === name)
      setForm(form.Committee_Id = com._id)

    }
  }


  return (
    <div style={{ marginLeft: '260px', marginRight: '280px', marginTop: '100px', width: '80%', background: 'white', height: '600px', color: 'white', display: 'block' }}>
      <div style={{ width: '100%', height: '100px', background: 'white', }}>
        <div >{/*style={{height:'45px', width:'150px', float: 'right', margin:'23px'}}>*/}
          {/* <Button variant="contained" style={{width:'100px', float: 'right', margin:'15px', marginTop:'30px'}}>ADD</Button> */}
          <Button variant="contained" onClick={handleClickOpen} style={{ width: '100px', float: 'right', margin: '15px', marginTop: '30px' }}>ADD</Button>

          {/*Popup Code*/}
          <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby=""
          >
            <DialogTitle id="">
              {"Add Commttie Members"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Form Committees
              </DialogContentText>

              <div style={{ background: 'white', width: '100%', height: '200px', padding: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>


                <Autocomplete

                  id="disable-close-on-select"
                  style={{ margin: '5px' }}
                  sx={{ width: 300 }}
                  options={teacher.map(temp => temp.firstname + " " + temp.lastname)}
                  placeholder='Department'
                  renderInput={(params) => <TextField {...params} id='basic' placeholder='Select Teacher' size='small'
                    name='teacherName'
                    value={form.teacherName}
                    onSelect={onHandler}
                  />}
                />
                <Autocomplete
                  style={{ margin: '5px' }}
                  id="disable-close-on-select"
                  sx={{ width: 300 }}
                  options={commitie.map(temp => temp.name)}
                  placeholder='Department'
                  renderInput={(params) => <TextField {...params} id='basic' placeholder='Select Commettie' size='small'
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
                findIdcommittee(form.commitieName)
                dispatch(postMember(form))
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
        <CommittieMemberDataFrameTable />

      </div>
    </div>


  )
}

export default CommittieMemberFrame
