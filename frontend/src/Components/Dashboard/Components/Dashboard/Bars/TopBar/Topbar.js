import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import React from 'react';
import './TopBarStyle.css';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router';


const Root = styled('div')(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        marginLeft: '-240px',
    }
}));

const Topbar = ({funcSetIsMobile}) => {
    const navigate = useNavigate()

    const logout = () =>{
        navigate('/auth')
    }
    return (
        <div>

            <AppBar position='fixed' elevation={1}>
                <Root>
                    <Toolbar className='topBar'>
                        <IconButton sx={{color: 'white'}}
                            
                        >
                            <MenuIcon onClick={funcSetIsMobile} />
                        </IconButton>

                        


                        <Typography>FYP Management System</Typography>

                        <Button sx={{ marginLeft: 'auto', backgroundColor: '#058EF2' }} variant="contained" onClick={logout}>Logout</Button>
                    </Toolbar>
                </Root>
            </AppBar>

        </div>
    )
}

export default Topbar;
