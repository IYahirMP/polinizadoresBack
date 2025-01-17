import { useState } from "react";
import {Button, Menu, MenuItem} from "@mui/material";
import { router } from "@inertiajs/react";

const DropdownMenu = ({ pages, etiqueta }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (page) => {
    handleClose();
    if (page.method === 'post') {
      router.post(page.link);
    } else {
      router.get(page.link);
    }
  };

  return (
    <>
      <Button
        aria-controls={open ? 'dropdown-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        variant="outlined"
        sx={{
                backgroundColor:'#fff',
                border: '1px solid black',
                color:"black",
                margin:"10px",
                height:{
                  xs:'55px',
                  md: '30px'
                },
                overflow:'hidden'
        }}
      >
        {etiqueta}
      </Button>
      <Menu
        id="dropdown-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {pages.map((page, index) => (
          <MenuItem
            key={index}
            onClick={() => handleMenuClick(page)}
          >
            {page.pagina}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default DropdownMenu;