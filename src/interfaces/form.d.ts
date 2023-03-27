export interface vCardFormProps {
  register: UseFormRegister<FieldValues>;
  onFinish: (
    values: FieldValues
  ) => Promise<void | CreateResponse<BaseRecord> | UpdateResponse<BaseRecord>>;
  formLoading: boolean;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  handleImageChange: (file: File) => void;
  socialLinks: never[];
  setSocialLinks: React.Dispatch<React.SetStateAction<never[]>>;
  onSubmitHandler: (data: FieldValues) => Promise<void>;
}

export interface editCardFormProps {
  register: UseFormRegister<FieldValues>;
  onFinish?: (
    values: FieldValues
  ) => Promise<void | CreateResponse<BaseRecord> | UpdateResponse<BaseRecord>>;
  formLoading: boolean;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  handleImageChange: (file: File) => void;
  socialLinks?: never[];
  setSocialLinks?: React.Dispatch<React.SetStateAction<never[]>>;
  onSubmitHandler: (data: FieldValues) => Promise<void>;
}

export interface formPreviewProps {
  formPreviewData: {
    name: string;
    email: string;
    phone_number: string;
    address: string;
    company: string;
    position: string;
    profileImage: string;
    socialLinks: {
      platform: string;
      url: string;
    }[];
    summary: string;
    website: string;
  };
}
