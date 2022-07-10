import { useState } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { NavBar } from './components/Navbar';
import { SideBar } from './components/SideBar';
import React from 'react';

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
    display: 'flex',
    flex: '1 1 auto',
    maxWidth: '100%',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
        paddingLeft: 280
    }
}));

export const Layout = (props: any) => {
    const { children } = props;
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    return (
        <>
            <DashboardLayoutRoot>
                <Box
                    sx={{
                        display: 'flex',
                        flex: '1 1 auto',
                        flexDirection: 'column',
                        width: '100%'
                    }}>
                    {children}
                </Box>
            </DashboardLayoutRoot>
            <NavBar onSidebarOpen={() => setSidebarOpen(true)} />
            <SideBar onClose={() => setSidebarOpen(false)} open={isSidebarOpen} />
        </>
    );
};
