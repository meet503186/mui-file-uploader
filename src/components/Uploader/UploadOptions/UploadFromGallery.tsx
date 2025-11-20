import { Typography } from "@mui/material";

import { IFileUploader } from "../../../types";
import { filterFilesByMaxSize, handleA11yKeyDown } from "../../../utils";
import { useMemo } from "react";
import { CloudUploadIcon } from "../../../assets/icons/IconRegistery";

const UploadFromGallery = ({
  name,
  multiple = false,
  onChange,
  disabled,
  extraProps,
  inputProps,
  onError,
  getLocalizedText,
}: IFileUploader.UploadOption) => {
  const { maxFileSize = 5, supportedFiles = ["*"] } = extraProps || {};

  const supportedFilesString = useMemo(() => {
    if (supportedFiles.includes("*")) {
      return (
        getLocalizedText?.("allFileTypesSupported") ||
        "All file types are supported"
      );
    }

    const friendlyTypesMap: Record<string, string> = {
      "image/*": "images",
      "video/*": "videos",
      "audio/*": "audio files",
      "application/pdf": "PDFs",
      "application/msword": "Word documents",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        "Word documents",
      "application/vnd.ms-excel": "Excel spreadsheets",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        "Excel spreadsheets",
      "application/vnd.ms-powerpoint": "PowerPoint presentations",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        "PowerPoint presentations",
      "text/plain": "text files",
    };

    const friendlyNames = (supportedFiles as string[])
      .map((type) => friendlyTypesMap[type] || type)
      .filter((value, index, self) => self.indexOf(value) === index); // remove duplicates

    return `${
      getLocalizedText?.("supportedFiles") || "Supported files"
    }: ${friendlyNames.join(", ")}`;
  }, [supportedFiles, getLocalizedText]);

  const handleChange = (files: FileList) => {
    const filteredFiles = filterFilesByMaxSize({
      files,
      maxSize: maxFileSize,
    });

    if (filteredFiles.length < files.length) {
      onError?.(
        getLocalizedText?.("ignoringFilesGreaterSize") ||
          "Ignoring files greater than max size"
      );
    }
    onChange(filteredFiles);
  };

  const fileInputId = `input-file-${name}`;

  return (
    <Typography component={"div"}>
      <Typography
        tabIndex={0}
        component={"label"}
        htmlFor={fileInputId}
        color={"primary"}
        sx={{
          border: "1px dashed",
          outlineColor: "primary.main",
          height: 200,
          width: "100%",
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();

          handleChange(e.dataTransfer.files);
        }}
        onKeyDown={handleA11yKeyDown(() => {
          document.getElementById(fileInputId)?.click();
        })}
      >
        <Typography
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography component={"span"}>
            <CloudUploadIcon fontSize="large" />
          </Typography>

          <Typography component={"span"} color={"textPrimary"}>
            {getLocalizedText?.("dropFile") || "Drop your file here, or browse"}
          </Typography>

          <Typography component={"span"} sx={{ fontSize: 14 }}>
            {supportedFilesString}
          </Typography>

          <Typography component={"span"} color="warning" sx={{ fontSize: 12 }}>
            {getLocalizedText?.("maxFileSize", { size: maxFileSize }) ||
              `Max file size ${maxFileSize}MB`}
          </Typography>
        </Typography>
        <input
          id={`input-file-${name}`}
          type="file"
          style={{
            display: "none",
          }}
          accept={supportedFiles.join(", ")}
          multiple={multiple}
          disabled={disabled}
          onChange={(e) => {
            if (e.target.files) {
              handleChange(e.target.files);
            }
          }}
          {...inputProps}
        />
      </Typography>
    </Typography>
  );
};

export default UploadFromGallery;
