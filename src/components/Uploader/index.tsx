import { TextField, Typography } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import { IFileUploader } from "../../types";
import UploaderModal from "./UploaderModal";
import { useState } from "react";

const FileUploader = ({
  error,
  files = [],
  size,
  count = false,
  getLocalizedText,
  ...rest
}: IFileUploader.Props) => {
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
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
        slotProps={{
          htmlInput: {
            sx: { cursor: "pointer" },
          },
          inputLabel: {
            shrink: !!files.length,
            sx: {
              pl: files.length ? 0 : 3,
              overflow: "hidden",
              textOverflow: "ellipsis",
            },
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
          getLocalizedText={getLocalizedText}
          {...rest}
        />
      )}
    </Typography>
  );
};

export default FileUploader;
