import React from "react";
import { cardOverviewProps } from "interfaces/common";
import { qrcode } from "assets";
import { Icon, Typography } from "@mui/material";
import CustomButton from "components/common/CustomButton";
import { Edit, Download } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useNavigation } from "@refinedev/core";

const CardOverview = ({ cardInfo }: cardOverviewProps) => {
  const { edit } = useNavigation();

  const handleEdit = () => {
    edit("cards", cardInfo.url);
  };

  return (
    <div className="flex flex-row m-5 bg-white p-5 rounded-lg gap-5">
      <div className="flex flex-row gap-5 w-2/5 border-r-gray border-r">
        <div>
          <img src={qrcode} alt="qr-code" className="h-20 w-20" />
        </div>
        <Typography className="text-2xl font-bold text-black pl-3">
          {cardInfo.cardName}
        </Typography>
      </div>
      <div className="flex flex-col gap-2 w-1/5">
        <Typography className="text-black text-lg font-semibold">
          Card Link
        </Typography>
        <Typography className="text-green hover:text-blue font-semibold">
          <Link to={`/p/${cardInfo.url}`}>
            {`${import.meta.env.VITE_DOMAIN}/p/${cardInfo.url}`}
          </Link>
        </Typography>
      </div>
      <div className="w-1/5 flex items-center gap-3">
        <CustomButton
          type="edit"
          text="Edit"
          handleClick={handleEdit}
          icon={<Edit />}
          className="gap-3 p-5"
        />
        <CustomButton
          type="download"
          text="Download"
          handleClick={() => {}}
          icon={<Download />}
          className="gap-3 p-5"
        />
      </div>
    </div>
  );
};

export default CardOverview;
