import { TextField, Typography } from "@mui/material";
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
  getLocalizedText,
  ...rest
}: IFileUploader.Props) => {
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    stopStreamedVideo();
    setShowModal(false);
  };

  const { label } = rest;

  return (
    <Typography component={"div"} sx={{ width: "100%" }}>
      {/* visible component */}

      <TextField
        label={`${getLocalizedText?.(label)} ${
          count ? `(${files.length})` : ""
        }`}
        size="small"
        variant="outlined"
        value={files.map((file) => file.name).join(", ")}
        onClick={() => setShowModal(true)}
        fullWidth
        error={!!error}
        helperText={error}
        sx={{ cursor: "pointer" }}
        slotProps={{
          inputLabel: {
            shrink: !!files.length,
            sx: { ml: files.length ? 0 : 3 },
          },
          input: {
            sx: {
              pr: 0.5,
              pl: 1,
            },
            readOnly: true,
            startAdornment: (
              <ImageIcon
                color={error ? "error" : "inherit"}
                fontSize="medium"
                sx={{ pr: 0, mr: 0.5 }}
              />
            ),
          },
        }}
      />

      {/* file uplodaer modal */}
      {showModal && (
        <UploaderModal
          isOpen={showModal}
          onClose={handleCloseModal}
          files={files}
          hideDoneButton={hideDoneButton}
          onUploadFile={onUploadFile}
          onDeleteFile={onDeleteFile}
          getLocalizedText={getLocalizedText}
          {...rest}
        />
      )}
    </Typography>
  );
};

export default FileUploader;
