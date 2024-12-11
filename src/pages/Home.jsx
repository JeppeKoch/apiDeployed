
import styled, { ThemeProvider } from "styled-components";
import { Link } from "react-router-dom";
import { theme } from "../theme";
import { useEffect, useState } from "react";
import { api } from "../services/Fetch";
// Styled Components
const Container = styled.div`
  text-align: center;
  font-family: ${(props) => props.theme.fonts.primary};
  color: ${(props) => props.theme.colors.darkSkyBlue};
  padding: 20px;
`;

const Header = styled.h1`
  font-size: ${(props) => props.theme.fontSizes.extraLarge};
  margin-bottom: 20px;
  text-transform: uppercase;
`;

const SubHeader = styled.h2`
  font-size: ${(props) => props.theme.fontSizes.large};
  margin-bottom: 20px; 
  color: ${(props) => props.theme.colors.lightSkyBlue};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /´
  height: calc(100vh - 200px); 
  padding-top: 40px; 
`;

const Button = styled(Link)`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border: none;
  border-radius: 5px;
  font-size: ${(props) => props.theme.fontSizes.medium};
  text-transform: uppercase;
  margin-top: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }
`;




function Home() {

  const [spices, setSpices] = useState([]); // State til at gemme krydderier

  useEffect(() => {
    const fetchSpices = async () => {
        const data = await api.spices.getAll(); // Hent alle krydderier
        setSpices(data || []); // Gem dem i state
      
    };

    fetchSpices(); // Kald fetch-funktionen
  }, []); // Tom array betyder, at useEffect kun kører én gang ved komponentets mount


  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Header>Available APIs</Header>
        <h1>Welcome</h1>
        <ul>
      {spices.length > 0 ? (
        spices.map((spice) => <li key={spice.id}>{spice.name}</li>)
      ) : (
        <p>Ingen krydderier fundet.</p>
      )}
    </ul>
        <Content>
          <SubHeader>SpiceAPI</SubHeader>
          <Button to="/vision">View Vision</Button>
        </Content>
      </Container>
    </ThemeProvider>
  );
}

export default Home;
