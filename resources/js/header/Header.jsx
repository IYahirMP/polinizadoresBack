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
import {Link, usePage} from "@inertiajs/react";
import DropdownMenu from '@/Components/DropDownMenu';
import ADMIN_PAGES from './AdminPages';


function Header() {
  const {auth} = usePage().props;
  const APP_NAME = 'BeeSmart Analytics';
  const toolbarDimPx = ADMIN_PAGES.length * 150;

  // console.log(auth);

  const pages = [
    {
      pagina:'Galería',
      link: route('galeria.index'),
      method: 'get'
    },
    {
      pagina: !auth.user ? 'Iniciar sesión': "Cerrar sesión",
      link: !auth.user ? route('login') : route('logout'),
      method: !auth.user ? 'get' : 'post'
    }
  ];

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
    variant: "h7",
    component: "a",
    href: "#app-bar-with-responsive-menu",
    sx: {
      mr: 2,
      display: { xs: 'flex', md: 'none' },
      flexGrow: 1,
      fontFamily: 'monospace',
      fontWeight: 700,
      letterSpacing: '.1rem',
      color: 'black',
      textDecoration: 'none',
      overflowWrap:'anywhere'
    },
  }

  return (
    <>
    <AppBar position="static" sx={theme.menu}>
      <Container maxWidth="xxl">
        <Toolbar disableGutters> 
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: 'black' }} />
          <Typography {...logoPropsMd}>{APP_NAME}</Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton {...iconPropsXs}>
              <MenuIcon />
            </IconButton>
            <Menu {...menuProps}>
              {pages.map((page) => (
                <MenuItem key={page.pagina + "1"}>
                  <Link href={page.link} method={page.method}><Typography textAlign="center" color={'black'}>{page.pagina}</Typography></Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, color: 'black' }} />
          <Typography {...logoXs}>{APP_NAME}</Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', color: 'black' }, flexDirection:{md:'row-reverse'}, paddingRight:{md:'3vw'}  }}>
            {pages.map((page) => (
              <Link href={page.link} method={page.method} key={page.pagina + "1"}>
                <Button
                  sx={{ my: 2, display: 'block', color:'black', }}
                >
                  {page.pagina}
                </Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>

      {(auth.user) && (
          <Container sx={{ overflow:'overlay'}}>
            <Toolbar sx={{width:toolbarDimPx}}>
              {ADMIN_PAGES.map((tabla) => <DropdownMenu key={tabla.etiqueta} className="mx-10" pages={tabla.paginas} etiqueta={tabla.etiqueta}/>)}
            </Toolbar>
          </Container>
        )}
    </>
  );
}
export default Header;