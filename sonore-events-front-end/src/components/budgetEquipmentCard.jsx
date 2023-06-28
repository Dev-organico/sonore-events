import styled from "styled-components";
import { toast } from "react-toastify";
import { BiMessageSquareAdd } from "react-icons/bi";
import useToken from "../hooks/useToken";
import { useState } from "react";

export default function BudgetEquipmentCard({
  id,
  name,
  price,
  quantity,
  image,
  includedEquipments,
  setIncludedEquipments,
}) {
  const token = useToken();
  const [rentQuantity, setRentQuantity] = useState("");

  async function handleAddEquipment() {
    const isIdAlreadyIncluded = includedEquipments.some(
      (equipment) => equipment.id === id
    );

    if (isIdAlreadyIncluded) {
      return toast("Esse equipamento já foi adicionado!", {
        progressStyle: {
          background:
            "linear-gradient(to right, #a6c0fe, #6c8bf5, #4660e6, #1e31c8)",
        },
      });
    }
    if (rentQuantity <= 0) {
      return toast("A quantidade de equipamentos deve ser maior que zero!", {
        progressStyle: {
          background:
            "linear-gradient(to right, #a6c0fe, #6c8bf5, #4660e6, #1e31c8)",
        },
      });
    }

    if (rentQuantity > quantity) {
      return toast("Você ultrapassou a quantidade máxima de equipamentos!", {
        progressStyle: {
          background:
            "linear-gradient(to right, #a6c0fe, #6c8bf5, #4660e6, #1e31c8)",
        },
      });
    }
    setIncludedEquipments([
      ...includedEquipments,
      { id, name, price, rentQuantity: +rentQuantity, image },
    ]);

    setRentQuantity("");
  }

  return (
    <>
      <EquipmentCardDiv>
        <LeftSide>
          <img src={image} />
        </LeftSide>
        <MiddleSide>
          <h1>{name}</h1>
          <br />
          <h2>R${price.toFixed(2).replace(".", ",")}</h2>
          <br />
          <h3>{quantity} unidades</h3>
        </MiddleSide>
        <RightSide>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddEquipment();
            }}
          >
            <input
              type="number"
              value={rentQuantity}
              onChange={(e) => setRentQuantity(e.target.value)}
              required
            />
            <AddButton type="submit">
              <BiMessageSquareAdd />
            </AddButton>
          </form>
        </RightSide>
      </EquipmentCardDiv>
    </>
  );
}

const EquipmentCardDiv = styled.div`
  width: 280px;
  height: 120px;
  background-color: white;
  margin-top: 10px;
  border-radius: 10px;
  border: 1px solid darkgray;
  display: flex;
  flex-direction: row;
  align-items: center;
  img {
    width: 60px;
    height: auto;
  }
`;

const LeftSide = styled.div`
  width: 30%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const MiddleSide = styled(LeftSide)`
  width: 50%;
`;

const RightSide = styled(LeftSide)`
  width: 20%;
  display: flex;
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  input {
    width: 50px;
    height: 30px;
    border: 0.5px solid lightgrey;
    border-radius: 5px;
  }
`;

const AddButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 5px;
  background-color: grey;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  margin-top: 3px;
  cursor: pointer;
  :active {
    box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.5);
  }
  :hover {
    background-color: #d6d6d6;
  }
`;
