import styled from "styled-components";
import Header from "../../components/header";
import { BsSoundwave } from "react-icons/bs";
import { MdVideoLabel } from "react-icons/md";
import { MdOutlineLight } from "react-icons/md";
import { useState } from "react";
import { useEffect } from "react";
import { getEquipments } from "../../services/getEquipmentApi";
import useToken from "../../hooks/useToken";
import AddEquipment from "../../components/addEquipment";
import EquipmentCard from "../../components/equipmentCard";

export default function EquipmentsArea() {
  const token = useToken();
  const [equipments, setEquipments] = useState([]);
  const [soundVisible, setSoundVisible] = useState("none");
  const [videoVisible, setVideoVisible] = useState("none");
  const [lightVisible, setLightVisible] = useState("none");

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

  return (
    <Wrapper>
      <Header />
      <ButtonsWrapper>
        <AddEquipment setEquipments={setEquipments} />
        <SoundButton
          onClick={() => {
            if (soundVisible === "none") {
              setSoundVisible("flex");
            } else {
              setSoundVisible("none");
            }
          }}
        >
          <BsSoundwave
            style={{
              marginRight: "6px",
              fontSize: "15px",
            }}
          />
          Aúdio
        </SoundButton>
        <EquipmentsWrapper
          style={{
            display: `${soundVisible}`,
          }}
        >
          {equipments.map((el) => {
            if (el.type === "AUDIO") {
              return (
                <EquipmentCard
                  key={el.id}
                  id={el.id}
                  name={el.name}
                  price={el.price}
                  quantity={el.quantity}
                  image={el.image}
                  setEquipments={setEquipments}
                />
              );
            }
          })}
        </EquipmentsWrapper>
        <VideoButton
          onClick={() => {
            if (videoVisible === "none") {
              setVideoVisible("flex");
            } else {
              setVideoVisible("none");
            }
          }}
        >
          <MdVideoLabel
            style={{
              marginRight: "6px",
              fontSize: "15px",
            }}
          />
          Vídeo
        </VideoButton>
        <EquipmentsWrapper
          style={{
            display: `${videoVisible}`,
          }}
        >
          {equipments.map((el) => {
            if (el.type === "VIDEO") {
              return (
                <EquipmentCard
                  key={el.id}
                  id={el.id}
                  name={el.name}
                  price={el.price}
                  quantity={el.quantity}
                  image={el.image}
                  setEquipments={setEquipments}
                />
              );
            }
          })}
        </EquipmentsWrapper>
        <LigthButton
          onClick={() => {
            if (lightVisible === "none") {
              setLightVisible("flex");
            } else {
              setLightVisible("none");
            }
          }}
        >
          <MdOutlineLight
            style={{
              marginRight: "6px",
              fontSize: "15px",
            }}
          />
          Luz
        </LigthButton>
        <EquipmentsWrapper
          style={{
            display: `${lightVisible}`,
          }}
        >
          {equipments.map((el) => {
            if (el.type === "LUZ") {
              return (
                <EquipmentCard
                  key={el.id}
                  id={el.id}
                  name={el.name}
                  price={el.price}
                  quantity={el.quantity}
                  image={el.image}
                  setEquipments={setEquipments}
                />
              );
            }
          })}
        </EquipmentsWrapper>
      </ButtonsWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  padding-bottom: 30px;
`;

const ButtonsWrapper = styled.div`
  margin-top: 100px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EquipmentsWrapper = styled(ButtonsWrapper)`
  margin-top: 10px;
  height: auto;
  justify-content: center;
`;


const SoundButton = styled.button`
  width: 300px;
  height: 60px;
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
  margin-top: 15px;
`;

const LigthButton = styled(SoundButton)`
  background-color: #32614e;
  margin-top: 15px;
`;
