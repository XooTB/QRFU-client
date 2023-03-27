import React from "react";
import { Typography } from "@mui/material";
import { socialLinkProps } from "interfaces/common";
import {
  Facebook,
  Twitter,
  Instagram,
  GitHub,
  LinkedIn,
  Telegram,
  Remove,
} from "@mui/icons-material";
import CustomButton from "./CustomButton";

const platformIcons = {
  facebook: <Facebook className="h-10 w-10 text-blue" />,
  twitter: <Twitter className="h-10 w-10 text-blue" />,
  instagram: <Instagram className="h-10 w-10 text-blue" />,
  github: <GitHub className="h-10 w-10 text-blue" />,
  linkedin: <LinkedIn className="h-10 w-10 text-blue" />,
  telegram: <Telegram className="h-10 w-10 text-blue" />,
};

const SocialLink = ({ platform, url, handleDelete }: socialLinkProps) => {
  return (
    <div className="flex flex-row ml-10 flex-1 items-center">
      <Typography className="m-5">{platformIcons[platform]}</Typography>
      <Typography className="m-5 w-60 text-black overflow-hidden">
        {url}
      </Typography>
      <CustomButton
        type="delete"
        text="remove"
        //@ts-ignore
        handleClick={() => {
          handleDelete(url);
        }}
        icon={<Remove />}
        className="bg-red"
      />
    </div>
  );
};

export default SocialLink;
