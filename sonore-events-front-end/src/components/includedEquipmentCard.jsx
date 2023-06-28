import styled from "styled-components";
import { BsTrash } from "react-icons/bs";

export default function IncludedEquipmentCard({
  id,
  name,
  price,
  rentQuantity,
  image,
  setIncludedEquipments,
}) {
  function handleDeleteEquipment(id) {
    setIncludedEquipments((prevEquipments) =>
      prevEquipments.filter((equipment) => equipment.id !== id)
    );
  }

  return (
    <>
      <EquipmentCardDiv>
        <LeftSide>
          <img src={image} />
        </LeftSide>
        <MiddleSide>
          <h1>{name}</h1>
          {/* <h2>R${price.toFixed(2).replace(".", ",")}</h2>x */}
          <h3>
            {rentQuantity} {/* R$ */}
          </h3>
          {/* <h3 style={{fontWeight:"900"}}>{(price * rentQuantity).toFixed(2).replace(".", ",")}</h3> */}
        </MiddleSide>
        <RightSide>
          <DeleteButton onClick={() => handleDeleteEquipment(id)}>
            <BsTrash />
          </DeleteButton>
        </RightSide>
      </EquipmentCardDiv>
    </>
  );
}

const EquipmentCardDiv = styled.div`
  width: 280px;
  height: 50px;
  background-color: white;
  margin-top: 10px;
  border-radius: 10px;
  border: 1px solid darkgray;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 12px;
  h1 {
    font-weight: 900;
  }
  img {
    margin-left: 5px;
    width: 25px;
    height: auto;
  }
`;

const LeftSide = styled.div`
  width: 10%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const MiddleSide = styled(LeftSide)`
  width: 40%;
  justify-content: space-evenly;
  flex-direction: row;
`;

const RightSide = styled(LeftSide)`
  width: 50%;
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
  margin-left: 95px;
  cursor: pointer;
  :active {
    box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.5);
  }
  :hover {
    background-color: #d6d6d6;
  }
`;


