import React, { useState } from "react";

//hooks
import { useInput } from "../../utils/hooks/useInput";

// redux
import { useDispatch } from "react-redux";
import { updateTool } from "../../store/actions";

//mui
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Radio from "@material-ui/core/Radio";
//styles
import { Form, Input, Label, Select } from "../styled-components/form";
import * as styled from "../styled-components/general";
import { Title } from "../styled-components/addTool";
import * as color from "../../styles/color";
import { Button } from "../styled-components/myTools";

function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
    background: "#151515",
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: "black",
    color: "white",
    border: `4px solid ${color.primary} `,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const UpdateToolModal = (props) => {
  //modal
  const [modalStyle] = useState(getModalStyle);
  const classes = useStyles();

  const [modal, setModal] = useState(false);

  const handleModalOpen = () => {
    setModal(true);
  };

  const handleModalClose = () => {
    setModal(false);
  };

  const initialState = {
    rental_cost: props.tool.rental_cost,
    tool_description: props.tool.tool_description,
    tool_name: props.tool.tool_name,
    tool_type: props.tool.tool_type,
    id: props.tool.id,
    available: props.tool.available,
    owner_id: props.tool.owner_id,
  };
  const [tool, setTool, handleChanges] = useInput(initialState);

  const handleCheckboxTrue = (e) => {
    setTool({ ...tool, available: true });
  };

  const handleCheckboxFalse = (e) => {
    setTool({ ...tool, available: false });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateTool(tool));
    handleModalClose();
  };

  //redux hooks
  const dispatch = useDispatch();

  return (
    <>
      <Modal
        open={modal}
        onClose={handleModalClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <styled.Xbutton onClick={handleModalClose}>X</styled.Xbutton>
          <Title>Update Tool</Title>
          <Form onSubmit={handleSubmit}>
            <Label>Tool Name</Label>
            <Input
              label="Tool Name"
              name="tool_name"
              value={tool.tool_name}
              onChange={handleChanges}
            />
            <Label>Tool Description</Label>
            <Input
              label="Tool Description"
              name="tool_description"
              value={tool.tool_description}
              onChange={handleChanges}
            />
            <Select
              label="Tool Type"
              type="select"
              onChange={handleChanges}
              name="tool_type"
              value={tool.tool_type}
            >
              <option value={tool.tool_type}>{tool.tool_type}</option>
              <option value="Hand Tool">Hand Tool</option>
              <option value="Power Tool">Power Tool</option>
              <option value="Gardening Tool">Gardening Tool</option>
            </Select>
            <Label>Rental Cost</Label>
            <Input
              label="Rental Cost $"
              type="number"
              name="rental_cost"
              value={tool.rental_cost}
              onChange={handleChanges}
            />
            <div>
              <Label>Available for rent: </Label>
              <span>Yes</span>
              <Radio
                style={{ color: color.spinner }}
                label="Yes"
                checked={tool.available}
                onClick={handleCheckboxTrue}
              />
              <span>No</span>
              <Radio
                style={{ color: color.spinner }}
                label="No"
                checked={!tool.available}
                onClick={handleCheckboxFalse}
              />
            </div>
            <styled.Button type="submit" w={"9rem"} h={"3rem"}>
              Update Tool
            </styled.Button>
          </Form>
        </div>
      </Modal>
      <Button style={{ borderTopRightRadius: "4px" }} onClick={handleModalOpen}>
        <ion-icon name="open-outline"></ion-icon>
      </Button>
    </>
  );
};

export default UpdateToolModal;
