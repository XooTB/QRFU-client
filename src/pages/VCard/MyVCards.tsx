import React from "react";
import { Typography, Box, Stack, Button } from "@mui/material";
import { CustomButton } from "components";
import { AddOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const MyVCards = () => {
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate("/cards/create");
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
      <Stack>
        <Typography>Codes</Typography>
      </Stack>
    </div>
  );
};

export default MyVCards;
