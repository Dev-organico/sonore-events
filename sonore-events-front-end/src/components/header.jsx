import styled from "styled-components";
import { TbLogout } from "react-icons/tb";
import { AiOutlineSound } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <AiOutlineSound
        style={{
          marginLeft: "10px",
          fontSize: "20px"
        }}
      ></AiOutlineSound>
      <h1
        onClick={() => navigate('/home')}
        style={{
          cursor: "pointer",
        }}
      >
        SonoreEvents
      </h1>
      <TbLogout
        onClick={() => navigate("/")}
        style={{
          marginRight: "10px",
          cursor: "pointer",
          fontSize: "20px",
        }}
      ></TbLogout>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  width: 100%;
  height: 80px;
  background-color: lightgrey;
  display: flex;
  align-items: center;
  justify-content: space-between;
  h1 {
    font-size: 40px;
  }
`;
