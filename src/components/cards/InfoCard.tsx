import React from "react";
import { infoCardProps } from "interfaces/common";
import { Typography } from "@mui/material";

const InfoCard = ({ icon, info, text, className }: infoCardProps) => {
  return (
    <div
      className={`flex gap-10 items-center border-b border-gray py-10 px-10 sm:w-full xl:w-2/5 ${className}`}
    >
      {icon}
      <div className="flex flex-col ">
        <Typography className="text-black text-xl font-semibold">
          {info}
        </Typography>
        <Typography className="text-black-100 text-base font-medium pt-2">
          {text ? text : ""}
        </Typography>
      </div>
    </div>
  );
};

export default InfoCard;
