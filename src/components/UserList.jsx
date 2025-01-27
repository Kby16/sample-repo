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
