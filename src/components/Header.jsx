import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
  return (
    <div className="h-16 bg-gray-600 flex items-center justify-center">
      <button className="font-bold text-white text-2xl cursor-pointer" onClick={()=>navigate("/")}>Famazon.in</button>
    </div>
  );
};

export default Header;
