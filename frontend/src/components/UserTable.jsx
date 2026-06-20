import React, { useEffect, useState } from "react";
import { userAPI } from "../services/api";

const UserTable = () => {
const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

const [editingId, setEditingId] = useState(null);

const [formData, setFormData] = useState({
name: "",
email: "",
phone: "",
address: "",
});

useEffect(() => {
fetchUsers();
}, []);

const fetchUsers = async () => {
try {
const response = await userAPI.getAll();
setUsers(response.data);
setError("");
} catch (err) {
console.error(err);
setError("Failed to fetch users");
} finally {
setLoading(false);
}
};

const handleChange = (e) => {
setFormData({
...formData,
[e.target.name]: e.target.value,
});
};

const handleSubmit = async (e) => {
e.preventDefault();

```
try {
  if (editingId) {
    await userAPI.update(editingId, formData);

    setUsers(
      users.map((user) =>
        user._id === editingId
          ? { ...user, ...formData }
          : user
      )
    );

    setEditingId(null);
  } else {
    const response =
      await userAPI.create(formData);

    setUsers([...users, response.data]);
  }

  setFormData({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
} catch (err) {
  console.error(err);
  setError("Operation failed");
}
```

};

const handleEdit = (user) => {
setEditingId(user._id);

```
setFormData({
  name: user.name,
  email: user.email,
  phone: user.phone,
  address: user.address,
});
```

};

const handleDelete = async (id) => {
const confirmDelete = window.confirm(
"Delete this user?"
);

```
if (!confirmDelete) return;

try {
  await userAPI.delete(id);

  setUsers(
    users.filter(
      (user) => user._id !== id
    )
  );
} catch (err) {
  console.error(err);
  setError("Failed to delete user");
}
```

};

if (loading) {
return ( <div className="table-container"> <p>Loading users...</p> </div>
);
}

return ( <div className="table-container"> <div className="section-header"> <h2>👩 Users</h2>

```
    <span className="count-badge">
      {users.length} Users
    </span>
  </div>

  {error && (
    <p className="error">{error}</p>
  )}

  <form
    className="user-form"
    onSubmit={handleSubmit}
  >
    <input
      type="text"
      name="name"
      placeholder="Name"
      value={formData.name}
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
      name="phone"
      placeholder="Phone"
      value={formData.phone}
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="address"
      placeholder="Address"
      value={formData.address}
      onChange={handleChange}
      required
    />

    <button type="submit">
      {editingId
        ? "Update User"
        : "Add User"}
    </button>
  </form>

  <table className="data-table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Address</th>
        <th>Created</th>
        <th>Actions</th>
      </tr>
    </thead>

    <tbody>
      {users.map((user) => (
        <tr key={user._id}>
          <td>
            {user._id.slice(0, 6)}...
          </td>

          <td>{user.name}</td>

          <td>{user.email}</td>

          <td>{user.phone}</td>

          <td>{user.address}</td>

          <td>
            {new Date(
              user.createdAt
            ).toLocaleDateString()}
          </td>

          <td>
            <button
              className="edit-btn"
              onClick={() =>
                handleEdit(user)
              }
            >
              ✏️ Edit
            </button>

            <button
              className="delete-btn"
              onClick={() =>
                handleDelete(
                  user._id
                )
              }
            >
              🗑 Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


);
};

export default UserTable;
