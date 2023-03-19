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
