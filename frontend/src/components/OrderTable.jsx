import React, { useEffect, useState } from "react";
import {
  orderAPI,
  userAPI,
  productAPI,
} from "../services/api";

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
const [products, setProducts] = useState([]);

const [editingId, setEditingId] =
  useState(null);

const [formData, setFormData] =
  useState({
    userId: "",
    productId: "",
    quantity: 1,
    totalAmount: 0,
    status: "Pending",
  });

  useEffect(() => {
  fetchOrders();
  fetchUsers();
  fetchProducts();
}, []);

  const fetchOrders = async () => {
    try {
      const response = await orderAPI.getAll();
      setOrders(response.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };
  const fetchUsers = async () => {
  try {
    const response =
      await userAPI.getAll();

    setUsers(response.data);
  } catch (err) {
    console.error(err);
  }
};

const fetchProducts = async () => {
  try {
    const response =
      await productAPI.getAll();

    setProducts(response.data);
  } catch (err) {
    console.error(err);
  }
};

const handleChange = (e) => {
  const { name, value } = e.target;

  let updatedForm = {
    ...formData,
    [name]: value,
  };

  const selectedProduct = products.find(
    (product) =>
      product._id ===
      (name === "productId"
        ? value
        : updatedForm.productId)
  );

  if (selectedProduct) {
    updatedForm.totalAmount =
      selectedProduct.price *
      Number(updatedForm.quantity || 1);
  }

  setFormData(updatedForm);
};
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const orderData = {
      userId: formData.userId,
      products: [
        {
          productId:
            formData.productId,
          quantity: Number(
            formData.quantity
          ),
        },
      ],
      totalAmount: Number(
        formData.totalAmount
      ),
      status: formData.status,
    };

    const response =
      await orderAPI.create(
        orderData
      );

    setOrders([
      ...orders,
      response.data,
    ]);

    setFormData({
      userId: "",
      productId: "",
      quantity: 1,
      totalAmount: 0,
      status: "Pending",
    });

    setError("");
  } catch (err) {
    console.error(err);
    setError(
      "Failed to create order"
    );
  }
};

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this order?"
    );

    if (!confirmDelete) return;

    try {
      await orderAPI.delete(id);

      setOrders(
        orders.filter(
          (order) => order._id !== id
        )
      );
    } catch (err) {
      console.error(err);
      setError("Failed to delete order");
    }
  };

  const handleStatusUpdate = async (
    id,
    status
  ) => {
    try {
      await orderAPI.update(id, {
        status,
      });

      setOrders(
        orders.map((order) =>
          order._id === id
            ? { ...order, status }
            : order
        )
      );
    } catch (err) {
      console.error(err);
      setError("Failed to update order");
    }
  };

  if (loading)
    return (
      <div className="table-container">
        <p className="loading">
          📦 Loading orders...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="table-container">
        <p className="error">{error}</p>
      </div>
    );

  return (
    <div className="table-container">
      <div className="section-header">
        <form
  className="user-form"
  onSubmit={handleSubmit}
>
  <select
    name="userId"
    value={formData.userId}
    onChange={handleChange}
    required
  >
    <option value="">
      Select User
    </option>

    {users.map((user) => (
      <option
        key={user._id}
        value={user._id}
      >
        {user.name}
      </option>
    ))}
  </select>

  <select
    name="productId"
    value={formData.productId}
    onChange={handleChange}
    required
  >
    <option value="">
      Select Product
    </option>

    {products.map((product) => (
      <option
        key={product._id}
        value={product._id}
      >
        {product.name}
      </option>
    ))}
  </select>

  <input
    type="number"
    name="quantity"
    placeholder="Quantity"
    min="1"
    value={formData.quantity}
    onChange={handleChange}
  />

  <input
  type="number"
  name="totalAmount"
  placeholder="Total Amount"
  value={formData.totalAmount}
  readOnly
/>

  <select
    name="status"
    value={formData.status}
    onChange={handleChange}
  >
    <option value="Pending">
      Pending
    </option>

    <option value="Processing">
      Processing
    </option>

    <option value="Shipped">
      Shipped
    </option>

    <option value="Delivered">
      Delivered
    </option>
  </select>

  <button type="submit">
    Add Order
  </button>
</form>
        <h2>📦 Orders</h2>

        <span className="count-badge">
          {orders.length} Order
          {orders.length !== 1 ? "s" : ""}
        </span>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Products</th>
            <th>Total</th>
            <th>Status</th>
            <th>Created</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order._id}>
                <td>
                  {order._id.slice(0, 6)}...
                </td>

                <td>
                  {typeof order.userId ===
                  "object"
                    ? order.userId.name
                    : order.userId?.slice(
                        0,
                        6
                      )}
                </td>

                <td>
  {order.products?.map((item) => (
    <div key={item.productId?._id}>
      {item.productId?.name} × {item.quantity}
    </div>
  ))}
</td>

                <td>
                  ₹
                  {Number(
                    order.totalAmount
                  ).toLocaleString()}
                </td>

                <td>
                  <select
                    className={`status-select status-${order.status?.toLowerCase()}`}
                    value={order.status}
                    onChange={(e) =>
                      handleStatusUpdate(
                        order._id,
                        e.target.value
                      )
                    }
                  >
                    <option value="Pending">
                      Pending
                    </option>

                    <option value="Processing">
                      Processing
                    </option>

                    <option value="Shipped">
                      Shipped
                    </option>

                    <option value="Delivered">
                      Delivered
                    </option>
                  </select>
                </td>

                <td>
                  {new Date(
                    order.createdAt
                  ).toLocaleDateString()}
                </td>

                <td>
                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleDelete(
                        order._id
                      )
                    }
                  >
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">
                <div className="empty-state">
                  🎀 No orders found
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;