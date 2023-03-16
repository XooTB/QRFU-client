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
