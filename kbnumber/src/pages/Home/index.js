import React, { useState, useEffect } from "react";
import Graph from "react-graph-vis";
import options from "../../jsons/options.json";
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
  const graph = {
    nodes: [
      { id: 1, label: "Node 1", title: "node 1 tootip text" },
      { id: 2, label: "Node 2", title: "node 2 tootip text" },
      { id: 3, label: "Node 3", title: "node 3 tootip text" },
      { id: 4, label: "Node 4", title: "node 4 tootip text" },
      { id: 5, label: "Node 5", title: "node 5 tootip text" }
    ],
    edges: [
      { from: 1, to: 2 },
      { from: 1, to: 3 },
      { from: 2, to: 4 },
      { from: 2, to: 5 }
    ]
  };
  const events = {
    select: function(event) {
      var { nodes, edges } = event;
    }
  };

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
          <Graph 
            graph={graph}
            options={options} 
            events={events} 
          />
        </GraphContainer>
      </Body>
    </Container>
  );
}