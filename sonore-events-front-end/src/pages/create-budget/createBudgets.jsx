import styled from "styled-components";
import Header from "../../components/header";
import { toast } from "react-toastify";
import { useState } from "react";
import { getEquipments } from "../../services/getEquipmentApi";
import BudgetEquipmentCard from "../../components/budgetEquipmentCard";
import IncludedEquipmentCard from "../../components/includedEquipmentCard";
import useToken from "../../hooks/useToken";
import { useEffect } from "react";
import { postBudget } from "../../services/createBudget";
import { postEquipmentToBudget } from "../../services/createEquipmentToBudgetsApi";

export default function CreateBudget() {
  const [includedEquipments, setIncludedEquipments] = useState([]);
  const token = useToken();
  const [equipments, setEquipments] = useState([]);
  const [soundVisible, setSoundVisible] = useState("none");
  const [videoVisible, setVideoVisible] = useState("none");
  const [lightVisible, setLightVisible] = useState("none");
  const [totalPrice, setTotalPrice] = useState(0);
  const [budgetName, setBudgetName] = useState("");
  const [budgetComment, setBudgetComment] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getEquipments(token);
        setEquipments(result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const calculateTotalPrice = () => {
      let sum = 0;
      includedEquipments.forEach((equipment) => {
        sum += equipment.price * equipment.rentQuantity;
      });
      setTotalPrice(sum);
    };

    calculateTotalPrice();
  }, [includedEquipments]);

  async function createNewBudget() {
    const confirmed = window.confirm(
      "Deseja criar o orçamento? ele não poderá ser alterado depois disso"
    );
    if (confirmed) {
      try {
        const newBudget = await postBudget(token, {
          name: budgetName,
          comment: budgetComment,
          finalPrice: totalPrice,
        });

        for (const el of includedEquipments) {
          await postEquipmentToBudget(token, {
            equipmentId: +el.id,
            budgetsId: +newBudget.id,
            rentQuantity: +el.rentQuantity,
          });
        }
        toast("Orçamento criado com sucesso!", {
          progressStyle: {
            background:
              "linear-gradient(to right, #a6c0fe, #6c8bf5, #4660e6, #1e31c8)",
          },
        });
      } catch (error) {
        toast("Ocorreu um erro!", {
          progressStyle: {
            background:
              "linear-gradient(to right, #a6c0fe, #6c8bf5, #4660e6, #1e31c8)",
          },
        });
        console.log(error);
      }
    }

    setTotalPrice(0);
    setBudgetComment("");
    setBudgetName("");
    setIncludedEquipments([]);
  }

  return (
    <Wrapper>
      <Header />
      <BudgetInfo>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createNewBudget();
          }}
        >
          <input
            placeholder="Título"
            type="string"
            value={budgetName}
            onChange={(e) => setBudgetName(e.target.value)}
            required
          />
          <input
            placeholder="Informações"
            type="string"
            value={budgetComment}
            onChange={(e) => setBudgetComment(e.target.value)}
            required
          />
          <Button type="submit">Finalizar orçamento</Button>
        </form>
      </BudgetInfo>
      <TitleOne>Equipametos incluídos</TitleOne>
      {includedEquipments.length > 0 ? (
        includedEquipments.map((el) => {
          return (
            <IncludedEquipmentCard
              key={el.id}
              id={el.id}
              name={el.name}
              price={el.price}
              rentQuantity={el.rentQuantity}
              image={el.image}
              setIncludedEquipments={setIncludedEquipments}
            />
          );
        })
      ) : (
        <h1 style={{ marginTop: "15px", fontSize: "15px" }}>
          sem equipamentos
        </h1>
      )}
      <TotalPrice>
        <h1>
          Total: <spam>R${totalPrice.toFixed(2).replace(".", ",")}</spam>
        </h1>
      </TotalPrice>
      <ButtonsWrapper>
        <SoundButton
          onClick={() => {
            if (soundVisible === "none") {
              setSoundVisible("flex");
            } else {
              setSoundVisible("none");
            }
          }}
        >
          Aúdio
        </SoundButton>

        <VideoButton
          onClick={() => {
            if (videoVisible === "none") {
              setVideoVisible("flex");
            } else {
              setVideoVisible("none");
            }
          }}
        >
          Video
        </VideoButton>

        <LigthButton
          onClick={() => {
            if (lightVisible === "none") {
              setLightVisible("flex");
            } else {
              setLightVisible("none");
            }
          }}
        >
          Luz
        </LigthButton>
      </ButtonsWrapper>
      <EquipmentsWrapper
        style={{
          display: `${soundVisible}`,
        }}
      >
        {equipments.map((el) => {
          if (el.type === "AUDIO") {
            return (
              <BudgetEquipmentCard
                key={el.id}
                id={el.id}
                name={el.name}
                price={el.price}
                quantity={el.quantity}
                image={el.image}
                setIncludedEquipments={setIncludedEquipments}
                includedEquipments={includedEquipments}
              />
            );
          }
        })}
      </EquipmentsWrapper>
      <EquipmentsWrapper
        style={{
          display: `${videoVisible}`,
        }}
      >
        {equipments.map((el) => {
          if (el.type === "VIDEO") {
            return (
              <BudgetEquipmentCard
                key={el.id}
                id={el.id}
                name={el.name}
                price={el.price}
                quantity={el.quantity}
                image={el.image}
                setIncludedEquipments={setIncludedEquipments}
                includedEquipments={includedEquipments}
              />
            );
          }
        })}
      </EquipmentsWrapper>
      <EquipmentsWrapper
        style={{
          display: `${lightVisible}`,
        }}
      >
        {equipments.map((el) => {
          if (el.type === "LUZ") {
            return (
              <BudgetEquipmentCard
                key={el.id}
                id={el.id}
                name={el.name}
                price={el.price}
                quantity={el.quantity}
                image={el.image}
                setIncludedEquipments={setIncludedEquipments}
                includedEquipments={includedEquipments}
              />
            );
          }
        })}
      </EquipmentsWrapper>
    </Wrapper>
  );
}

const TotalPrice = styled.div`
  width: 280px;
  height: 50px;
  background-color: white;
  margin-top: 10px;
  border-radius: 10px;
  border: 1px solid darkgray;
  display: flex;
  flex-direction: row;
  align-items: center;
  h1 {
    margin: 5px;
  }
  spam {
    font-weight: 900;
    margin-left: 5px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BudgetInfo = styled.div`
  height: auto;
  width: auto;
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  input {
    width: 150px;
    max-height: auto;
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

const TitleOne = styled.h1`
  display: flex;
  flex-direction: column;
  font-size: 20px;
  margin-top: 15px;
`;

const ButtonsWrapper = styled.div`
  margin-top: 10px;
  width: 350px;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const EquipmentsWrapper = styled(ButtonsWrapper)`
  height: auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SoundButton = styled.button`
  width: 80px;
  height: 70px;
  background-color: #83e1bb;
  border: none;
  border-radius: 10px;
  color: white;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  font-size: 15px;
  cursor: pointer;
  :active {
    box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.5);
  }
  :hover {
    background-color: #d6d6d6;
  }
`;

const VideoButton = styled(SoundButton)`
  background-color: #3ddb9c;
`;

const LigthButton = styled(SoundButton)`
  background-color: #32614e;
`;
