import { Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { IFileUploader } from "../../../types";
import { filterFilesByMaxSize } from "../utils";
import { useMemo } from "react";

const UploadFromGallery = ({
  name,
  multiple = false,
  onChange,
  disabled,
  extraProps,
  inputProps,
  onError,
}: IFileUploader.UploadOption) => {
  const { maxFileSize = 5, supportedFiles = ["image/*"] } = extraProps || {};

  const supportedFilesString = useMemo(() => {
    if (supportedFiles.includes("image/*")) {
      return "Supported all type of image files";
    }

    return `Supported files ${supportedFiles
      .join(", ")
      .replaceAll("image/", "")}`;
  }, [supportedFiles]);

  return (
    <Typography component={"div"}>
      <Typography
        component={"label"}
        htmlFor={`input-file-${name}`}
        color={"primary"}
        sx={{
          border: "1px dashed",
          height: 200,
          width: "100%",
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
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
            Drop your image here, or <a>browse</a>
          </Typography>

          <Typography component={"span"} sx={{ fontSize: 14 }}>
            {supportedFilesString}
          </Typography>

          <Typography component={"span"} color="warning" sx={{ fontSize: 12 }}>
            Max file size {maxFileSize}MB
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
              const files = filterFilesByMaxSize({
                files: e.target.files,
                maxSize: maxFileSize,
              });

              if (files.length < e.target.files.length) {
                onError?.("Ignoring files greater than max size");
              }
              onChange(files);
            }
          }}
          {...inputProps}
        />
      </Typography>
    </Typography>
  );
};

export default UploadFromGallery;
