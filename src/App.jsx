/* eslint-disable no-unused-vars */
import styled, {ThemeProvider} from "styled-components";
import { Link, useLocation, useNavigate , Outlet} from "react-router-dom";
import { theme } from "./theme";
import React, {useEffect} from "react";
import './App.css'


  const Header = styled.header`
  // background-color: #2d3a3f;
  background-color: ${props => props.theme.darkSkyBlue};
  color: white;
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: ${props =>  props.theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;

    @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    margin-bottom: 15px;
  }
`;

const LogoImg = styled.img`
  height: 40px;
  margin-right: 15px;

    @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    height: 30px;
    margin-right: 10px;
  }
`;

const LogoText = styled.h1`
  font-size: 1.8rem;
  color: white;
  margin: 0;

    @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1.4rem;
  }
`;

const NavMenu = styled.nav`
  display: flex;
  gap: 30px;
  padding-bottom: 7px;
`;

const NavItem = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.1rem;
  &:hover {
    text-decoration: underline;
    font-weight: bold;
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    gap: 20px;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    padding-bottom: 0;
  }
`;

// Content Layout
const Content = styled.div`
  display: flex;
  margin-top: 20px;
  height: calc(100vh - 80px);
  color: #333;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: column;
    height: auto; 
  }
`;

const LeftMenu = styled.div`
  width: 200px;
  background-color: #f4f4f4;
  padding: 20px;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }

`;

const LeftMenuItem = styled(Link)`
  display: block;
  color: #333;
  text-decoration: none;
  margin-bottom: 10px;
  &:hover {
    text-decoration: underline;
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #fafafa;
  border-left: 2px solid #ccc;
  overflow-y: auto; /* Allows scrolling inside the main content if needed */

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    border-left: none;
    border-top: 2px solid #ccc;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 15px;
  }
`;

const ErrorBanner = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
`;


const App = () => {
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [showRenderError, setShowRenderError] = React.useState(false);
  // Use useLocation to listen for route changes
  const location = useLocation();
  const navigate = useNavigate();


  // Reset error message on route change
  useEffect(() => {
    setErrorMessage(null);
    setShowRenderError(false);
  }, [location]);

  return (
    <div>
    <ThemeProvider theme={theme}>
      <Header>
        <Logo onClick={()=>navigate('/home')}>
          <LogoImg
            src="https://culinarylabschool.com/wp-content/uploads/2018/03/spices.jpg"
            alt="Logo"
          />
          <LogoText>MySite</LogoText>
        </Logo>
        <NavMenu>
          <NavItem to="/home">Home</NavItem>
          <NavItem to="/vision">Vision</NavItem>
          <NavItem to="/endpoints">Endpoints</NavItem>
          <NavItem to="/spice">Spices</NavItem>
          <NavItem to="/LoginPage">sign in</NavItem>
        </NavMenu>
      </Header>

      <Content>

        {/* <LeftMenu>
          <LeftMenuItem to="/link1">Link 1</LeftMenuItem>
          <LeftMenuItem to="/link2">Link 2</LeftMenuItem>
          <LeftMenuItem to="/link3">Link 3</LeftMenuItem>
        </LeftMenu> */}
        <MainContent>
          {errorMessage && <ErrorBanner>{errorMessage}</ErrorBanner>}
          <Outlet context={{setErrorMessage}}/>
        </MainContent>
      </Content>
    </ThemeProvider>
  </div>
  );
};


export default App
