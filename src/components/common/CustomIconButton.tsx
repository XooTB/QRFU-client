import React from "react";
import { customIconButtonProps } from "interfaces/common";
import { Typography } from "@mui/material";

const CustomIconButton = ({
  icon,
  text,
  bg,
  info,
  type,
}: customIconButtonProps) => {
  const handleLinking = (type: string) => {
    if (type === "phone") {
      return `tel:${info}`;
    }
    if (type === "email") {
      return `mailto:${info}`;
    }
    return "#";
  };

  return (
    <div className="flex flex-col justify-center items-center p-5">
      <a href={handleLinking(type)}>
        <div className="h-14 w-14 bg-blue rounded-lg flex items-center justify-center">
          {icon}
        </div>
      </a>
      <Typography className="p-3 text-white font-medium capitalize">
        {text}
      </Typography>
    </div>
  );
};

export default CustomIconButton;
