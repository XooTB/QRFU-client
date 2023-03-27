import { atom } from "jotai";

export const formPreviewAtom = atom({
  name: "",
  email: "",
  phone_number: "",
  address: "",
  company: "",
  position: "",
  profileImage: "",
  socialLinks: [
    {
      platform: "",
      url: "",
    },
  ],
  summary: "",
  website: "",
});

export const editFormPreviewAtom = atom({
  name: "",
  email: "",
  phone_number: "",
  address: "",
  company: "",
  position: "",
  profileImage: "",
  socialLinks: [
    {
      platform: "",
      url: "",
    },
  ],
  summary: "",
  website: "",
});
