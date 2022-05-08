import styled from "styled-components";

export const Container = styled.div`
  height: 750px;
  /* background: #000; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
export const Header = styled.div`
  height: 10%;
  width: 100%;
  flex-direction: column;
  vertical-align: middle;
  background: #000;
  justify-content: center;
  align-items: center;
  display: flex;
`;
export const Body = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
`;

export const SideMenu = styled.div`
  height: 100%;
  width: 15%;
  background: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  border-right-width: 1px;
  border-right-color: #000;
`;

export const GraphContainer = styled.div`
  height: 100%;
  width: 100%;
  /* background: #f00; */
  display: flex;
  align-items: center;
  flex-direction: row;
`;

export const Text = styled.p`
  margin-top: 15px;
  font-size: 20px;
  color: #ff0000;
  text-align: center;
`;

export const Input = styled.input`
  background: rgba(0, 0, 0, 0.1);
  border: 1;
  border-radius: 4px;
  height: 35px;
  padding: 0 15px;
  color: #000;
  margin: 0 0 10px;
  &::placeholder {
    color: rgba(120, 120, 120, 0.7);
  }
`;