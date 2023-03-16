import { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  FormLabel,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Button,
  TextareaAutosize,
} from "@mui/material";
import { CropOriginal, Add } from "@mui/icons-material";
import { SocialLinkForm, CustomButton, SocialLink } from "components";
import { socialLinkProps } from "interfaces/common";

const CreateCardForm = ({}) => {
  const [socialLinks, setSocialLinks] = useState([]);

  const handleImageChange = () => {};
  const handleDelete = (url: string) => {
    setSocialLinks(
      socialLinks.filter((link: socialLinkProps) => link.url !== url)
    );
  };

  return (
    <div className="w-full">
      <form>
        <div>
          <FormControl className="w-full p-6">
            <TextField
              id="standard-basic"
              label="Your Name"
              variant="outlined"
              fullWidth
              required
            />
          </FormControl>
          <FormControl>
            <Typography className="text-base font-medium text-black p-5">
              Image
            </Typography>
            <Button
              className="w-40 h-40 border-solid border-black border-2 ml-5"
              component="label"
            >
              <CropOriginal
                sx={{
                  width: "140px",
                  height: "140px",
                  color: "black",
                }}
              />
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
            </Button>
          </FormControl>
        </div>
        <div>
          <Typography className="text-xl font-semibold text-black p-5">
            Contact info
          </Typography>
          <FormControl className="flex flex-row mt-5 gap-5 ml-5 items-center">
            <Typography className="text-lg w-20 text-black font-medium">
              Phone:{" "}
            </Typography>
            <TextField
              id="phone"
              label="Phone Number"
              type="number"
              variant="outlined"
              required
              sx={{
                width: "40%",
              }}
            />
          </FormControl>
          <FormControl className="flex flex-row mt-5 gap-5 ml-5 items-center">
            <Typography className="text-lg w-20 text-black font-medium">
              Email:{" "}
            </Typography>
            <TextField
              id="email"
              label="Email"
              type="email"
              variant="outlined"
              sx={{
                width: "40%",
              }}
            />
          </FormControl>
          <FormControl className="flex flex-row mt-5 gap-5 ml-5 items-center">
            <Typography className="text-lg w-20 text-black font-medium">
              Website:{" "}
            </Typography>
            <TextField
              id="website"
              label="Website"
              type="website"
              variant="outlined"
              sx={{
                width: "40%",
              }}
            />
          </FormControl>
        </div>
        <div className="mt-10 w-full">
          <Typography className="text-2xl font-semibold text-black pl-5">
            Address
          </Typography>
          <FormControl className="w-full p-7">
            <Typography className="text-black text-base font-medium pb-5">
              Enter your full Address
            </Typography>
            <TextField
              id="address"
              label="Address"
              type="text"
              variant="outlined"
              fullWidth
              required
            />
          </FormControl>
        </div>
        <div className="mt-10 w-full">
          <Typography className="text-2xl font-semibold text-black pl-5">
            Company
          </Typography>
          <FormControl className="w-1/2 p-7">
            <Typography className="text-black text-base font-medium pb-5">
              Company Name
            </Typography>
            <TextField
              id="company"
              label="Company"
              type="text"
              variant="outlined"
              required
            />
          </FormControl>
          <FormControl className="w-1/2 p-7">
            <Typography className="text-black text-base font-medium pb-5">
              Position
            </Typography>
            <TextField
              id="position"
              label="Position"
              type="text"
              variant="outlined"
              required
            />
          </FormControl>
          <FormControl className="w-full p-7">
            <Typography className="text-black text-base font-medium pb-5">
              Summary
            </Typography>
            <TextareaAutosize
              id="summary"
              minRows={5}
              className="border-2 border-black border-solid rounded-xl p-4"
              placeholder="Enter a short and concise summary"
            />
          </FormControl>
        </div>
        <div className="w-full mt-10">
          <Typography className="text-2xl font-semibold text-black pl-5">
            Social Networks
          </Typography>
          <div className="mt-5">
            {socialLinks &&
              socialLinks.map((link: socialLinkProps, i) => (
                <SocialLink
                  key={i}
                  platform={link.platform}
                  url={link.url}
                  handleDelete={handleDelete}
                />
              ))}
          </div>
          <div className="w-full flex flex-row mt-5 ml-10">
            {
              <SocialLinkForm
                socialLinks={socialLinks}
                setSocialLinks={setSocialLinks}
              />
            }
          </div>
        </div>
        <div className="flex justify-center w-full">
          <CustomButton
            type="submit"
            text="submit"
            handleClick={() => {}}
            icon=""
            className=" w-3/4 py-7 p-10 mb-10 mt-12"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateCardForm;
