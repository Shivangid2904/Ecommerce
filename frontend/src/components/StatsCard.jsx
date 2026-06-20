import React from "react";

const StatsCard = ({ title, count, icon }) => {
  return (
    <div className="stat-card">
      <h3>
        {icon} {title}
      </h3>
      <p>{count}</p>
    </div>
  );
};

export default StatsCard;