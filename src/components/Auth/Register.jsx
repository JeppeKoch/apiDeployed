import { useState } from "react";
import styled from "styled-components";
import { useNavigate, useOutletContext } from "react-router"; // Hent Outlet Context for at opdatere login-status
import facade from "../../services/apiFacade"; // Importer apiFacade

const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.lightSkyBlue};
`;

const RegisterBox = styled.div`
  background: ${({ theme }) => theme.colors.darkSkyBlue};
  padding: ${({ theme }) => theme.spacing.large};
  border-radius: 8px;
  color: white;
  width: 300px;
  text-align: left;
`;

const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.small};
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.small};
  background-color: white;
  color: ${({ theme }) => theme.colors.darkSkyBlue};
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.lightSkyBlue};
    color: white;
  }
`;

const ErrorMessage = styled.p`
  color: #f44336;
  margin-top: ${({ theme }) => theme.spacing.small};
`;

function Register() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useOutletContext(); // Hent setIsLoggedIn fra App via Outlet Context

  const [registerCredentials, setRegisterCredentials] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (registerCredentials.password !== registerCredentials.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      await facade.register(registerCredentials.username, registerCredentials.password);
      // Automatisk log ind efter succesfuld registrering
      await facade.login(registerCredentials.username, registerCredentials.password);
      setIsLoggedIn(true); // Opdater App's login-status
      navigate("/home"); // Naviger brugeren til Home
    } catch (error) {
      setErrorMessage(
        error.message || "Registration failed. Please try again."
      );
    }
  };

  const onChange = (evt) => {
    setErrorMessage(""); // Nulstil fejlbesked
    setRegisterCredentials({
      ...registerCredentials,
      [evt.target.id]: evt.target.value,
    });
  };

  return (
    <RegisterContainer>
      <RegisterBox>
        <h2>Register</h2>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <form onSubmit={handleRegister}>
          <FormGroup>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              value={registerCredentials.username}
              onChange={onChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={registerCredentials.password}
              onChange={onChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={registerCredentials.confirmPassword}
              onChange={onChange}
              required
            />
          </FormGroup>
          <SubmitButton type="submit">Register</SubmitButton>
        </form>
      </RegisterBox>
    </RegisterContainer>
  );
}

export default Register;
