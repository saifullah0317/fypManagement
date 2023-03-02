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
import CommittieTable from './CommittieTable'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postCommitie } from '../../states/committee/commitieSlice';

const Committie = () => {

  const dispatch = useDispatch();


  const [form, setForm] = useState({
    name: '',
    NoOfMembers: '',
    CommitieMembers: ''
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
              {"Add Section"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Form Committees
              </DialogContentText>

              <div style={{ background: 'white', width: '100%', height: '200px', padding: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

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
                dispatch(postCommitie(form))
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
        <CommittieTable />

      </div>
    </div>


  )
}

export default Committie
