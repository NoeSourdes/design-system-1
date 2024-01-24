"use client";

import clsx from "clsx";
import { useState } from "react";

interface ButtonProps {
  children: React.ReactNode;
  size?: "small" | "medium" | "large" | "larger";
  type?:
    | "primary"
    | "secondary"
    | "ghost"
    | "link"
    | "tertiary"
    | "success"
    | "danger"
    | "warning";
  hover?: boolean;
  disabled?: boolean;
  loading?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const Button = ({
  children,
  size = "medium",
  type = "primary",
  hover = true,
  disabled = false,
  loading = false,
  onClick,
}: ButtonProps) => {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number }>>([]);

  let sizeClasses: string = "";
  let hoverClasses: string = "";
  let typeClasses: string = "";
  let hoverTypeClasses: string = "";
  let disabledClasses: string = "";
  let svgClasses: string = "";
  let svgClasses2: string = "";
  const clickClasses = "transform active:scale-95 transition-all";
  switch (size) {
    case "small":
      sizeClasses = "px-3 py-1.5 text-xs font-medium";
      break;
    case "medium":
      sizeClasses = "px-4 py-2 text-sm";
      break;
    case "large":
      sizeClasses = "px-6 py-3 text-base";
      break;
    case "larger":
      sizeClasses = "px-8 py-4 text-lg";
      break;
  }

  switch (type) {
    case "primary":
      typeClasses = "bg-[#6366F1] text-[#EEF2FF] text-white";
      hoverTypeClasses = "hover:bg-[#4338CA] transition-all duration-200";
      disabledClasses = "bg-[#A5B4FC] text-[#E0E7FF]";
      svgClasses = "text-[#E0E7FF]";
      svgClasses2 = "#E0E7FF";
      break;
    case "secondary":
      typeClasses = "bg-[#E0E7FF] text-[#6366F1]";
      hoverTypeClasses =
        "hover:bg-[#A5B4FC] hover:text-[#312E81] transition-all duration-200";
      disabledClasses = "bg-[#EEF2FF] text-[#A5B4FC]";
      svgClasses = "text-[#A5B4FC]";
      svgClasses2 = "#A5B4FC";
      break;
    case "ghost":
      typeClasses = "bg-transparent text-[#6366F1]";
      break;
    case "link":
      typeClasses = "bg-transparent text-[#6366F1]";
      break;
    case "tertiary":
      typeClasses = "border border-[#CBD5E1] text-[#09090B]";
      hoverTypeClasses =
        "hover:bg-[#F1F5F9] hover:text-[#09090B] transition-all duration-200";
      disabledClasses = "text-[#CBD5E1] border border-[#CBD5E1]";
      svgClasses = "text-[#CBD5E1]";
      svgClasses2 = "#CBD5E1";
      break;
    case "success":
      typeClasses = "border border-[#6EE7B7] bg-[#ECFDF5] text-[#047857]";
      hoverTypeClasses =
        "hover:bg-[#D1FAE5] hover:text-[#047857] transition-all duration-200";
      disabledClasses = "text-[#6EE7B7] bg-[#ECFDF5] border border-[#6EE7B7]";
      svgClasses = "text-[#6EE7B7]";
      svgClasses2 = "#6EE7B7";
      break;
    case "danger":
      typeClasses = "border border-[#FCA5A5] bg-[#FEF2F2] text-[#B91C1D]";
      hoverTypeClasses =
        "hover:bg-[#FEE2E2] hover:text-[#B91C1D] transition-all duration-200";
      disabledClasses = "text-[#FCA5A5] bg-[#FEF2F2] border border-[#FCA5A5]";
      svgClasses = "text-[#FCA5A5]";
      svgClasses2 = "#FCA5A5";
      break;
    case "warning":
      typeClasses = "border border-[#FDBA74] bg-[#FFF7ED] text-[#C2410C]";
      hoverTypeClasses =
        "hover:bg-[#FFEDD5] hover:text-[#C2410C] transition-all duration-200";
      disabledClasses = "text-[#FDBA74] bg-[#FFF7ED] border border-[#FDBA74]";
      svgClasses = "text-[#FDBA74]";
      svgClasses2 = "#FDBA74";
      break;
  }

  if (hover) {
    hoverClasses = hoverTypeClasses;
  }

  if (disabled) {
    return (
      <div
        className={clsx(
          sizeClasses,
          disabledClasses,
          "rounded cursor-not-allowed"
        )}
      >
        {children}
      </div>
    );
  }

  if (loading) {
    return (
      <div
        className={clsx(
          sizeClasses,
          disabledClasses,
          "rounded cursor-not-allowed flex items-center justify-center"
        )}
      >
        <svg
          className={clsx(svgClasses, "animate-spin -ml-1 mr-3 h-5 w-5")}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke={svgClasses2}
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill={svgClasses2}
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          ></path>
        </svg>
        {children}
      </div>
    );
  }

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { clientX, clientY } = event;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    setRipples((oldRipples) => [...oldRipples, { x, y }]);
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <div
      className={clsx(
        sizeClasses,
        typeClasses,
        hoverClasses,
        clickClasses,
        "rounded cursor-pointer transition relative overflow-hidden"
      )}
      onClick={handleClick}
    >
      {ripples.map((ripple, index) => (
        <span
          key={index}
          className="ripple"
          style={{
            left: `calc(${ripple.x}px - 10px)`,
            top: `calc(${ripple.y}px - 10px)`,
          }}
        />
      ))}
      {children}
    </div>
  );
};
