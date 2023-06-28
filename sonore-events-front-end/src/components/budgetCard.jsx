import styled from "styled-components";
import { BsTrash } from "react-icons/bs";
import { useState } from "react";
import EquipmentToBudgetCard from "./equipmentToBudgetCard";
import { getBudgets } from "../services/getBudgtes";
import useToken from "../hooks/useToken";
import { deleteBudget } from "../services/deleteBudgets";
import { toast } from "react-toastify";
import moment from "moment";

export default function BudgetCard({
  id,
  name,
  finalPrice,
  comment,
  equipmentToBudget,
  createdAt,
  setAllBudgets,
}) {
  const token = useToken();
  const [budgetVisible, setBudgetVisible] = useState("none");

  async function handleDeleteBudget(id) {
    const confirmed = window.confirm(
      "Tem certeza que quer deletar o orçamento?"
    );
    if (confirmed) {
      try {
        await deleteBudget(token, id);
        toast("Orçamento deletado com sucesso!", {
          progressStyle: {
            background:
              "linear-gradient(to right, #a6c0fe, #6c8bf5, #4660e6, #1e31c8)",
          },
        });
        const result = await getBudgets(token);
        setAllBudgets(result);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Wrapper>
      <BudgetCardDiv
        onClick={() => {
          if (budgetVisible === "none") {
            setBudgetVisible("flex");
          } else {
            setBudgetVisible("none");
          }
        }}
      >
        <LeftSide>
          <h1>{name}</h1>
        </LeftSide>
        <MiddleSide>
          <h2>
            Preço final:
            <br />
            <span style={{ fontWeight: "700" }}>R${finalPrice}</span>
          </h2>
          <h3>
            criado em:
            <br />
            {moment(createdAt).format("DD/MM/YY")}
          </h3>
        </MiddleSide>
        <RightSide>
          <DeleteButton
            onClick={() => {
              handleDeleteBudget(id);
            }}
          >
            <BsTrash />
          </DeleteButton>
        </RightSide>
      </BudgetCardDiv>
      <BudgetInfo style={{ display: `${budgetVisible}` }}>
        <h1>
          <spam>Equipamentos:</spam>
        </h1>
        {equipmentToBudget.map((el) => {
          return (
            <EquipmentToBudgetCard
              key={el.id}
              name={el.Equipment.name}
              price={el.Equipment.price}
              rentQuantity={el.rentQuantity}
              image={el.Equipment.image}
            />
          );
        })}
      </BudgetInfo>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: auto;
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const BudgetCardDiv = styled.div`
  width: 300px;
  height: 50px;
  background-color: grey;
  margin-top: 10px;
  border-radius: 10px;
  border: 1px solid darkgray;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 12px;
  color: white;
  cursor: pointer;
  h1 {
    font-weight: 700;
  }
  img {
    margin-left: 5px;
    width: 25px;
    height: auto;
  }
`;

const BudgetInfo = styled.div`
  height: auto;
  width: auto;
  display: flex;
  flex-direction: column;
  h1 {
    margin-top: 10px;
  }
  spam {
    font-weight: 900;
  }
`;

const LeftSide = styled.div`
  width: 20%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  h1 {
    margin-left: 15px;
  }
`;

const MiddleSide = styled(LeftSide)`
  width: 70%;
  justify-content: space-around;
  flex-direction: row;
`;

const RightSide = styled(LeftSide)`
  width: 10%;
`;

const DeleteButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 5px;
  background-color: grey;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  margin-left: 75px;
  cursor: pointer;
  :active {
    box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.5);
  }
  :hover {
    background-color: #d6d6d6;
  }
`;
