import React from 'react';
import './LeftBarStyle.css';
import { StudentsLeftBarData } from './LeftBarData';
import { AdminLeftBarData } from './LeftBarData';
import { TeacherLeftBarData } from './LeftBarData';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';
// import { NavLink } from 'react-router-dom';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import { useSelector } from 'react-redux';



let val = [];
// let prevId = -1;
const LeftBarDesign = () => {
  const userInfo = useSelector(state => state?.auth?.authData);

  console.log("left bar ",userInfo)

  if (userInfo?.userType?.toLowerCase() === "admin") {
    val = AdminLeftBarData;
  }
  else if (userInfo?.userType?.toLowerCase() === "student") {
    val = StudentsLeftBarData;
  }
  else if (userInfo?.userType?.toLowerCase() === "teacher") {
    val = TeacherLeftBarData;
  }
  else {
    val = [];
    // <div>Something went wrong. System is not able to recognize whether you are a student, teacher or admin!!!</div>
  }



  console.log(val)


  const navigate = useNavigate();
  // const location = useLocation();

  const goToPage = (item) => {
    navigate(item.path);
  }

  // const handleClick = (e, id) => {
  //   if(prevId !== -1){
  //     document.getElementById(prevId).style.background = '#343434';
  //   }
  //   // console.log(e);
  //   document.getElementById(id).style.background = '#6F6F6F';
  //   prevId = id;
  // }
  return (
    <div>
      <div className='logo'>
        <span id='icon'><PersonPinIcon sx={{ fontSize: '7.5rem' }} variant='square' /></span>
        <span id='title'>{userInfo?.userType}</span>
      </div>

      {
        val.map(item => (
          <ListItem
            button
            key={item.id}
            id={item.id}
            onClick={() => goToPage(item)}
          >
            <ListItemIcon sx={{ color: 'white' }} className='linkIcon'>{item.icon}</ListItemIcon>
            <ListItemText sx={{ color: 'white' }}>{item.title}</ListItemText>
          </ListItem>
        ))
        //sx ={{backgroundColor : keyValue === item.key ? 'red' : 'black'}}
      }

      {/* {
        val.map(item => (
          <NavLink id={item.id} to={item.path} onClick={(e) => handleClick(e, item.id)} className='navLink'>
            <div className='navLinkElements'>
              <div className='iconDiv'>{item.icon} </div>
              <div className='titleDiv'>{item.title}</div>
            </div>
          </NavLink>
        ))
      } */}


    </div>
  )
}

export default LeftBarDesign;
