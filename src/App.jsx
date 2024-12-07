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
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImg = styled.img`
  height: 40px;
  margin-right: 15px;
`;

const LogoText = styled.h1`
  font-size: 1.8rem;
  color: white;
  margin: 0;
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
`;

// Content Layout
const Content = styled.div`
  display: flex;
  margin-top: 20px;
  height: calc(100vh - 80px);
  color: #333;
`;

const LeftMenu = styled.div`
  width: 200px;
  background-color: #f4f4f4;
  padding: 20px;
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
        </Logo>
        <NavMenu>
          <NavItem to="/home">Home</NavItem>
          <NavItem to="/vision">Vision</NavItem>
          <NavItem to="/endpoints">Endpoints</NavItem>
        </NavMenu>
      </Header>

      <Content>
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
