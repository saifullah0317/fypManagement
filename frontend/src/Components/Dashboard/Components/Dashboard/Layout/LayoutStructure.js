import React, { useState } from 'react';
import './LayoutStyle.css';
import LeftBar from '../Bars/LeftBar/LeftBar';
import Topbar from '../Bars/TopBar/Topbar';
// import { makeStyles } from '@mui/styles';
// import { styled } from '@mui/material/styles';
// import { Box, Stack } from '@mui/system';


// const Styling = makeStyles(theme => ({
//   root: {
//       display: 'flex',
//       border: '1px solid red'
//   }
// }))


const LayoutStructure = (props) => {
  const [isMobile, setIsMobile] = useState(false);
  const funcSetIsMobile = () => {
    setIsMobile(!isMobile);
  }

  return (
    <div className='root'>
      <LeftBar isMobile={isMobile} funcSetIsMobile={funcSetIsMobile} />
      <Topbar funcSetIsMobile={funcSetIsMobile} />
      <div className='adjustContentHeight'>
        <main>
          {props.children}
        </main>
      </div>
    </div>
  )
}

export default LayoutStructure;