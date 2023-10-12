import React, { useState, useEffect } from "react";
import Graph from "react-graph-vis";
import options from "../../jsons/options.json";
import example from "../../jsons/example.json";
import api from "../../api";
import {
  Container,
  Header,
  Body,
  SideMenu,
  GraphContainer,
  Button,
  Text,
  Input,
  Footer,
  LoadingContainer,
  RestoreButton,
  TextInput
} from "./styles";
import ReactLoading from 'react-loading';

export default function Home() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  const [userInputed, setUserInputed] = useState("");
  const [levelInputed, setLevelInputed] = useState("");
  const [userSelected, setUserSelected] = useState("");
  const [destinyInputed, setDestinyInputed] = useState("");
  const [graph, setGraph] = useState({
    nodes: [],
    edges: []
  });
  const [backupGraph, setBackupGraph] = useState({
    nodes: [],
    edges: []
  });
  const [totalNodes, setTotalNodes] = useState(0);
  const [totalEdges, setTotalEdges] = useState(0);
  const [loading, setLoading] = useState(false);
  // const [graph, setGraph] = useState(example);

  const events = {
    select: function(event) {
      var { nodes, edges } = event;
      setUserSelected(nodes[0])
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

  async function handleSubmit() {
    if (levelInputed === "" || userInputed === "") {
      alert("Preencha todos os campos");
      return
    }
    if (levelInputed > 5) {
      alert("O grau de separação não pode ser maior que 5");
      return
    }
    setLoading(true);
    let response = await api.get(`${userInputed}/graph/${levelInputed}`);

    if (!response.data) {
      alert("Erro ao gerar grafo");
      setLoading(false);
      return
    }
    console.log(response.data)
    setGraph(response.data)
    setBackupGraph(response.data)
    setTotalNodes(response.data.nodes.length)
    setTotalEdges(response.data.edges.length)
    setLoading(false);

  }

  async function handleSearch() {
    setLoading(true);
    let response = await api.post(`search`, {
      origin: userInputed,
      destiny: destinyInputed,
      graph: graph
    });
    console.log(response.data)
    setGraph(response.data)
   
    // setTotalNodes(response.data.nodes.length)
    // setTotalEdges(response.data.edges.length)
    setLoading(false);

  }

  async function handleRestore() {
    setGraph(backupGraph)
  }

  return (
    <Container>
      <Header>
          <Text>
            Total de vértices: {totalNodes} |     Total de arestas: {totalEdges}
          </Text>
      </Header>
      <Body>
        <SideMenu>
          <TextInput>
            Usuário Github
          </TextInput>
          <Input 
            value={userInputed}
            required
            onChange={(input) => {
              setUserInputed(input.target.value);
            }}
            placeholder="Usuário Github"
          />
          <TextInput>
            Número de graus
          </TextInput>
          <Input 
            value={levelInputed}
            required
            onChange={(input) => {
              setLevelInputed(input.target.value);
            }}
            placeholder="Graus de separação"
          />
          <Button type="submit" onClick={handleSubmit}>
            <Text>
              Gerar grafo
            </Text>
          </Button> 
          {/* <Text>
            Total de vértices: {totalNodes}
          </Text>
          <Text>
            Total de arestas: {totalEdges}
          </Text> */}
          <TextInput>
            Usuário destino
          </TextInput>
          <Input 
            value={destinyInputed}
            required
            onChange={(input) => {
              setDestinyInputed(input.target.value);
            }}
            placeholder="Usuário destino"
          />
          <Button type="submit" onClick={handleSearch}>
            <Text>
              Buscar
            </Text>
          </Button> 

          <RestoreButton type="submit" onClick={handleRestore}>
            <Text>
              Restaurar
            </Text>
          </RestoreButton> 
        </SideMenu>
        {loading ? 
        (<LoadingContainer>
          <ReactLoading type={'spin'} color={'#fff'} height={windowDimensions.width * 0.1} width={windowDimensions.width * 0.1} />
        </LoadingContainer>)  :
        (<GraphContainer>
          <Graph 
            graph={graph}
            options={options} 
            events={events} 
          />
        </GraphContainer>)}
      </Body>
      <Footer>
        <Text>
          {userSelected}
        </Text>
      </Footer>
    </Container>
  );
}