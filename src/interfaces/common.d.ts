import { ReactComponentElement } from "react";

export interface buttonProps {
  type: string;
  text: string;
  handleClick: () => void;
  icon: ReactComponentElement;
}
