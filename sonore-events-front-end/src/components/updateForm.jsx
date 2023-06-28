import styled from "styled-components";
import useToken from "../hooks/useToken";
import { toast } from "react-toastify";
import { updateEquipment } from "../services/updateEquipmentApi";
import { useState } from "react";
import { getEquipments } from "../services/getEquipmentApi";

export default function UpdateForm({ updateVisible, id, setEquipments }) {
  const token = useToken();
  const [updatedPrice, setUpdatedPrice] = useState("");
  const [updatedQuantity, setUpdatedQuantity] = useState("");

  async function submitUpdateForm(id) {
    try {
      await updateEquipment(token, id, {
        price: +updatedPrice,
        quantity: +updatedQuantity,
      });

      setUpdatedPrice("");
      setUpdatedQuantity("");

      toast("Equipamento modificado com sucesso! ", {
        progressStyle: {
          background:
            "linear-gradient(to right, #a6c0fe, #6c8bf5, #4660e6, #1e31c8)",
        },
      });

      const result = await getEquipments(token);
      setEquipments(result);
    } catch (error) {
      console.log(error);
      toast(`${error}`, {
        progressStyle: {
          background:
            "linear-gradient(to right, #a6c0fe, #6c8bf5, #4660e6, #1e31c8)",
        },
      });
    }
  }
  return (
    <UpdateFormDiv style={{ display: `${updateVisible}` }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitUpdateForm(id);
        }}
      >
        <input
          placeholder="Preço"
          type="number"
          value={updatedPrice}
          onChange={(e) => setUpdatedPrice(e.target.value)}
          required
        />
        <input
          placeholder="Quantidade"
          type="number"
          value={updatedQuantity}
          onChange={(e) => setUpdatedQuantity(e.target.value)}
          required
        />
        <Button type="submit" color="primary">
          Modificar
          <br />
          Equipamento
        </Button>
      </form>
    </UpdateFormDiv>
  );
}

const UpdateFormDiv = styled.div`
  display: none;
  justify-content: center;
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  input {
    width: 150px;
    height: 33px;
    margin-top: 5px;
    border: 0.5px solid lightgrey;
    border-radius: 5px;
    padding-left: 3px;
    ::placeholder {
      color: grey;
    }
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
