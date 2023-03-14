import React from "react";
import { Typography } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";

const GenerateVCard = () => {
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
  } = useForm();
  return (
    <div>
      <Typography className="text-3xl font-bold text-black">
        Create a new Card
      </Typography>
      <div className="flex flex-col w-3/5 bg-white rounded-2xl"></div>
      <div className="flex flex-col w-2/5 bg-white rounded-2xl"></div>
    </div>
  );
};

export default GenerateVCard;
