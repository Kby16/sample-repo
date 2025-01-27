{// import React, { useEffect, useState } from "react";
// import { fetchUsers, deleteUser } from "../sevices/api";

// const UserList = ({ onEdit, onAdd }) => {
//   const [users, setUsers] = useState([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const loadUsers = async () => {
//       try {
//         const data = await fetchUsers();
//         setUsers(data);
//       } catch (err) {
//         setError("Failed to fetch users");
//       }
//     };
//     loadUsers();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       await deleteUser(id);
//       setUsers(users.filter((user) => user.id !== id));
//     } catch {
//       setError("Failed to delete user");
//     }
//   };

//   return (
//     <div>
//       <h2>User List</h2>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       <button onClick={onAdd}>Add User</button>
//       <ul>
//         {users.map((user) => (
//           <li key={user.id}>
//             {user.id}. {user.name} - {user.email}
//             <button onClick={() => onEdit(user)}>Edit</button>
//             <button onClick={() => handleDelete(user.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default UserList;


// import React from "react";

// const UserList = ({ users, onAdd, onEdit, onDelete }) => {
//   return (
//     <div>
//       <h2>User List</h2>
//       <button onClick={onAdd}>Add User</button>
//       <ul>
//         {users.map((user) => (
//           <li key={user.id}>
//             {user.id}. {user.name} - {user.email}
//             <button onClick={() => onEdit(user)}>Edit</button>
//             <button onClick={() => onDelete(user.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default UserList;
}


import React from "react";

const UserList = ({ users, onEdit, onDelete }) => {
  return (
    <table border="1" style={{ width: "100%", textAlign: "left" }}>
      <thead>
        <tr>
          <th>ID</th>
          <th> Name</th>
          <th> Userame</th>
          <th>Email</th>
          <th>Website</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name || "N/A"}</td>
            <td>{user.username || "N/A"}</td>
            <td>{user.email || "N/A"}</td>
            <td>{user.website || "N/A"}</td>
            <td>
              <button onClick={() => onEdit(user)}>Edit</button>
              <button onClick={() => onDelete(user.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserList;
