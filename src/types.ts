import { TextFieldProps } from "@mui/material";
import { InputHTMLAttributes } from "react";

export namespace IFileUploader {
  export interface Props {
    isOptional?: boolean;
    name: string;
    label: string;
    error?: string;
    multiple?: boolean;
    disabled?: boolean;
    images: (string | File)[];
    onChange: (images: (File | string)[]) => void;
    inputProps?: InputHTMLAttributes<HTMLInputElement>;
    extraProps?: ExtraProps;
    onError?: (error: string) => void;
    size?: TextFieldProps["size"];
    count?: boolean;
    hideDoneButton?: boolean;
  }

  interface ExtraProps {
    maxFileSize: number;
    supportedFiles: supportedFileTypes[];
    uploadOptions: uploadOptionType[];
  }

  export type supportedFileTypes = "image/*" | "image/jpeg" | "image/png";

  export type uploadOptionType = "camera" | "gallery";

  export type UploadOption = Omit<Props, "images">;

  export interface ITabGroup {
    _key?: string;
    label: string;
  }
}
