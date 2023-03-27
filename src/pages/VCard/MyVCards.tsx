import React from "react";
import { Typography, Box, Stack, Button } from "@mui/material";
import { CustomButton } from "components";
import { AddOutlined } from "@mui/icons-material";
import { useNavigation, useList, useGetIdentity } from "@refinedev/core";
import { CardOverview } from "components";

const MyVCards = () => {
  const user = useGetIdentity();
  const { create } = useNavigation();
  const { data, isLoading, isError } = useList({
    resource: "cards",
  });

  const cards = data?.data ?? [];

  const handleCreate = () => {
    create("cards");
  };

  return (
    <div className="w-full">
      <Box className="w-full h-20 flex justify-between">
        <Typography className="text-3xl font-bold text-black font-sans">
          My Cards
        </Typography>
        <CustomButton
          type="create"
          text="Create a QR Code"
          handleClick={handleCreate}
          icon={<AddOutlined />}
        />
      </Box>
      <div className="w-full border border-gray border-solid min-h-[300px] rounded-lg">
        <div>
          {cards.map((card) => {
            const cardInfo = {
              cardName: card.cardName,
              url: card.url,
            };
            return <CardOverview cardInfo={cardInfo} key={card._id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default MyVCards;
