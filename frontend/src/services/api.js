const API_BASE_URL = "http://localhost:5001/api";

async function request(path, options = {}) {
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    });

    const text = await res.text();

    let data = null;

    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = text;
    }

    return {
      data,
      status: res.status,
    };
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

// ==================== USERS ====================

export const userAPI = {
  getAll: () => request("/users"),

  getById: (id) =>
    request(`/users/${id}`),

  create: (data) =>
    request("/users", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id, data) =>
    request(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (id) =>
    request(`/users/${id}`, {
      method: "DELETE",
    }),
};

// ==================== PRODUCTS ====================

export const productAPI = {
  getAll: () => request("/products"),

  getById: (id) =>
    request(`/products/${id}`),

  create: (data) =>
    request("/products", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id, data) =>
    request(`/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (id) =>
    request(`/products/${id}`, {
      method: "DELETE",
    }),
};

// ==================== ORDERS ====================

export const orderAPI = {
  getAll: () => request("/orders"),

  getById: (id) =>
    request(`/orders/${id}`),

  create: (data) =>
    request("/orders", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id, data) =>
    request(`/orders/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (id) =>
    request(`/orders/${id}`, {
      method: "DELETE",
    }),
};

export default {
  userAPI,
  productAPI,
  orderAPI,
};