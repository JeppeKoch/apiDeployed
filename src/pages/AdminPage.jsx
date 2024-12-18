import { useState, useEffect } from "react";
import { api } from "../services/Fetch";
import facade from "../services/apiFacade";

function AdminPage() {
  /* FETCH */
  const [spices, setSpices] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [users, setUsers] = useState([]);
  /* DISPLAY */
  const [showSpices, setShowSpices] = useState(false);
  const [showCuisines, setShowCuisines] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  /* EDIT */
  const [editingSpice, setEditingSpice] = useState(null);
  const [editingCuisine, setEditingCuisine] = useState(null);
  /* CREATE */
  const [newSpice, setNewSpice] = useState({
    name: "",
    description: "",
    flavor_profile: "",
  });
  const [newCuisine, setNewCuisine] = useState({
    name: "",
    description: "",
    flavor_profile: "",
  });
  //   const [newUser, setNewUser] = useState({ name: "", role: "" });
  const [showAddSpiceForm, setShowAddSpiceForm] = useState(false);
  const [showAddCuisineForm, setShowAddCuisineForm] = useState(false);

  /* FETCH */
  useEffect(() => {
    api.spices.getAll().then(
      (spiceData) => {
        setSpices(spiceData);
      },
      api.cuisines.getAll().then(
        (cuisineData) => {
          setCuisines(cuisineData);
        }
        //   api.users.getAll().then(
        // (userData) => {
        //   setUsers(userData);
        // })
      )
    );
  }, []);

  /* DISPLAY */
  const showSpiceHandler = () => {
    setShowSpices(true);
    setShowCuisines(false);
    setShowUsers(false);
    setEditingSpice(null);
    setEditingCuisine(null);
    setShowAddSpiceForm(false);
    setShowAddCuisineForm(false);
  };

  const showCuisineHandler = () => {
    setShowCuisines(true);
    setShowSpices(false);
    setShowUsers(false);
    setEditingSpice(null);
    setEditingCuisine(null);
    setShowAddSpiceForm(false);
    setShowAddCuisineForm(false);
  };

  const showUsersHandler = () => {
    setShowUsers(true);
    setShowCuisines(false);
    setShowSpices(false);
    setEditingSpice(null);
    setEditingCuisine(null);
    setShowAddSpiceForm(false);
    setShowAddCuisineForm(false);
  };

  /* DELETE */
  const deleteSpice = async (id) => {
    try {
      await facade.fetchData(`/spices/spice/${id}`, "DELETE");
      setSpices(spices.filter((spice) => spice.id !== id));
    } catch (error) {
      console.error("Failed to delete spice:", error);
    }
  };

  const deleteCuisine = async (id) => {
    try {
      await facade.fetchData(`/cuisines/cuisine/${id}`, "DELETE");
      setCuisines(cuisines.filter((cuisine) => cuisine.id !== id));
    } catch (error) {
      console.error("Failed to delete cuisine:", error);
    }
  };


  const deleteUser = async (id) => {
    try {
      await api.users.delete(id, true);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  /* EDIT */
  const startEditingSpice = (spice) => {
    setEditingSpice({ ...spice });
    setShowAddSpiceForm(false);
  };

  const startEditingCuisine = (cuisine) => {
    setEditingCuisine({ ...cuisine });
    setShowAddCuisineForm(false);
  };

  const handleSpiceChange = (event) => {
    setEditingSpice({
      ...editingSpice,
      [event.target.name]: event.target.value,
    });
  };

  const handleCuisineChange = (event) => {
    setEditingCuisine({
      ...editingCuisine,
      [event.target.name]: event.target.value,
    });
  };

  const saveSpiceChanges = async () => {
    await api.spices.update(editingSpice.id, editingSpice, true);
    setSpices(
      spices.map((spice) =>
        spice.id === editingSpice.id ? editingSpice : spice
      )
    );
    setEditingSpice(null);
  };

  const saveCuisineChanges = async () => {
    await api.cuisines.update(editingCuisine.id, editingCuisine, true);
    setCuisines(
      cuisines.map((cuisine) =>
        cuisine.id === editingCuisine.id ? editingCuisine : cuisine
      )
    );
    setEditingCuisine(null);
  };

  /* CREATE */
  const toggleAddSpiceForm = () => {
    setShowAddSpiceForm((prev) => !prev);
    setEditingSpice(false);
  };
  const toggleAddCuisineForm = () => {
    setShowAddCuisineForm((prev) => !prev);
    setEditingCuisine(false);
  };

  const handleInputChange = (event, setState) => {
    const { name, value } = event.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const createSpice = async () => {
    try {
      console.log("creating new spice:", newSpice); //debug
      const createdSpice = await api.spices.create(newSpice, true);
      setSpices([...spices, createdSpice]);
      setNewSpice({ name: "", description: "", flavor_profile: "" });
      setShowAddSpiceForm(false);
    } catch (error) {
      console.error("Failed to create spice:", error);
    }
  };

  const createCuisine = async () => {
    try {
      console.log("creating new cuisine:", newCuisine); //debug
      const createdCuisine = await api.cuisines.create(newCuisine, true);
      setCuisines([...cuisines, createdCuisine]);
      setNewCuisine({ name: "", description: "", flavor_profile: "" });
      setShowAddCuisineForm(false);
    } catch (error) {
      console.error("Failed to create cuisine:", error);
    }
  };

  return (
    <>
      <h1>Admin Page</h1>
      {/* CUISINES */}
      <button onClick={showCuisineHandler}>Show Cuisine</button>
      {showCuisines && (
        <>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Flavor Profile</th>
              </tr>
            </thead>
            <tbody>
              {cuisines.map((cuisine) => (
                <tr key={cuisine.id}>
                  <td>{cuisine.name}</td>
                  <td>{cuisine.description}</td>
                  <td>{cuisine.flavor_profile}</td>
                  <td>
                    <button onClick={() => startEditingCuisine(cuisine)}>
                      Edit
                    </button>
                    <button onClick={() => deleteCuisine(cuisine.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <button onClick={toggleAddCuisineForm}>Add Cuisine</button>
          </div>
        </>
      )}
      {editingCuisine && (
        <div>
          <h2>Edit Cuisine</h2>
          <input
            type="text"
            name="name"
            value={editingCuisine.name}
            onChange={handleCuisineChange}
            placeholder="Name"
          />
          <input
            type="text"
            name="description"
            value={editingCuisine.description}
            onChange={handleCuisineChange}
            placeholder="Description"
          />
          <input
            type="text"
            name="flavor_profile"
            value={editingCuisine.flavor_profile}
            onChange={handleCuisineChange}
            placeholder="Flavor Profile"
          />
          <button onClick={saveCuisineChanges}>Save Changes</button>
          <button onClick={() => setEditingCuisine(null)}>Cancel</button>
        </div>
      )}
      {/* Add Cuisine */}
      {showAddCuisineForm && (
        <div>
          <h2>Add New Cuisine</h2>
          <input
            type="text"
            name="name"
            value={newCuisine.name}
            onChange={(event) => handleInputChange(event, setNewCuisine)}
            placeholder="Name"
          />
          <input
            type="text"
            name="description"
            value={newCuisine.description}
            onChange={(event) => handleInputChange(event, setNewCuisine)}
            placeholder="Description"
          />
          <input
            type="text"
            name="flavor_profile"
            value={newCuisine.flavor_profile}
            onChange={(event) => handleInputChange(event, setNewCuisine)}
            placeholder="Flavor Profile"
          />
          <button onClick={createCuisine}>Save Cuisine</button>
          <button onClick={() => setShowAddCuisineForm(null)}>Cancel</button>
        </div>
      )}
      {/* SPICES */}
      <button onClick={showSpiceHandler}>Show Spices</button>
      {showSpices && (
        <>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Flavor Profile</th>
              </tr>
            </thead>
            <tbody>
              {spices.map((spice) => (
                <tr key={spice.id}>
                  <td>{spice.name}</td>
                  <td>{spice.description}</td>
                  <td>{spice.flavor_profile}</td>
                  <td>
                    <button onClick={() => startEditingSpice(spice)}>
                      Edit
                    </button>
                    <button onClick={() => deleteSpice(spice.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <button onClick={toggleAddSpiceForm}>Add Spice</button>
          </div>
        </>
      )}
      {editingSpice && (
        <div>
          <h2>Edit Spice</h2>
          <input
            type="text"
            name="name"
            value={editingSpice.name}
            onChange={handleSpiceChange}
            placeholder="Name"
          />
          <input
            type="text"
            name="description"
            value={editingSpice.description}
            onChange={handleSpiceChange}
            placeholder="Description"
          />
          <input
            type="text"
            name="flavor_profile"
            value={editingSpice.flavor_profile}
            onChange={handleSpiceChange}
            placeholder="Flavor Profile"
          />
          <button onClick={saveSpiceChanges}>Save Changes</button>
          <button onClick={() => setEditingSpice(null)}>Cancel</button>
        </div>
      )}
      {/* Add Spice */}
      {showAddSpiceForm && (
        <div>
          <h2>Add New Spice</h2>
          <input
            type="text"
            name="name"
            value={newSpice.name}
            onChange={(e) => handleInputChange(e, setNewSpice)}
            placeholder="Name"
          />
          <input
            type="text"
            name="description"
            value={newSpice.description}
            onChange={(e) => handleInputChange(e, setNewSpice)}
            placeholder="Description"
          />
          <input
            type="text"
            name="flavor_profile"
            value={newSpice.flavor_profile}
            onChange={(e) => handleInputChange(e, setNewSpice)}
            placeholder="Flavor Profile"
          />
          <button onClick={createSpice}>Save Spice</button>
          <button onClick={() => setShowAddSpiceForm(null)}>Cancel</button>
        </div>
      )}
      {/* USERS */}
      <button onClick={showUsersHandler}>Show Users</button>
      {showUsers && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => deleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default AdminPage;
