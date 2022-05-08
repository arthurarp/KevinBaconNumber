import React, { useState, useEffect } from "react";
import {
  Container,
  Header,
  Body,
  SideMenu,
  GraphContainer,
  Text,
  Input,
} from "./styles";

export default function Home() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  const [userInputed, setUserInputed] = useState("");

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }

  return (
    <Container>
      <Header>
        <Text>
          {windowDimensions.width} + {windowDimensions.height}
        </Text>
      </Header>
      <Body>
        <SideMenu>
          <Input 
            value={userInputed}
            required
            onChange={(input) => {
              setUserInputed(input.target.value);
              console.log(userInputed)
            }}
            placeholder="git user"
          
          />
          
        </SideMenu>
        <GraphContainer>

        </GraphContainer>
      </Body>
    </Container>
  );
}