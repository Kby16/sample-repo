{// import React, { useState } from "react";
// import { addUser, updateUser } from "../sevices/api.js";

// const UserForm = ({ user, onSave, onCancel }) => {
//   const [formData, setFormData] = useState(
//     user || { name: "", email: "", department: "" }
//   );
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (user) {
//         await updateUser(user.id, formData);
//       } else {
//         await addUser(formData);
//       }
//       onSave();
//     } catch {
//       setError("Failed to save user");
//     }
//   };

//   return (
//     <div>
//       <h2>{user ? "Edit User" : "Add User"}</h2>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           placeholder="Name"
//         />
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           placeholder="Email"
//         />
//         <input
//           type="text"
//           name="department"
//           value={formData.department}
//           onChange={handleChange}
//           placeholder="Department"
//         />
//         <button type="submit">Save</button>
//         <button type="button" onClick={onCancel}>
//           Cancel
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UserForm;


// import React, { useState } from "react";

// const UserForm = ({ user, onSave, onCancel }) => {
//   const [formData, setFormData] = useState(
//     user || { name: "", email: "", department: "" }
//   );

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave(formData); // Send the form data back to the parent
//   };

//   return (
//     <div>
//       <h2>{user ? "Edit User" : "Add User"}</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           placeholder="Name"
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           placeholder="Email"
//           required
//         />
//         <input
//           type="text"
//           name="department"
//           value={formData.department}
//           onChange={handleChange}
//           placeholder="Department"
//           required
//         />
//         <button type="submit">Save</button>
//         <button type="button" onClick={onCancel}>
//           Cancel
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UserForm;
}


import React, { useState, useEffect } from "react";

const UserForm = ({ onSubmit, onCancel, editingUser }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    username: "",
    email: "",
    website: "",
  });

  useEffect(() => {
    if (editingUser) {
      setFormData({
        id: editingUser.id || "",
        name: editingUser.name || "",
        username: editingUser.username || "",
        email: editingUser.email || "",
        website: editingUser.website || "",
      });
    } else {
      setFormData({
        id: "",
        name: "",
        username: "",
        email: "",
        website: "",
      });
    }
  }, [editingUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // onSubmit(editingUser?.id || null, formData);
    if (editingUser) {
      onSubmit(editingUser.id, formData); // Update user
    } else {
      onSubmit(formData); // Add new user (no id needed)
    }
    setFormData({
      id: "",
      name: "",
      username: "",
      email: "",
      website: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="username"
        placeholder="Userame"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="website"
        placeholder="Website"
        value={formData.website}
        onChange={handleChange}
        required
      />
      <button type="submit">{editingUser ? "Update" : "Add"} User</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default UserForm;
