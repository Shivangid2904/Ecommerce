import React, { useEffect, useState } from "react";
import { productAPI } from "../services/api";

const ProductTable = () => {
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

const [editingId, setEditingId] = useState(null);

const [formData, setFormData] = useState({
name: "",
description: "",
price: "",
stock: "",
category: "",
});

useEffect(() => {
fetchProducts();
}, []);

const fetchProducts = async () => {
try {
const response = await productAPI.getAll();
setProducts(response.data);
setError("");
} catch (err) {
console.error(err);
setError("Failed to fetch products");
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

  try {
    if (editingId) {
      await productAPI.update(editingId, {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
      });

      setProducts(
        products.map((product) =>
          product._id === editingId
            ? {
                ...product,
                ...formData,
              }
            : product
        )
      );

      setEditingId(null);
    } else {
      const response = await productAPI.create({
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
      });

      setProducts([
        ...products,
        response.data,
      ]);
    }

    setFormData({
      name: "",
      description: "",
      price: "",
      stock: "",
      category: "",
    });
  } catch (err) {
    console.error(err);
    setError("Operation failed");
  }
};


const handleEdit = (product) => {
setEditingId(product._id);


setFormData({
  name: product.name,
  description:
    product.description,
  price: product.price,
  stock: product.stock,
  category: product.category,
});


};

const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Delete this product?"
  );

  if (!confirmDelete) return;

  try {
    await productAPI.delete(id);

    setProducts(
      products.filter(
        (product) =>
          product._id !== id
      )
    );
  } catch (err) {
    console.error(err);
    setError(
      "Failed to delete product"
    );
  }
};

if (loading) {
return ( <div className="table-container"> <p>Loading products...</p> </div>
);
}

return ( <div className="table-container"> <div className="section-header"> <h2>🛍 Products</h2>

```
    <span className="count-badge">
      {products.length} Products
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
      placeholder="Product Name"
      value={formData.name}
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="description"
      placeholder="Description"
      value={formData.description}
      onChange={handleChange}
      required
    />

    <input
      type="number"
      name="price"
      placeholder="Price"
      value={formData.price}
      onChange={handleChange}
      required
    />

    <input
      type="number"
      name="stock"
      placeholder="Stock"
      value={formData.stock}
      onChange={handleChange}
      required
    />

    <input
      type="text"
      name="category"
      placeholder="Category"
      value={formData.category}
      onChange={handleChange}
      required
    />

    <button type="submit">
      {editingId
        ? "Update Product"
        : "Add Product"}
    </button>
  </form>

  <table className="data-table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Description</th>
        <th>Price</th>
        <th>Stock</th>
        <th>Category</th>
        <th>Created</th>
        <th>Actions</th>
      </tr>
    </thead>

    <tbody>
      {products.map((product) => (
        <tr key={product._id}>
          <td>
            {product._id.slice(0, 6)}
            ...
          </td>

          <td>{product.name}</td>

          <td>
            {product.description}
          </td>

          <td>
            ₹
            {Number(
              product.price
            ).toLocaleString()}
          </td>

          <td>
            {product.stock}
          </td>

          <td>
            {product.category}
          </td>

          <td>
            {new Date(
              product.createdAt
            ).toLocaleDateString()}
          </td>

          <td>
            <button
              className="edit-btn"
              onClick={() =>
                handleEdit(
                  product
                )
              }
            >
              ✏️ Edit
            </button>

            <button
              className="delete-btn"
              onClick={() =>
                handleDelete(
                  product._id
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

export default ProductTable;
