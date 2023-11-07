import React from "react";
import { Link } from "react-router-dom"; // Ensure you have react-router-dom installed

const Sidebar = () => {
  return (
    <div className="fixed h-full bg-black text-white p-4 left-0 top-0">
      <h2 className="text-2xl font-bold mb-4">Navigation</h2>
      <ul>
        <li className="mb-2">
          <Link to="/" className="text-blue-300 hover:text-blue-500">
            Home
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/gallery" className="text-blue-300 hover:text-blue-500">
            Gallery
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/create" className="text-blue-300 hover:text-blue-500">
            Create a Crew Mate
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
