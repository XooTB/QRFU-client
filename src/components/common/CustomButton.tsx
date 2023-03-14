import React from "react";
import { Box, Stack, Button } from "@mui/material";
import { buttonProps } from "interfaces/common";

const CustomButton = ({ type, text, handleClick, icon }: buttonProps) => {
  return (
    <Button
      type={type === "submit" ? "submit" : "button"}
      className="bg-blue hover:bg-gray text-white p-5 hover:text-black rounded-xl h-8"
      onClick={handleClick}
    >
      {icon}
      {text}
    </Button>
  );
};

export default CustomButton;
