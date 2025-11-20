import { InputHTMLAttributes } from "react";
import { IMedia } from ".";
import { TextFieldProps } from "@mui/material";

export interface Props {
  isOptional?: boolean;
  name: string;
  label: string;
  error?: string;
  multiple?: boolean;
  disabled?: boolean;
  files: IMedia.FileData[];
  onChange: (files: (IMedia.FileData | File)[]) => void;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  extraProps?: ExtraProps;
  onError?: (error: string) => void;
  size?: TextFieldProps["size"];
  getLocalizedText?: (text: string, params?: Record<string, any>) => string;
}

interface ExtraProps {
  maxFileSize: number;
  supportedFiles: SupportedFileTypes[];
  uploadOptions: uploadOptionType[];
  count?: boolean;
  onUploadFile?: (
    file: File,
    onUploadProgress: (progress: number) => void
  ) => Promise<string>;
  onDeleteFile?: (id: number) => Promise<void>;
  onSubmit?: () => Promise<void>;
  autoFocus?: boolean;
}

export type SupportedFileTypes =
  | "*"
  | "image/*"
  | "image/jpeg"
  | "image/png"
  | "image/gif"
  | "image/webp"
  | "video/*"
  | "video/mp4"
  | "video/webm"
  | "audio/*"
  | "audio/mpeg"
  | "audio/wav"
  | "application/pdf"
  | "application/msword" // .doc
  | "application/vnd.openxmlformats-officedocument.wordprocessingml.document" // .docx
  | "application/vnd.ms-excel" // .xls
  | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" // .xlsx
  | "application/vnd.ms-powerpoint" // .ppt
  | "application/vnd.openxmlformats-officedocument.presentationml.presentation" // .pptx
  | "text/plain";

export type uploadOptionType = "camera" | "gallery";

export type UploadOption = Omit<Props, "files">;

export interface ITabGroup {
  _key?: string;
  label: string;
}
