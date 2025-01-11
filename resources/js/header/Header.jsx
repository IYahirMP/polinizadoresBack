import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useTheme } from '@mui/material';
import {Link} from "@inertiajs/react";

const pages = [
  {
    pagina:'Galería',
    link:'galeria'
  },
  /*{
    pagina:'Iniciar sesión',
    link:'login'
  }*/
];

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Header() {
  const theme = useTheme();

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


  const logoPropsMd = {
    variant: "h6",
    noWrap: true,
    component: "a",
    href: "/",
    sx: {
      mr: 2,
      display: { xs: 'none', md: 'flex' },
      fontFamily: 'monospace',
      fontWeight: 700,
      letterSpacing: '.3rem',
      color: 'black',
      textDecoration: 'none',
    },
  };

  const iconPropsXs = {
    size: "large",
    'aria-label': "account of current user",
    'aria-controls': "menu-appbar",
    'aria-haspopup': "true",
    onClick: handleOpenNavMenu,
    color: "black"
  }

  const menuProps = {
    id: "menu-appbar",
    anchorEl: anchorElNav,
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left',
    },
    keepMounted: true,
    transformOrigin: {
      vertical: 'top',
      horizontal: 'left',
    },
    open: Boolean(anchorElNav),
    onClose: handleCloseNavMenu,
    sx: {
      display: { xs: 'block', md: 'none' },
    },
    color: 'black',
  }

  const logoXs = {
    variant: "h5",
    noWrap: true,
    component: "a",
    href: "#app-bar-with-responsive-menu",
    sx: {
      mr: 2,
      display: { xs: 'flex', md: 'none' },
      flexGrow: 1,
      fontFamily: 'monospace',
      fontWeight: 700,
      letterSpacing: '.3rem',
      color: 'black',
      textDecoration: 'none',
    },
  }

  const menuMD = {
    sx: { mt: '45px' },
    id: "menu-appbar",
    anchorEl: anchorElUser,
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'right',
    },
    keepMounted: true,
    transformOrigin: {
      vertical: 'top',
      horizontal: 'right',
    },
    open: Boolean(anchorElUser),
    onClose: handleCloseUserMenu,
    color: 'black',
  }

  return (
    <>
    <AppBar position="static" sx={theme.menu}>
      <Container maxWidth="xl">
        <Toolbar disableGutters> 
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: 'black' }} />
          <Typography {...logoPropsMd}> BeeSmart Analytics </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton {...iconPropsXs}>
              <MenuIcon />
            </IconButton>
            <Menu {...menuProps}>
              {pages.map((page) => (
                <MenuItem key={page.pagina}>
                  <Link to={`/${page.link}`}><Typography textAlign="center" color={'black'}>{page.pagina}</Typography></Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, color: 'black' }} />
          <Typography {...logoXs}>LOGO</Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', color: 'black' }, flexDirection:{md:'row-reverse'}, paddingRight:{md:'3vw'}  }}>
            {pages.map((page) => (
              <Button
                key={page.pagina}
                sx={{ my: 2, display: 'block', color:'black', }}
              >
                <Link to={`/${page.link}`}>{page.pagina}</Link>
              </Button>
            ))}
          </Box>
          {/*<Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu {...menuMD}>
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>*/}
        </Toolbar>
      </Container>
    </AppBar>
    </>
  );
}
export default Header;