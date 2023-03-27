import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useForm } from "@refinedev/react-hook-form";
import { EditCardForm } from "components";
import { useGetIdentity } from "@refinedev/core";
import { FieldValues } from "react-hook-form";
import { useState, useEffect } from "react";
import { CardPreview } from "components";
import { useAtom } from "jotai";
import { editFormPreviewAtom } from "../../atoms/formAtom";

const EditVCard = () => {
  const { data: user } = useGetIdentity<{
    id: number;
    fullName: string;
    email: string;
    name: string;
  }>();
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
  } = useForm();

  const { id } = useParams();
  const [profileImage, setProfileImage] = useState({ name: "", url: "" });
  const [socialLinks, setSocialLinks] = useState([]);

  const [editFormPreviewData, setEditFormPreviewData] =
    useAtom(editFormPreviewAtom);

  const onSubmitHandler = async (data: FieldValues) => {
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

  useEffect(() => {
    const getData = async () => {
      await fetch(`${import.meta.env.VITE_API}/cards/${id}`)
        .then((data) => data.json())
        .then((card) => {
          setProfileImage({ name: "profile Image", url: card.profileImage });
          setEditFormPreviewData({ ...card });
          setSocialLinks(card.socialLinks);
        });
    };
    getData();
  }, []);

  const handleImageChange = (file: File) => {
    const reader = (readFile: File) =>
      new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result as string);
        fileReader.readAsDataURL(readFile);
      });

    reader(file).then((result: string) => {
      const newFormPrevieData = { ...editFormPreviewData };
      newFormPrevieData.profileImage = result;
      setEditFormPreviewData(newFormPrevieData);
      setProfileImage({ name: file?.name, url: result });
    });
  };

  return (
    <div className="flex flex-row">
      <div className="w-3/4">
        <EditCardForm
          register={register}
          formLoading={formLoading}
          handleSubmit={handleSubmit}
          handleImageChange={handleImageChange}
          onSubmitHandler={onSubmitHandler}
        />
      </div>
      <div className="w-2/5 bg-white rounded-xl">
        <CardPreview formPreviewData={editFormPreviewData} />
      </div>
    </div>
  );
};

export default EditVCard;
