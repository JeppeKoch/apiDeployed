import { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { Link, useLocation, useNavigate, Outlet } from "react-router";
import { theme } from "./components/Styles/theme";
import "./App.css";

// Styled components
const Header = styled.header`
  background-color: ${props => props.theme.darkSkyBlue};
  color: white;
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

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

const NavItemButton = styled.button`
  color: white;
  background: none;
  border: none;
  font-size: 1.1rem;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
    font-weight: bold;
  }
`;

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const location = useLocation();
  const navigate = useNavigate();


  useEffect(() => {
    setErrorMessage(null);
  }, [location]);

  
  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/auth/login");
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Header>
          <Logo onClick={() => navigate("/home")}>
            <LogoImg
              src="https://culinarylabschool.com/wp-content/uploads/2018/03/spices.jpg"
              alt="Logo"
            />
            <LogoText>MySite</LogoText>
          </Logo>
          <NavMenu>
            <NavItem to="/home">Home</NavItem>
            <NavItem to="/vision">Vision</NavItem>
            <NavItem to="/spice">Spices</NavItem>
            {isLoggedIn ? (
              <>
               <NavItemButton onClick={handleLogout}>Logout</NavItemButton>
              <NavItem to="/userprofile">Profile</NavItem>
              </>
               
            ) : (
              <>
                <NavItem to="/auth/login">Sign In</NavItem>
                <NavItem to="/auth/register">Register</NavItem>
              </>
            )}
          </NavMenu>
        </Header>

        <div>
          {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
          <Outlet context={{ setErrorMessage, setIsLoggedIn }} />
        </div>
      </ThemeProvider>
    </div>
  );
};

export default App;
