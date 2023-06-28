import styled from "styled-components";
import { toast } from "react-toastify";
import { BsTrash } from "react-icons/bs";
import { RxUpdate } from "react-icons/rx";
import { deleteEquipment } from "../services/deleteEquipmentApi";
import { getEquipments } from "../services/getEquipmentApi";
import useToken from "../hooks/useToken";
import UpdateForm from "./updateForm";
import { useState } from "react";

export default function EquipmentCard({
  id,
  name,
  price,
  quantity,
  image,
  setEquipments,
}) {
const token = useToken()
const [updateVisible, setUpdateVisible] = useState("none");

  async function handleDeleteEquipment(id) {
    const confirmed = window.confirm(
      "Tem certeza que quer deletar o equipamento?"
    );
    if (confirmed) {
      try {
        await deleteEquipment(token, id);
        toast("Equipamento deletado com sucesso!", {
          progressStyle: {
            background:
              "linear-gradient(to right, #a6c0fe, #6c8bf5, #4660e6, #1e31c8)",
          },
        });
        const result = await getEquipments(token);
        setEquipments(result);
      } catch (error) {
        console.log(error);
      }
    }
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
          <h2>R${(price).toFixed(2).replace(".", ",")}</h2>
          <br />
          <h3>{quantity} unidades</h3>
        </MiddleSide>
        <RightSide>
          <DeleteButton onClick={() => handleDeleteEquipment(id)}>
            <BsTrash />
          </DeleteButton>
          <ModifyQuantityButton
            onClick={() => {
              if (updateVisible === "none") {
                setUpdateVisible("flex");
              } else {
                setUpdateVisible("none");
              }
            }}
          >
            <RxUpdate />
          </ModifyQuantityButton>
        </RightSide>
      </EquipmentCardDiv>
      <UpdateForm 
      updateVisible={updateVisible}
      setEquipments={setEquipments}
      id={id}
      />
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
  margin-right: 10px;
  cursor: pointer;
  :active {
    box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.5);
  }
  :hover {
    background-color: #d6d6d6;
  }
`;

const ModifyQuantityButton = styled(DeleteButton)`
  margin-top: 10px;
`;
