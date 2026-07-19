import React from "react";
import { NavLink } from "react-router-dom";

const OrderNavbar = () => {
  const navItems = [
    { name: "Orders", path: "/Allorder" },
    { name: "Pending", path: "/pending" },
    { name: "Accepted", path: "/accept" },
    { name: "Assigned", path: "/assign" },
    { name: "Pickup", path: "/pickup" },
    { name: "Delivered", path: "/delivered" },
    { name: "Cancelled", path: "/cancelled" },
  ];

  return (
    <div className="bg-white shadow rounded-lg my-3 p-3 overflow-x-auto">
      <div className="flex gap-3 min-w-max">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? "bg-indigo-600 text-white shadow"
                  : "bg-gray-100 text-gray-700 hover:bg-indigo-100 hover:text-indigo-600"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default OrderNavbar;