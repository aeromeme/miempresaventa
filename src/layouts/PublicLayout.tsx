import React from "react";
import { Outlet } from "react-router-dom";

const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-blue-50">
      <Outlet />
    </div>
  );
};

export default PublicLayout;
