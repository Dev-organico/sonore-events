import styled from "styled-components";
import Header from "../../components/header";
import { useNavigate } from "react-router-dom";


export default function BudgetsArea() {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Header />
      <AllBudgetsButton onClick={() => navigate("/all-budgets")}>
          Todos os orçamentos
      </AllBudgetsButton>
      <CreateBudgetButtom onClick={() => navigate("/create-budgets")}>
          Criar orçamento
      </CreateBudgetButtom>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;


const AllBudgetsButton = styled.button`
  width: 300px;
  height: 60px;
  background-color: #84F5D3;
  border: none;
  border-radius: 10px;
  color: white;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 115px;
  cursor: pointer;
  :active {
    box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.5);
  }
  :hover {
    background-color: #d6d6d6;
  }
`

const CreateBudgetButtom = styled(AllBudgetsButton)`
  background-color: #F5D06C;
  margin-top: 15px;
`
