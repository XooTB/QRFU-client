import React from "react";
import { phone } from "../../assets";
import { Typography } from "@mui/material";
// import { vCardinfo as cardInfo } from "constants/vCardInfo";
import CustomIconButton from "components/common/CustomIconButton";
import InfoCard from "./InfoCard";
import { formPreviewAtom } from "atoms/formAtom";
import { useAtom } from "jotai";
import {
  Call,
  EmailOutlined,
  Place,
  Language,
  Work,
} from "@mui/icons-material";
import { formPreviewProps } from "interfaces/form";

const CardPreview = ({ formPreviewData }: formPreviewProps) => {
  const cardInfo = formPreviewData;

  return (
    <div>
      <div className="w-full p-5 rounded">
        <div className="w-full bg-green h-auto flex flex-col items-center">
          <img
            src={cardInfo.profileImage}
            alt="profile_image"
            className="h-28 w-28 rounded-full mt-6"
          />
          <Typography className="text-xl text-white font-semibold p-5 pb-2">
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
          <div className="flex justify-center text-sm mt-10 border-b mx-10 border-gray pb-10">
            <Typography className="text-black text-lg font-normal">
              {cardInfo.summary}
            </Typography>
          </div>
          <div className="flex justify-start items-center flex-col w-full">
            <InfoCard
              icon={<Call className="text-black h-10 w-10" />}
              info={cardInfo.phone_number}
              text="Phone"
              className="xl:w-full"
            />
            <InfoCard
              icon={<EmailOutlined className="text-black h-10 w-10" />}
              info={cardInfo.email}
              text="Email"
              className="xl:w-full"
            />
            <InfoCard
              icon={<Place className="text-black h-10 w-10" />}
              info={cardInfo.address}
              text="Address"
              className="xl:w-full"
            />
            <InfoCard
              icon={<Language className="text-black h-10 w-10" />}
              info={cardInfo.website}
              text="Website"
              className="xl:w-full"
            />
            <InfoCard
              icon={<Work className="text-black h-10 w-10" />}
              info={cardInfo.company}
              text={cardInfo.position}
              className="xl:w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPreview;
