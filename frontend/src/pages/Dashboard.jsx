import React, { useEffect, useState } from "react";
import StatsCard from "../components/StatsCard";
import {
  userAPI,
  productAPI,
  orderAPI,
} from "../services/api";

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    orders: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const usersRes = await userAPI.getAll();
      const productsRes = await productAPI.getAll();
      const ordersRes = await orderAPI.getAll();

      setStats({
        users: usersRes.data.length,
        products: productsRes.data.length,
        orders: ordersRes.data.length,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="hero-card">
        <div>
          <h1>🎀 Pastel Commerce Dashboard</h1>

          <p>
            Manage Users, Products and Orders
            in one place ✨
          </p>
        </div>

        <div className="hero-emoji">
          🛍💜
        </div>
      </div>

      <section className="stats-section">
        <StatsCard
          title="Users"
          count={stats.users}
          icon="👩"
        />

        <StatsCard
          title="Products"
          count={stats.products}
          icon="🛍"
        />

        <StatsCard
          title="Orders"
          count={stats.orders}
          icon="📦"
        />
      </section>
    </>
  );
};

export default Dashboard;