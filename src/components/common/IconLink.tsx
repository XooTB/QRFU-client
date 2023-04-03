import React from "react";
import { iconLinkProps } from "interfaces/common";
import {
  Facebook,
  Twitter,
  GitHub,
  Instagram,
  Telegram,
  LinkedIn,
} from "@mui/icons-material";

const IconLink = ({ platform, url }: iconLinkProps) => {
  const icon = (platform: string) => {
    switch (platform) {
      case "facebook":
        return <Facebook className="w-14 h-14 text-[#0F90F3]" />;
      case "twitter":
        return <Twitter className="w-14 h-14 text-[#1D9BF0]" />;
      case "github":
        return <GitHub className="w-14 h-14 text-black" />;
      case "instagram":
        return <Instagram className="w-14 h-14 text-[#8C4DB8]" />;
      case "telegram":
        return <Telegram className="w-14 h-14 text-[#27A3E2]" />;
      case "linkedin":
        return <LinkedIn className="w-14 h-14 text-[#0A66C2]" />;
    }
  };
  return (
    <a href={url} target="_blank" className="py-5 px-3">
      {icon(platform)}
    </a>
  );
};

export default IconLink;
