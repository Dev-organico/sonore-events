import styled from "styled-components";

export const AuthLayout = styled.div`
  display: flex;
  width: 100%;
  height: 600px;
  font-size: 16px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 30px;
`;

export const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  font-size: 40px;
  top: 0;
  h1 {
    margin-top: 10px;
  }
`;

export const Label = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
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

export const Button = styled.button`
  width: 80px;
  height: 30px;
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
