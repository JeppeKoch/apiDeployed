import { useEffect, useState } from 'react';
import { api } from '../services/Fetch';
import styled, { ThemeProvider } from "styled-components";
import { Link } from 'react-router';
import { jwtDecode } from 'jwt-decode';
import facade from '../services/apiFacade';


const NavBar = styled.div`
display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  padding: 10px 20px;
  border-bottom: 1px solid #ccc;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: stretch;
  }
`;


const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
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

const TopNav = styled.div`
overflow: hidden;
  float: right;
  padding: 6px;
  border: none;
  margin-top: 8px;
  margin-right: 16px;
  font-size: 17px;

   @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    float: none;
    display: block;
    text-align: left;
    width: 100%;
    margin: 0;
    padding: 14px;
  }

`
const TopLeftNav = styled.div`
display: flex;
  gap: 10px;
  align-content: center;

`
const Button = styled(Link)`
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-decoration: none;

  font-size: ${(props) => props.theme.fontSizes.medium};
  text-transform: uppercase;

  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }
`;

function HomePage() {
  
  const [spices, setSpices] = useState([]); 
  const [cuisines, setCuisines] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showTable, setShowTables] = useState(false);
  const [searchTerm, setSearchTerm] = useState('')
  const [view, setView] = useState('spices')
  const [expandedCuisines, setExpandedCuisines] = useState([]);
  const token = facade.getToken()
  let username = null


    if(token){
      const decoded = jwtDecode(token);
        username = decoded.sub
  }




  useEffect(() => {
    api.spices.getAll().then(data => {
      setSpices(data);
    });
    api.cuisines.getAll().then(data => {
      setCuisines(data);
    });
  }, []);

  const toggleDropdown = () => {
    setShowTables(prev => !prev);
  };

  const toggleCuisineDropdown = (id) => {
    setExpandedCuisines(prev => 
      prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
    );
  };
  const dataToFilter = view === 'spices' ? spices : cuisines;

  const filteredData = dataToFilter.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handleKeySearch = (e) => {
    if(e.key === 'Enter'){
      setShowTables(true)
    }
  }


  return (
    <>
           <NavBar>
        <TopLeftNav>
          <button onClick={() => setView('spices')}>Spices</button>
          <button onClick={() => setView('cuisines')}>Cuisines</button>
        </TopLeftNav>
        <TopNav>
          <input 
            type="text" 
            placeholder="Search by name" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            onKeyDown={handleKeySearch} 
          />
        </TopNav>
      </NavBar>
      <h1>Under here you will be able to see all the spices</h1>
      <p>Choose what you want to see:</p>
     

      <DropdownWrapper>
      <Button onClick={toggleDropdown}>
      {showTable ? `Hide ${view}` : `Show all ${view}`}
        </Button>
        {showTable && (
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Flavor Profile</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((content) => (
                <tr key={content.id}>
                  <td>{content.name}</td>
                  <td>{content.description}</td>
                  <td>{content.flavor_profile}</td>

                  <td><Button to={`/userpage/${content.id}/${username}/${view}`}>Add {view} to favorite list</Button></td>


                 
                  {view === 'cuisines' && content.spices && (
                    <>
                    <td>
                      <Button onClick={() => toggleCuisineDropdown(content.id)}>
                        {expandedCuisines.includes(content.id) ? 'Hide recommended spices' : 'View recommended spices'}
                        </Button>
                        </td>


                        {expandedCuisines.includes(content.id) && (
                          <td>
                            {content.spices.map((spice) => spice.name).join(', ')}
                            </td>
                          )}
                          
                          </>
                        )}
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </DropdownWrapper>
    </>
  );
}

export default HomePage;

  
