import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";


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
`;

const ErrorMessage = styled.p`
  color: #f44336;
  margin-top: ${({ theme }) => theme.spacing.small};
`;

// eslint-disable-next-line react/prop-types
function Register({ register }) {
    const navigate = useNavigate();
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
        await register(registerCredentials.username, registerCredentials.password);
        alert(`Registered successfully with username: ${registerCredentials.username}`);
        navigate("/auth/login");
      } catch (error) {
        if (error.status === 400 && error.message.includes("User with username")) {
          setErrorMessage("Username already exists. Please choose another.");
        } else {
          setErrorMessage(error.message || "Registration failed. Please try again.");
        }
      }
    };

  const onChange = (evt) => {
    setErrorMessage("")
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
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={registerCredentials.password}
              onChange={onChange}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={registerCredentials.confirmPasswordpassword}
              onChange={onChange}
            />
          </FormGroup>
          <SubmitButton type="submit">Register</SubmitButton>
        </form>
      </RegisterBox>
    </RegisterContainer>
  );
}

export default Register;
