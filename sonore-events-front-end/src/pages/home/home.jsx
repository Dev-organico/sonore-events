import styled from "styled-components";
import Header from "../../components/header";
import { useNavigate } from "react-router-dom";
import { BsCardList } from "react-icons/bs";
import { RiFlashlightLine } from "react-icons/ri";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Header />
      <ButtonsWrapper>
        <EquipmentsButton onClick={() => navigate("/equipments")}>
          <RiFlashlightLine
            style={{
              marginRight: "5px",
              fontSize: "15px",
            }}
          />
          Equipamentos
        </EquipmentsButton>
        <BudgetsButton onClick={() => navigate("/budgets")}>
          <BsCardList
            style={{
              marginRight: "6px",
              fontSize: "15px",
            }}
          />
          Orçamentos
        </BudgetsButton>
      </ButtonsWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonsWrapper = styled.div`
  margin-top: 100px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EquipmentsButton= styled.button`
  width: 300px;
  height: 60px;
  background-color: #6c8bf5;
  border: none;
  border-radius: 10px;
  color: white;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  :active {
    box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.5);
  }
  :hover {
    background-color: #d6d6d6;
  }
`;

const BudgetsButton = styled(EquipmentsButton)`
  background-color: #1e31c8;
  margin-top: 15px;
`;
