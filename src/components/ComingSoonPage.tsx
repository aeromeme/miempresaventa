import React from "react";

interface ComingSoonPageProps {
  title: string;
}

const ComingSoonPage: React.FC<ComingSoonPageProps> = ({ title }) => {
  return (
    <div className="text-center p-6">
      <h2 className="text-2xl text-600">{title}</h2>
      <p className="text-500">Esta página estará disponible próximamente</p>
    </div>
  );
};

export default ComingSoonPage;