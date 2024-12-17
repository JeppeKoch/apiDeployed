import { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import facade from "../services/apiFacade";

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.lightSkyBlue};
  font-family: ${({ theme }) => theme.fonts.primary};
`;

const LoginBox = styled.div`
  background: ${({ theme }) => theme.colors.darkSkyBlue};
  color: white;
  padding: ${({ theme }) => theme.spacing.large};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: left;

  h2 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: ${({ theme }) => theme.fontSizes.large};
    margin-bottom: ${({ theme }) => theme.spacing.medium};
  }
`;

const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const Label = styled.label`
  display: block;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.small};
  border: none;
  border-radius: 4px;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.darkSkyBlue};
`;

const ErrorMessage = styled.p`
  color: #f44336;
  font-size: ${({ theme }) => theme.fontSizes.small};
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.small};
  background-color: white;
  color: ${({ theme }) => theme.colors.darkSkyBlue};
  border: none;
  border-radius: 4px;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.lightSkyBlue};
    color: white;
  }
`;

const RegisterButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.small};
  background-color: ${({ theme }) => theme.colors.darkSkyBlue};
  color: white;
  border: 1px solid white;
  border-radius: 4px;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  cursor: pointer;

  &:hover {
    background-color: white;
    color: ${({ theme }) => theme.colors.darkSkyBlue};
  }
`;

const LogoutButton = styled.button`
  margin-top: ${({ theme }) => theme.spacing.medium};
  width: 100%;
  padding: ${({ theme }) => theme.spacing.small};
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  cursor: pointer;

  &:hover {
    background-color: #d32f2f;
  }
`;

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [loggedIn, setLoggedIn] = useState(facade.loggedIn());
  const navigate = useNavigate();

  async function HandleLogin(event) {
    event.preventDefault();

    try {
      await facade.login(username, password);
      setLoggedIn(true); 
      navigate("/Home"); 
    } catch (error) {
      if (error.status === 401) {
        setErrorMessage("Invalid username or password.");
      } else {
        setErrorMessage("Something went wrong. Please try again."); 
      }
    }
  }

  function handleLogout() {
    facade.logout();
    setLoggedIn(false); 
    alert("You have been logged out.");
    navigate("/home"); 
  }

  function handleRegister() {
    navigate("/auth/register");
  }

  return (
    <LoginContainer>
      <LoginBox>
        <h2>{loggedIn ? "Welcome!" : "Login"}</h2>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        {!loggedIn ? (
          <form onSubmit={HandleLogin}>
            <FormGroup>
              <Label htmlFor="username">Username</Label>
              <Input
                type="text"
                id="username"
                placeholder="Indtast dit brugernavn"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                placeholder="Indtast dit password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
            <SubmitButton type="submit">Login</SubmitButton>
          </form>
        ) : (
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        )}
        {!loggedIn && <RegisterButton onClick={handleRegister}>Register</RegisterButton>}
      </LoginBox>
    </LoginContainer>
  );
}

export default Login;
