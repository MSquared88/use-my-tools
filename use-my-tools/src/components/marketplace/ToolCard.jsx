import React from "react";

//componenets
import RequestTool from "./RequestTool";

// styles
import * as styled from "../styled-components/toolCard";
import missingPhoto from "../../assets/missing-image.png";

function ToolCard(props) {
  return (
    <styled.Card>
      <styled.PriceTag>
        <p>${props.tool.rental_cost}</p>
      </styled.PriceTag>
      <styled.ToolContent>
        <styled.ToolTitle>{props.tool.tool_name}</styled.ToolTitle>
        {!props.tool.img_url ? (
          <img src={missingPhoto} alt="missing" />
        ) : (
          <img src={props.tool.img_url} alt={props.tool.tool_name} />
        )}
        <h4>Owner:{props.tool.user_name}</h4>

        <h4>Tool Description: {props.tool.tool_description}</h4>

        <RequestTool
          toolID={props.tool.id}
          usersTool={props.tool.user_name === localStorage.getItem("username")}
        />
      </styled.ToolContent>
    </styled.Card>
  );
}

export default ToolCard;
