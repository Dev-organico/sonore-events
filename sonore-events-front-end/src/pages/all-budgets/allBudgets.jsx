import styled from "styled-components";
import Header from "../../components/header";
import { useEffect } from "react";
import { getBudgets } from "../../services/getBudgtes";
import useToken from "../../hooks/useToken";
import { useState } from "react";
import BudgetCard from "../../components/budgetCard";
import { BsDownload } from "react-icons/bs";

export default function AllBudgets() {
  const token = useToken();
  const [allBudgets, setAllBudgets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getBudgets(token);
        setAllBudgets(result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

 function downloadBudget(budget){
    const docxContent = `
    Nome: 
     ${budget.name}
    Descrição: 
     ${budget.comment}

    Equipamentos:
${budget.EquipmentToBudget
  .map(
    (item) =>
      `     -${item.Equipment.name} (${item.rentQuantity} x R$ ${
        item.Equipment.price.toFixed(2).replace(".",",")
      }) = R$ ${(item.rentQuantity * item.Equipment.price).toFixed(2).replace(".",",")}`
  )
  .join("\n")}

    Valor Total: R$ ${budget.finalPrice.toFixed(2).replace(".",",")}
  `;
    const element = document.createElement("a");
    const file = new Blob([docxContent], { type: "application/docx" });
    element.href = URL.createObjectURL(file);
    element.download = `${budget.name}.docx`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <Wrapper>
      <Header />
      <BudgetsWrapper>
        {allBudgets.length > 0 ? (
          allBudgets.map((el) => {
            return (
              <LineWrapper>
                <BudgetCard
                  key={el.id}
                  id={el.id}
                  name={el.name}
                  comment={el.comment}
                  finalPrice={el.finalPrice}
                  equipmentToBudget={el.EquipmentToBudget}
                  createdAt={el.createdAt}
                  setAllBudgets={setAllBudgets}
                />
                <DownloadButton onClick={()=>downloadBudget(el)}><BsDownload/></DownloadButton>
              </LineWrapper>
            );
          })
        ) : (
          <h1 style={{ marginTop: "15px", fontSize: "15px" }}>
            sem orçamentos
          </h1>
        )}
      </BudgetsWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  
`;

const LineWrapper = styled.div`
  height: auto;
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  position: relative;
  margin-left: -68px;
  
`
const DownloadButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 5px;
  background-color: grey;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  position: absolute;
  top: 20px;
  left: 340px;
  cursor: pointer;
  :active {
    box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.5);
  }
  :hover {
    background-color: #d6d6d6;
  }
`

const BudgetsWrapper = styled.div`
  margin-top: 10px;
  height: auto;
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
