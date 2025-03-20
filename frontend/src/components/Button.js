import React from "react";

const Button = ({ text, onClick }) => {
  return (
    <button 
      onClick={onClick} 
      className="bg-accent text-black px-4 py-2 rounded-lg hover:bg-yellow-500 transition duration-300">
      {text}
    </button>
  );
};

export default Button;

