import styled from "styled-components";

export default function EquipmentToBudgetCard({
    name,
    price,
    rentQuantity,
    image,
}) {


  return (
    <>
      <EquipmentCardDiv>
        <LeftSide>
          <img src={image} />
        </LeftSide>
        <MiddleSide>
          <h1>{name}</h1>
          <h2>R${price.toFixed(2).replace(".", ",")}</h2>x
          <h3>
            {rentQuantity} R$
          </h3>
          <h3 style={{fontWeight:"900"}}>{(price * rentQuantity).toFixed(2).replace(".", ",")}</h3>
        </MiddleSide>
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
  width: 90%;
  justify-content: space-evenly;
  flex-direction: row;
`;


