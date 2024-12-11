import { useEffect, useState } from 'react';
import { api } from '../services/Fetch';

function HomePage() {
const [spices, setSpices] = useState([]); 
const [setContent] = useState("");
const [isLoggedIn, setIsLoggedIn] = useState(false); // Tracks login status

  // Simulate login/logout
  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  useEffect(() => {
    api.spices.getAll().then(data => {
      setSpices(data);
    });
  }, []);
  
  

    return (
      <>
        <h1>Under here you will be able to see all the spices</h1>
        <p>Choose what you want to see:</p>

        <div>
      <button onClick={() => <ul>
        {spices.map((spice) =>{
          <li key={spice.id}>{spice.name}</li>
        })}</ul>    }>Show Spices</button>
    </div>
    


{isLoggedIn && (
      <div>
        <button>Favorite List</button>
        <button>Search</button>
        <button>Add Spice</button>
      </div>
    )}
  </>
);
}

export default HomePage;

  
