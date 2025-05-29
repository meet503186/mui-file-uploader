import { FormHelperText, Typography, useTheme } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import { IFileUploader } from "../../types";
import UploaderModal from "./UploaderModal";
import { useState } from "react";
import { stopStreamedVideo } from "./UploadOptions/UploadFromCamera/utils";

const FileUploader = ({
  error,
  files = [],
  size,
  count = false,
  hideDoneButton = false,
  onUploadFile,
  onDeleteFile,
  ...rest
}: IFileUploader.Props) => {
  const theme = useTheme();
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    stopStreamedVideo();
    setShowModal(false);
  };

  const { label } = rest;

  return (
    <Typography component={"div"} sx={{ width: "100%" }}>
      {/* visible component */}
      <Typography
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          border: !error
            ? "1px solid rgba(0, 0, 0, 0.2)"
            : `1px solid ${theme.palette.error.main}`,
          "border:hover": "1px solid rgba(0, 0, 0, 0.87)",
          borderRadius: "4px",
          cursor: "pointer",
          padding: size === "small" ? 1 : 1.8,
        }}
        onClick={() => setShowModal(true)}
      >
        <ImageIcon color={error ? "error" : "inherit"} fontSize="medium" />
        <Typography
          component={"span"}
          sx={{
            color: error
              ? theme.palette.error.main
              : theme.palette.text.primary,
          }}
        >
          {label} {count && `(${files.length})`}
        </Typography>
      </Typography>

      {/* error */}
      {!!error && <FormHelperText error={!!error}>{error}</FormHelperText>}

      {/* file uplodaer modal */}
      {showModal && (
        <UploaderModal
          isOpen={showModal}
          onClose={handleCloseModal}
          files={files}
          hideDoneButton={hideDoneButton}
          onUploadFile={onUploadFile}
          onDeleteFile={onDeleteFile}
          {...rest}
        />
      )}
    </Typography>
  );
};

export default FileUploader;
