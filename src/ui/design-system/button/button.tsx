import clsx from "clsx";

interface ButtonProps {
  children: React.ReactNode;
  size?: "small" | "medium" | "large" | "larger";
}

export const Button = ({ children, size = "medium" }: ButtonProps) => {
  let sizeClasses: string = "";
  switch (size) {
    case "small":
      sizeClasses = "px-3 py-1.5 text-xs font-medium";
      break;
    case "medium":
      sizeClasses = "px-4 py-2 text-sm";
      break;
    case "large":
      sizeClasses = "px-6 py-3 text-lg";
      break;
    case "larger":
      sizeClasses = "px-8 py-4 text-xl";
      break;
  }
  return (
    <div className={clsx(sizeClasses, "bg-[#6366F1] text-white rounded")}>
      {children}
    </div>
  );
};
