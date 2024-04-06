import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
}

const CommonButton: React.FC<ButtonProps> = ({
  variant = "primary",
  className,
  ...rest
}) => {
  let buttonClass = "focus:outline-none focus:shadow-outline";

  switch (variant) {
    case "secondary":
      buttonClass += " bg-indigo-300 text-indigo-700 hover:bg-indigo-400";
      break;
    case "danger":
      buttonClass += " bg-purple-400 text-white hover:bg-purple-600";
      break;
    default:
      buttonClass += " bg-indigo-500 text-white hover:bg-indigo-600";
      break;
  }

  return (
    <button
      className={`${buttonClass} sm:px-2 sm:py-1 md:px-2 md:py-1  lg:px-4 lg:py-2 rounded-md ${className}`}
      {...rest}
    >
      {rest.children}
    </button>
  );
};

export default CommonButton;
