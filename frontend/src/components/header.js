import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import logo from '../images/logo.jpeg'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { Link } from 'react-router-dom'; 

const pages = [{ name: 'Table', path: '/' }, { name: 'Bar Chart', path: '/barchart' }, { name: 'Pie Chart', path: '/piechart' }];

function Header() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static">
            <div className='ml-[-35px]'>
                <Container maxWidth="x">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h2"
                            noWrap
                            component="a"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}>
                            <div className='ml-[-10px]'>
                                <img class="object-contain h-28 w-96 ml-[-50px]" src={logo} alt="My Image" />
                            </div>
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page, index) => (
                                <Button
                                    key={page.name}
                                    component={Link} 
                                    to={page.path} 
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                        ml: 24,
                                        my: 2,
                                        mr: index < pages.length - 1 ? 10 : 0,
                                        color: 'white',
                                        display: 'block'
                                    }}
                                >
                                    {page.name}
                                </Button>
                            ))}
                        </Box>
                        <div className='mr-10' >
                            <PersonOutlineIcon />
                        </div>

                    </Toolbar>
                </Container>
            </div>
        </AppBar>
    );
}
export default Header;
