import React from 'react';
import styled from 'styled-components';
import { api } from '../services/Fetch';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

// Mock user data
const mockUser = {
  name: "John Doe",
  userName: "john.doe@example.com",
  joinDate: "January 2024",

  avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=j"
};

// Styled Components
const Container = styled.div`
  min-height: 80vh;
  background-color: #f3f4f6;
`;

const Wrapper = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const Header = styled.div`
  background-color: #2563eb;
  padding: 1.5rem;
  color: white;
`;

const Avatar = styled.img`
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  border: 4px solid white;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
`;

const Content = styled.div`
  padding: 1.5rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Label = styled.h2`
  font-size: 0.875rem;
  color: #6b7280;
`;

const Text = styled.p`
  color: #1f2937;
`;
const Table = styled.table`
 width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  
  th, td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f5f5f5;
  }
`
const Button = styled.button`
  background-color: ${(props) => (props.active ? '#2563eb' : '#e5e7eb')};
  color: ${(props) => (props.active ? 'white' : '#374151')};
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  transition: background-color 0.3s, color 0.3s;
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: ${(props) => (props.active ? '#1d4ed8' : '#d1d5db')};
  }
`;

function UserPage() {
  const user = mockUser;
  const [activeView, setActiveView] = useState(null);
  const [favorites, setFavorites] = useState([])
  const {id, username} = useParams()

  // Handler for the "Add New" button
  const handleAddNew = () => {
    alert("Redirect or open a modal to add a new spice or cuisine.");
  };

  const addContent = () => {
    api.favorites.createSpiceFavorite(username ,id)
  }

  return (
    <Container>
      <Wrapper>
        <Card>
          {/* Header Section */}
          <Header>
            <HeaderContent>
              <Avatar src={user.avatarUrl} alt={`${user.name}'s avatar`} />
              <div>
                <Title>{user.name}</Title>
              </div>
            </HeaderContent>
          </Header>

          {/* User Information */}
          <Content>
            <Grid>
              <Section>
                <div>
                  <Label>Username</Label>
                  <Text>{user.userName}</Text>
                </div>
                <div>
                  <Label>Member Since</Label>
                  <Text>{user.joinDate}</Text>
                </div>
              </Section>

              {/* Buttons Section */}
              <Section>
                <Label>See Favorite Lists</Label>
                <Button
                  active={activeView === 'spices'}
                  onClick={() => setActiveView(activeView === 'spices' ? null : 'spices')}
                >
                Spices
                </Button>
                <Button
                  active={activeView === 'cuisines'}
                  onClick={() => setActiveView(activeView === 'cuisines' ? null : 'cuisines')
                  }
                >
                Cuisines
                </Button>
                {activeView &&(
                    <Table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Flavor Profile</th>
                      </tr>
                    </thead>
                    <tbody>
                     {favorites.map(content => (
                        <tr key={content.id}>
                          <td>{content.name}</td>
                          <td>{content.description}</td>
                          <td>{content.flavor_profile}</td>
                       </tr>
                ))}
                    </tbody>
                  </Table>
                )

                }
                <Button onClick={handleAddNew}>
                  Add New Spice/Cuisine to List
                </Button>
              </Section>
            </Grid>
          </Content>
        </Card>
      </Wrapper>
    </Container>
  );
}

export default UserPage;
