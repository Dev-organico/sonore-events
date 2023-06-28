import styled from "styled-components";
import { BiAddToQueue } from "react-icons/bi";
import { createEquipment } from "../services/createEquipmentApi";
import { toast } from "react-toastify";
import { useState } from "react";
import useToken from "../hooks/useToken";
import { getEquipments } from "../services/getEquipmentApi";

export default function AddEquipment({setEquipments}) {
  const token = useToken();
  const [formVisible, setFormVisible] = useState("none");
  const [equipmentName, setEquipmentName] = useState("");
  const [equipmentType, setEquipmentType] = useState("");
  const [equipmentPrice, setEquipmentPrice] = useState("");
  const [equipmentQuantity, setEquipmentQuantity] = useState("");
  const [equipmentImage, setEquipmentImage] = useState("");

  async function submit(event) {
    event.preventDefault();

    try {
      await createEquipment(token, {
        name: equipmentName,
        type: equipmentType,
        price: +equipmentPrice,
        quantity: +equipmentQuantity,
        image: equipmentImage,
      });

      setEquipmentName("");
      setEquipmentType("");
      setEquipmentPrice("");
      setEquipmentQuantity("");
      setEquipmentImage("");
      toast("Equipamento adicionado com sucesso!", {
        progressStyle: {
          background:
            "linear-gradient(to right, #a6c0fe, #6c8bf5, #4660e6, #1e31c8)",
        },
      });
      const result = await getEquipments(token);
      setEquipments(result);

    } catch (error) {
      console.log(error);
      toast("Esse equipamento já existe!", {
        progressStyle: {
          background:
            "linear-gradient(to right, #a6c0fe, #6c8bf5, #4660e6, #1e31c8)",
        },
      });
    }
  }

  return (
    <>
      <AddEquipmentButton
        onClick={() => {
          if (formVisible === "none") {
            setFormVisible("flex");
          } else {
            setFormVisible("none");
          }
        }}
      >
        <BiAddToQueue
          style={{
            marginRight: "6px",
            fontSize: "15px",
            color: "white",
          }}
        />
        Adicionar
        <br />
        Equipamento
      </AddEquipmentButton>
      <FormWrapper
        style={{
          display: `${formVisible}`,
        }}
      >
        <form onSubmit={submit}>
          <select
            value={equipmentType}
            onChange={(e) => setEquipmentType(e.target.value)}
            required
          >
            <option value="">Selecione o tipo</option>
            <option value="AUDIO">Áudio</option>
            <option value="VIDEO">Vídeo</option>
            <option value="LUZ">Luz</option>
          </select>
          <input
            placeholder="Nome"
            type="text"
            value={equipmentName}
            onChange={(e) => setEquipmentName(e.target.value)}
            required
          />
          <input
            placeholder="Preço"
            type="number"
            value={equipmentPrice}
            onChange={(e) => setEquipmentPrice(e.target.value)}
            required
          />
          <input
            placeholder="Quantidade"
            type="number"
            value={equipmentQuantity}
            onChange={(e) => setEquipmentQuantity(e.target.value)}
            required
          />
          <input
            placeholder="imagem"
            type="text"
            value={equipmentImage}
            onChange={(e) => setEquipmentImage(e.target.value)}
            required
          />
          <Button type="submit" color="primary">
            Adicionar
            <br />
            Equipamento
          </Button>
        </form>
      </FormWrapper>
    </>
  );
}

const FormWrapper = styled.div`
  margin-top: 10px;
  height: auto;
  justify-content: center;
  select {
    width: 200px;
    height: 40px;
    border: 1px solid darkgray;
    border-radius: 5px;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 5px;
  }
  input {
    width: 200px;
    height: 50px;
    margin-top: 5px;
    border: 0.5px solid lightgrey;
    border-radius: 5px;
    padding-left: 3px;
    ::placeholder {
      color: grey;
    }
  }
`;

const AddEquipmentButton = styled.button`
  background-color: #3ad4d6;
  margin-top: 15px;
  width: 300px;
  height: 60px;
  border: none;
  border-radius: 10px;
  color: white;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  cursor: pointer;
  :active {
    box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.5);
  }
  :hover {
    background-color: #d6d6d6;
  }
`;

const Button = styled.button`
  width: 120px;
  height: 35px;
  background-color: #4660e6;
  margin-top: 5px;
  border-radius: 5px;
  font-weight: 900;
  color: white;
  border: none;
  cursor: pointer;
  :active {
    box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.5);
  }
  :hover {
    background-color: #d6d6d6;
  }
`;
