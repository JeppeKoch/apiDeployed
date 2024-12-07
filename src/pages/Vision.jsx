/* eslint-disable react/prop-types */
import styled, {ThemeProvider} from "styled-components";
import { theme } from "../theme";
import { Link } from "react-router-dom";

function Vision() {
    const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start; /´
    height: calc(100vh - 200px); 
    padding-top: 40px; 
    text-align: center;
  font-family: ${(props) => props.theme.fonts.primary};
  color: ${(props) => props.theme.colors.darkSkyBlue};
  padding: 20px;
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

    return ( 
    <>
    <div>
    <ThemeProvider theme={theme}>
    <Content>
    <h1>Vision for the API</h1>
    <h3>Kan du lide mad? Kan du måske lide krydret mad? Så er dette API for dig. Med vores API vil vi give dig et overblik over alle de bedste krydderier. </h3>
    <Button to={'/endpoints'}>
            View Endpoints for API
        </Button>
        
    </Content>
    </ThemeProvider>
    </div>
    </> 
    );
}

export default Vision;