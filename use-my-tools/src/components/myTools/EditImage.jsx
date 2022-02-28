import React, { useState } from "react";

//redux
import { useDispatch } from "react-redux";
import { deleteImage } from "../../store/actions";

//mui
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";

// styles
import * as color from "../../styles/color";
import * as styled from "../styled-components/appRouter";
import { Button } from "../styled-components/myTools";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #101010",
    background: color.nav,
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    color: `${color.primary}`,
  },
}))(MenuItem);

export default function EditImage({ tool }) {
  //redux
  const dispatch = useDispatch();

  //menu logic
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button onClick={handleClick}>
        <ion-icon
          name="pencil-outline"
          style={{ color: color.background }}
        ></ion-icon>
      </Button>
      <StyledMenu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem onClick={handleClose}>
          <styled.Button
            onClick={() => {
              console.log(tool);
              dispatch(deleteImage(tool));
            }}
          >
            Delete Image
          </styled.Button>
        </StyledMenuItem>
      </StyledMenu>
    </>
  );
}
