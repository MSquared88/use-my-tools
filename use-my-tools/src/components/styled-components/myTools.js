import styled from "styled-components";
import * as color from "../../styles/color";
import { tablet } from "./media";

export const ToolsPage = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  margin-top: auto;
  padding: 70px 0px 0px;
  height: 100%;

  @media (max-width: ${tablet}) {
    justify-content: center;
  }
`;
export const ContainerDiv = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  margin-top: auto;
  padding: 70px 0px 0px;
  height: 100%;

  @media (max-width: ${tablet}) {
    justify-content: center;
  }
`;

export const ItemContainer = styled.div`
  margin: 2%;
  border-radius: 15px;
`;

export const ToolTitle = styled.div`
  text-align: center;
  margin-bottom: 2%;
  margin-top: 2%;
  width: 100%;
`;

export const Welcome = styled.h1`
  color: white;
  margin-top: 2%;
`;

export const ImgHr = styled.hr`
  width: 100%;
  margin: 0;
  margin-bottom: 10px;
  height: 1px;
  background-color: ${color.primary};
  border: none;
`;

export const ButtonDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const Button = styled.button`
width: 50px;
height: 50px;
color: black;
background: ${color.primary};
border: 1px solid ${color.primary};
border-radius: 6px
text-decoration: none;
font-size: 1.4rem;
cursor: pointer;
outline: none;
`;
