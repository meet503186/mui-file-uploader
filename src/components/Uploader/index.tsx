import { FormHelperText, Typography, useTheme } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import { IFileUploader } from "../../types";
import ImageUploaderModal from "./UploaderModal";
import { useMemo, useState } from "react";
import { stopStreamedVideo } from "./UploadOptions/UploadFromCamera/utils";

const ImageUploader = ({
  error,
  images,
  size,
  count = false,
  ...rest
}: IFileUploader.Props) => {
  const theme = useTheme();
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    stopStreamedVideo();
    setShowModal(false);
  };

  const { label } = rest;

  const imagesData = useMemo(() => {
    if (typeof images === "string") {
      return [images];
    }

    return images || [];
  }, [images]);

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
          {label} {count && `(${imagesData.length})`}
        </Typography>
      </Typography>

      {/* error */}
      {!!error && <FormHelperText error={!!error}>{error}</FormHelperText>}

      {/* image uplodaer modal */}
      {showModal && (
        <ImageUploaderModal
          isOpen={showModal}
          onClose={handleCloseModal}
          images={imagesData}
          {...rest}
        />
      )}
    </Typography>
  );
};

export default ImageUploader;
