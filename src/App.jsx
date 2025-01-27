{ // import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

// import React, { useState } from "react";
// import UserList from "./components/UserList";
// import UserForm from "./components/UserForm";

// const App = () => {
//   const [isFormVisible, setFormVisible] = useState(false);
//   const [editingUser, setEditingUser] = useState(null);

//   const handleAdd = () => {
//     setEditingUser(null);
//     setFormVisible(true);
//   };

//   const handleEdit = (user) => {
//     setEditingUser(user);
//     setFormVisible(true);
//   };

//   const handleSave = () => {
//     setFormVisible(false);
//   };

//   return (
//     <div>
//       {isFormVisible ? (
//         <UserForm
//           user={editingUser}
//           onSave={handleSave}
//           onCancel={() => setFormVisible(false)}
//         />
//       ) : (
//         <UserList onAdd={handleAdd} onEdit={handleEdit} />
//       )}
//     </div>
//   );
// };

// export default App;
}


{// import React, { useState, useEffect } from "react";
// import UserList from "./components/UserList";
// import UserForm from "./components/UserForm";
// import { fetchUsers } from "./services/api";

// const App = () => {
//   const [users, setUsers] = useState([]);
//   const [isFormVisible, setFormVisible] = useState(false);
//   const [editingUser, setEditingUser] = useState(null);

//   // Load users on mount
//   useEffect(() => {
//     const loadUsers = async () => {
//       try {
//         const data = await fetchUsers();
//         setUsers(data);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       }
//     };
//     loadUsers();
//   }, []);

//   const handleAdd = () => {
//     setEditingUser(null);
//     setFormVisible(true);
//   };

//   const handleEdit = (user) => {
//     setEditingUser(user);
//     setFormVisible(true);
//   };

//   const handleSave = (user) => {
//     if (editingUser) {
//       // Edit existing user
//       setUsers((prev) =>
//         prev.map((u) => (u.id === editingUser.id ? user : u))
//       );
//     } else {
//       // Add new user
//       setUsers((prev) => [...prev, { ...user, id: prev.length + 1 }]); // Simulating a new ID
//     }
//     setFormVisible(false);
//   };

//   const handleDelete = (id) => {
//     setUsers((prev) => prev.filter((user) => user.id !== id));
//   };

//   return (
//     <div>
//       {isFormVisible ? (
//         <UserForm
//           user={editingUser}
//           onSave={handleSave}
//           onCancel={() => setFormVisible(false)}
//         />
//       ) : (
//         <UserList users={users} onAdd={handleAdd} onEdit={handleEdit} onDelete={handleDelete} />
//       )}
//     </div>
//   );
// };

// export default App;
}

import React, { useState, useEffect } from "react";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";

const App = () => {
  const [users, setUsers] = useState([]);
  const [isFormVisible, setFormVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [error, setError] = useState("");

  // Fetch users from JSONPlaceholder
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) throw new Error("Failed to fetch users.");
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchUsers();
  }, []);

  //Add User

  const addUser = async (newUser) => {
    try {
      const formattedUser = {
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
        website: newUser.website,
      };
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedUser),
      });
      // console.log(response);
      
      if (!response.ok) throw new Error("Failed to add user.");
      const data = await response.json();
      const newUserWithId = {...data, id: Date.now()}
      setUsers((prev) => [...prev, newUserWithId]);
      // setUsers((prev) => [...prev,data]);
      setFormVisible(false);
    } catch (err) {
      setError(err.message);
    }
  };

  // Update user
  const updateUser = async (id, updatedUser) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });
      if (!response.ok) throw new Error("Failed to update user.");
      const data = await response.json();
      setUsers((prev) =>
        prev.map((user) => (user.id === id ? { ...user, ...data } : user))
      );
      setEditingUser(null);
      setFormVisible(false);
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete user.");
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>User Management Dashboard</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <UserList
        users={users}
        onEdit={(user) => {
          setEditingUser(user);
          setFormVisible(true);
        }}
        onDelete={deleteUser}
      />
      {isFormVisible && (
        <UserForm
          onSubmit={editingUser ? updateUser : addUser}
          onCancel={() => setFormVisible(false)}
          editingUser={editingUser}
        />
      )}
      {!isFormVisible && (
        <button onClick={() => setFormVisible(true)}>Add User</button>
      )}
    </div>
  );
};

export default App;
