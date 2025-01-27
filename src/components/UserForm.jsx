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
