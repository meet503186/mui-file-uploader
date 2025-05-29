import { TextFieldProps } from "@mui/material";
import { InputHTMLAttributes } from "react";

export namespace IFileUploader {
  export type fileType =
    | string
    | {
        fileUrl: string;
        fileType: string;
        fileName: string;
        fileSize: number;
        filePath: string;
      }
    | File;

  export interface Props {
    isOptional?: boolean;
    name: string;
    label: string;
    error?: string;
    multiple?: boolean;
    disabled?: boolean;
    images: fileType[];
    onChange: (images: fileType[]) => void;
    inputProps?: InputHTMLAttributes<HTMLInputElement>;
    extraProps?: ExtraProps;
    onError?: (error: string) => void;
    size?: TextFieldProps["size"];
    count?: boolean;
    hideDoneButton?: boolean;
    onUploadFile?: (
      file: File,
      onUploadProgress: (progress: number) => void
    ) => Promise<string>;
    onDeleteFile?: (file: File) => Promise<string>;
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
