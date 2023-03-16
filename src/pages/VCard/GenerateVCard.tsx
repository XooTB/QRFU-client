import React from "react";
import { Typography } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { CreateCardForm } from "components";

const GenerateVCard = () => {
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
  } = useForm();
  return (
    <div className="w-full">
      <Typography className="text-3xl font-bold text-black">
        Create a new Card
      </Typography>
      <div className="w-full flex flex-row flex-1 justify-between gap-4 pt-5 sm:flex-col xl:flex-row">
        <div className="flex flex-col flex-1 w-3/5 sm:w-full bg-white rounded-2xl">
          <Typography className="text-3xl font-bold text-black p-5">
            V Card Info
          </Typography>
          {<CreateCardForm />}
        </div>
        <div className="flex flex-col w-2/5 bg-white rounded-2xl">
          <Typography className="text-2xl font-semibold text-black">
            Preview
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default GenerateVCard;
