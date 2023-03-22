import React from "react";
import { Typography } from "@mui/material";
import { vCardinfo as cardInfo } from "constants/vCardInfo";
import { CustomIconButton, InfoCard } from "components";
import {
  Call,
  EmailOutlined,
  Place,
  Work,
  Language,
} from "@mui/icons-material";

const CardProfile = () => {
  return (
    <div className="w-full bg-white">
      <div className="w-full bg-green h-auto flex flex-col items-center">
        <img
          src={cardInfo.profileImage}
          alt="profile_image"
          className="h-36 w-36 rounded-full p-5 mt-5"
        />
        <Typography className="text-3xl text-white font-semibold p-5 pb-2">
          {cardInfo.name}
        </Typography>
        <Typography className="text-white text-xl font-normal ">
          {cardInfo.position}
        </Typography>
        <div className="flex flex-row">
          <CustomIconButton
            icon={<Call className="text-white" />}
            text="Call"
            type="phone"
            info={cardInfo.phone_number}
          />
          <CustomIconButton
            icon={<EmailOutlined className="text-white" />}
            text="Email"
            type="email"
            info={cardInfo.email}
          />
          <CustomIconButton
            icon={<EmailOutlined className="text-white" />}
            text="Email"
            type="email"
            info={cardInfo.email}
          />
        </div>
      </div>
      <div className="w-full bg-white">
        <div className="flex justify-center sm:mx-0 lg:mx-30 xl:mx-60 mt-10 border-b border-gray pb-10">
          <Typography className="text-black text-lg font-normal">
            {cardInfo.summary}
          </Typography>
        </div>
        <div className="flex justify-start items-center flex-col w-full">
          <InfoCard
            icon={<Call className="text-black h-10 w-10" />}
            info={cardInfo.phone_number}
            text="Phone"
          />
          <InfoCard
            icon={<EmailOutlined className="text-black h-10 w-10" />}
            info={cardInfo.email}
            text="Email"
          />
          <InfoCard
            icon={<Place className="text-black h-10 w-10" />}
            info={cardInfo.address}
            text="Address"
          />
          <InfoCard
            icon={<Language className="text-black h-10 w-10" />}
            info={cardInfo.website}
            text="Website"
          />
          <InfoCard
            icon={<Work className="text-black h-10 w-10" />}
            info={cardInfo.company}
            text={cardInfo.position}
          />
        </div>
      </div>
    </div>
  );
};

export default CardProfile;
