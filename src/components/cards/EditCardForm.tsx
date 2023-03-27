import React, { useState } from "react";
import { useAtom } from "jotai";
import { editFormPreviewAtom } from "atoms/formAtom";
import { editCardFormProps } from "interfaces/form";
import { Controller } from "react-hook-form";

// Components Imports
import {
  TextField,
  FormControl,
  Typography,
  Button,
  TextareaAutosize,
} from "@mui/material";
import { CropOriginal } from "@mui/icons-material";
import CustomButton from "components/common/CustomButton";

const EditCardForm = ({
  register,
  formLoading,
  handleSubmit,
  handleImageChange,
  // socialLinks,
  // setSocialLinks,
  onSubmitHandler,
}: editCardFormProps) => {
  //
  //
  //
  const [editFromPreviewData, setEditFormPreviewData] =
    useAtom(editFormPreviewAtom);

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    propertyName: string
  ) => {
    const newFormData = { ...editFromPreviewData };
    //@ts-ignore
    newFormData[propertyName] = e.target.value;

    setEditFormPreviewData(newFormData);
  };

  if (formLoading) {
    return <div>Loading</div>;
  }
  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <div>
        <FormControl className="w-full p-6">
          <Typography className="text-base font-semibold text-black pb-5">
            Card Name
          </Typography>
          <TextField
            id="standard-basic"
            label="Give the Card a name"
            variant="outlined"
            {...register("cardName", { required: true })}
            fullWidth
            required
          />
        </FormControl>
        <FormControl className="w-full p-6">
          <Typography className="text-base font-semibold text-black pb-5">
            Your Name
          </Typography>
          <TextField
            id="standard-basic"
            label="Your Name"
            variant="outlined"
            {...register("name", { required: true })}
            onChange={(e) => handleChange(e, "name")}
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
              onChange={(e) => {
                // @ts-ignore
                handleImageChange(e.target.files[0]);
              }}
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
            {...register("phone_number", { required: true })}
            onChange={(e) => handleChange(e, "phone_number")}
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
            {...register("email", { required: true })}
            sx={{
              width: "40%",
            }}
            onChange={(e) => handleChange(e, "email")}
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
            {...register("website", { required: false })}
            sx={{
              width: "40%",
            }}
            onChange={(e) => handleChange(e, "website")}
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
            {...register("address", { required: true })}
            onChange={(e) => handleChange(e, "address")}
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
            {...register("company", { required: true })}
            onChange={(e) => handleChange(e, "company")}
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
            {...register("position", { required: true })}
            onChange={(e) => handleChange(e, "position")}
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
            {...register("summary", { required: true })}
            onChange={(e) => handleChange(e, "summary")}
          />
        </FormControl>
      </div>
      {/* <div className="w-full mt-10">
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
        </div> */}
      <div className="flex justify-center w-full">
        <CustomButton
          type="submit"
          text={formLoading ? "submitting" : "submit"}
          handleClick={() => {}}
          icon=""
          className=" w-3/4 py-7 p-10 mb-10 mt-12"
        />
      </div>
    </form>
  );
};

export default EditCardForm;
