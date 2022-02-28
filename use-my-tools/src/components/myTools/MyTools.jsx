import React, { useState, useEffect, useCallback } from "react";

//styles
import * as styled from "../styled-components/myTools";
import * as cardStyles from "../styled-components/toolCard";
import * as color from "../../styles/color";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getUserTools } from "../../store/actions";

// components
import AddTool from "./AddTool";
import RequestsModal from "./RequestsModal";
import Loader from "react-loader-spinner";
import UpdateToolModal from "./UpdateToolModal";
import DeleteTool from "./DeleteTool";

//image
import EditImage from "./EditImage";
import UploadImg from "./UploadImg";

const MyTools = () => {
  //redux hooks
  const userTools = useSelector((state) => state.myTools.userTools);
  const status = useSelector((state) => state.myTools.userToolsStatus);
  const dispatch = useDispatch();

  //add tool modal
  const [modal, setModal] = useState(false);
  const handleModalOpen = () => {
    setModal(true);
  };

  const handleModalClose = () => {
    setModal(false);
  };

  //side effects
  const initFetch = useCallback(() => {
    dispatch(getUserTools());
  }, [dispatch]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  /////* spinner logic *////
  if (status) {
    return (
      <div>
        <br />
        <Loader type="Oval" color={color.spinner} height={100} width={100} />
      </div>
    );
  }

  return (
    <>
      <br />
      <RequestsModal />
      <styled.ContainerDiv>
        {/* Mapping over tools for the user, adding new card for each input */}

        {userTools.map((tool) => (
          <cardStyles.Card key={tool.id}>
            <cardStyles.ToolContent>
              <styled.ButtonDiv>
                <DeleteTool tool={tool} />
                <UpdateToolModal tool={tool} />
              </styled.ButtonDiv>

              <cardStyles.ToolTitle>{tool.tool_name}</cardStyles.ToolTitle>
              {tool.img_url === null ? (
                <>
                  <UploadImg tool={tool} />
                  <styled.ImgHr />
                </>
              ) : (
                <>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <img src={tool.img_url} alt={tool.tool_description} />
                    <EditImage tool={tool} />
                  </div>
                  <styled.ImgHr />
                </>
              )}
              <h4>Type: {tool.tool_type}</h4>
              <h4>Tool Description: {tool.tool_description}</h4>
              <h4>Tool Price: ${tool.rental_cost}</h4>
            </cardStyles.ToolContent>
          </cardStyles.Card>
        ))}
        <cardStyles.Card>
          <AddTool
            handleModalClose={handleModalClose}
            handleModalOpen={handleModalOpen}
            modal={modal}
          />
        </cardStyles.Card>
      </styled.ContainerDiv>
    </>
  );
};

export default MyTools;
