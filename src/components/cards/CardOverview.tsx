import React from "react";
import { cardOverviewProps } from "interfaces/common";
import { qrcode } from "assets";
import { Button, Icon, Typography } from "@mui/material";
import CustomButton from "components/common/CustomButton";
import { Edit, Download, QrCode } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useNavigation } from "@refinedev/core";
import { QRCode } from "react-qrcode-logo";

const CardOverview = ({ cardInfo }: cardOverviewProps) => {
  const { edit } = useNavigation();

  const handleEdit = () => {
    edit("cards", cardInfo.url);
  };

  const handleDownload = () => {
    const qrCodeCanvas = document.getElementById(
      cardInfo.url
    ) as HTMLCanvasElement;
    const link = document.createElement("a");
    link.href = qrCodeCanvas.toDataURL();
    link.download = "qrcode.png";
    link.click();
  };

  return (
    <div className="flex flex-row m-5 bg-white p-5 rounded-lg gap-5">
      <div className="flex flex-row gap-5 w-2/5 border-r-gray border-r">
        <div className="rounded-xl bg-black">
          <QRCode
            value={`${import.meta.env.VITE_DOMAIN}/p/${cardInfo.url}`}
            size={100}
            quietZone={10}
            qrStyle="squares"
            eyeRadius={[
              [10, 10, 0, 10], // top/left eye
              [10, 10, 10, 0], // top/right eye
              [10, 0, 10, 10], // bottom/left
            ]}
            id={cardInfo.url}
          />
        </div>
        <Typography className="text-2xl font-bold text-black pl-3 pt-2">
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
          handleClick={() => {
            handleDownload();
          }}
          icon={<Download />}
          className="gap-3 p-5"
        />
      </div>
    </div>
  );
};

export default CardOverview;
