import React, { ReactEventHandler, useState } from "react";
import { Typography } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { FieldValues } from "react-hook-form";
import { CreateCardForm, CardPreview } from "components";
import { useGetIdentity } from "@refinedev/core";
import { ConstructionOutlined } from "@mui/icons-material";
import { useAtom } from "jotai";
import { formPreviewAtom } from "atoms/formAtom";

const GenerateVCard = () => {
  const [formPreviewData, setFormPreviewData] = useAtom(formPreviewAtom);

  const { data: user } = useGetIdentity<{
    id: number;
    fullName: string;
    email: string;
    name: string;
  }>();

  const [profileImage, setProfileImage] = useState({ name: "", url: "" });
  const [socialLinks, setSocialLinks] = useState([]);

  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
  } = useForm({
    refineCoreProps: {
      action: "create",
    },
  });

  const handleImageChange = (file: File) => {
    const reader = (readFile: File) =>
      new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result as string);
        fileReader.readAsDataURL(readFile);
      });

    reader(file).then((result: string) => {
      const newFormPrevieData = { ...formPreviewData };
      newFormPrevieData.profileImage = result;
      setFormPreviewData(newFormPrevieData);
      setProfileImage({ name: file?.name, url: result });
    });
  };

  const onSubmitHandler = async (data: FieldValues) => {
    if (!profileImage.name) return alert("Please select a profile image");

    console.log({
      ...data,
      profileImage: profileImage.url,
      user: {
        email: user?.email,
        name: user?.name,
      },
      socialLinks,
    });

    await onFinish({
      ...data,
      profileImage: profileImage.url,
      user: {
        email: user?.email,
        name: user?.name,
      },
      socialLinks,
    });
  };

  return (
    <div className="w-full">
      <Typography className="text-3xl font-bold text-black">
        Create a new Card
      </Typography>
      <div className="w-full flex flex-row flex-1 justify-between gap-4 pt-5 sm:flex-col xl:flex-row">
        <div className="flex flex-col flex-1 w-3/5 sm:w-full bg-white rounded-2xl">
          <Typography className="text-3xl font-bold text-black p-5">
            V Card Info
          </Typography>
          {
            <CreateCardForm
              register={register}
              onFinish={onFinish}
              formLoading={formLoading}
              handleSubmit={handleSubmit}
              onSubmitHandler={onSubmitHandler}
              handleImageChange={handleImageChange}
              socialLinks={socialLinks}
              setSocialLinks={setSocialLinks}
            />
          }
        </div>
        <div className="flex flex-col w-2/5 bg-white rounded-2xl">
          <Typography className="text-2xl font-semibold text-black text-center pt-5 capitalize">
            Preview
          </Typography>
          <div>
            <CardPreview formPreviewData={formPreviewData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateVCard;
