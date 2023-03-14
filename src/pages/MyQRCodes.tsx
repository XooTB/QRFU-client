import React from "react";
import { Typography, Box, Stack, Button } from "@pankod/refine-mui";
import { CustomButton } from "components";
import { AddOutlined } from "@mui/icons-material";
import { useNavigate } from "@pankod/refine-react-router-v6";

const MyQRCodes = () => {
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate("/QR-Code/create");
  };
  return (
    <div className="w-full">
      <Box className="w-full h-20 flex justify-between">
        <Typography className="text-3xl font-bold text-black font-sans">
          My QR Codes
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

export default MyQRCodes;
