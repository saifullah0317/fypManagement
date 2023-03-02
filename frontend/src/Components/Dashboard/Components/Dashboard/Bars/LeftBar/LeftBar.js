import React from 'react';
import './LeftBarStyle.css';
import { Drawer } from '@mui/material/';
import { styled } from '@mui/material/styles';
import LeftBarDesign from './LeftBarDesign';

const Root = styled('div')(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        width: '0',
    }
}));

const LeftBar = ({ isMobile, funcSetIsMobile }) => {
    return (
        <div>
            <Root>
                <nav className='drawer'>
                    <Drawer
                        variant='permanent'
                        open
                        anchor='left'
                        sx={{ display: { xs: "none", sm: "block" } }}
                        PaperProps={{
                            sx: {
                                width: 240,
                                backgroundColor: '#343434',
                                color: 'white'
                            }
                        }}
                    >
                        <LeftBarDesign />
                    </Drawer>
                </nav>
            </Root>

            {/* Temporay Drawer */}
            <Drawer
                variant='temporary'
                open={isMobile}
                anchor='left'
                PaperProps={{
                    sx: {
                        width: 240,
                        backgroundColor: '#343434',
                        color: 'white'
                    }
                }
                }
                onClick={funcSetIsMobile}
            >
                <LeftBarDesign />
            </Drawer>

        </div>
    )
}

export default LeftBar;
