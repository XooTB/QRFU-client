import { ReactComponentElement } from "react";

export interface buttonProps {
  type: string;
  text: string;
  handleClick: () => void;
  icon: ReactComponentElement;
  className?: string;
}

export interface socialLinkProps {
  platform:
    | "facebook"
    | "twitter"
    | "instagram"
    | "github"
    | "linkedin"
    | "telegram";
  url: string;
  handleDelete: (url: string) => void;
}

export interface customIconButtonProps {
  icon: ReactComponentElement;
  text: string;
  bg?: string;
  type: string;
  info: string;
}

export interface infoCardProps {
  icon: ReactComponentElement;
  info: string;
  text?: string;
  className?: string;
}

export interface cardOverviewProps {
  cardInfo: {
    cardName: string;
    url: string;
  };
}

export interface iconLinkProps {
  platform: string;
  url: string;
}
