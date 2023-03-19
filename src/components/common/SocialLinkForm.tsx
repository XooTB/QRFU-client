import React, { ReactEventHandler, SyntheticEvent, useState } from "react";
import { FormControl, Select, MenuItem, TextField } from "@mui/material";
import { Add } from "@mui/icons-material";
import CustomButton from "./CustomButton";
import { useForm } from "@refinedev/react-hook-form";

interface socialLinkProps {
  setSocialLinks: React.Dispatch<React.SetStateAction<any>>;
  socialLinks: { platform: string; url: string }[];
}

const SocialLinkForm = ({ setSocialLinks, socialLinks }: socialLinkProps) => {
  const [platform, setPlatform] = useState("facebook");
  const [url, setUrl] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleClick = () => {
    setError(false);

    if (!url || !platform) {
      setError(true);
      setErrorMessage("URL cannot be empty!");
      return;
    }

    if (!(socialLinks.filter((e) => e.url === url).length > 0)) {
      const newArray = [...socialLinks, { platform, url }];
      setSocialLinks(newArray);
    } else {
      setError(true);
      setErrorMessage("Link already added!");
    }
  };

  return (
    <div className="flex flex-row flex-1 items-center">
      <FormControl className="">
        <Select
          id="Social media"
          //@ts-ignore
          onChange={(e) => {
            setPlatform(e.target.value);
          }}
          defaultValue="facebook"
          className="w-40 m-5"
        >
          <MenuItem value="facebook">Facebook</MenuItem>
          <MenuItem value="twitter">Twitter</MenuItem>
          <MenuItem value="instagram">Instagram</MenuItem>
          <MenuItem value="github">Github</MenuItem>
          <MenuItem value="linkedin">LinkedIn</MenuItem>
          <MenuItem value="telegram">Telegram</MenuItem>
        </Select>
      </FormControl>
      <FormControl className="m-5 ml-1 w-60">
        <TextField
          id="url"
          label="URL"
          type="url"
          variant="outlined"
          onChange={(e) => {
            setUrl(e.target.value);
          }}
          required
        />
      </FormControl>
      <CustomButton
        type="add"
        text="Add"
        icon={<Add />}
        handleClick={handleClick}
        className="bg-green"
      />
      {error && (
        <p className="ml-5 text-blue font-semibold text-lg">{errorMessage}</p>
      )}
    </div>
  );
};

export default SocialLinkForm;
