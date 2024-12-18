import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import styled from "styled-components";
import facade from "../services/apiFacade";

// Styled components
const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.lightSkyBlue};
`;

const LoginBox = styled.div`
  background: ${({ theme }) => theme.colors.darkSkyBlue};
  color: white;
  padding: ${({ theme }) => theme.spacing.large};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: left;
`;

const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: none;
  border-radius: 4px;
`;

const ErrorMessage = styled.p`
  color: #f44336;
  margin-bottom: 10px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 8px;
  background-color: white;
  color: ${({ theme }) => theme.colors.darkSkyBlue};
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.lightSkyBlue};
    color: white;
  }
`;

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();
  const { setIsLoggedIn } = useOutletContext(); // Få adgang til App's state

  async function HandleLogin(event) {
    event.preventDefault();

    try {
      await facade.login(username, password); // Antager facade håndterer API-login
      setIsLoggedIn(true); // Opdater App's state
      navigate("/home"); // Send brugeren til home
    } catch (error) {
      setErrorMessage(
        error.status === 401
          ? "Invalid username or password."
          : "Something went wrong. Please try again."
      );
    }
  }

  return (
    <LoginContainer>
      <LoginBox>
        <h2>Login</h2>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <form onSubmit={HandleLogin}>
          <FormGroup>
            <Label>Username</Label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          <SubmitButton type="submit">Login</SubmitButton>
        </form>
      </LoginBox>
    </LoginContainer>
  );
}

export default Login;
