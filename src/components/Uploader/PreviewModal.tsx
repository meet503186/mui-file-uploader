import { Box, IconButton, Modal, Typography, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useMemo } from "react";
import { getFileUrl } from "./utils";
import { IFileUploader } from "../../types";

interface IPreviewModalProps {
  onClose: () => void;
  images: IFileUploader.fileType[];
  activeImageIndex?: number;
  onChangeActiveImageIndex?: (newIndex: number) => void;
}

export const ImagePreviewModal = ({
  onClose,
  images,
  activeImageIndex = 0,
  onChangeActiveImageIndex = () => {},
}: IPreviewModalProps) => {
  const theme = useTheme();
  const { hasNext, hasPrevious, visibleImageUrl } = useMemo(() => {
    return {
      hasNext: activeImageIndex < images.length - 1,
      hasPrevious: activeImageIndex > 0,
      visibleImageUrl: getFileUrl(images[activeImageIndex]),
    };
  }, [activeImageIndex, images]);

  const handleNext = () => {
    if (activeImageIndex < images.length - 1) {
      onChangeActiveImageIndex(activeImageIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (activeImageIndex > 0) {
      onChangeActiveImageIndex(activeImageIndex - 1);
    }
  };

  return (
    <Modal
      open={true}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ outline: "none" }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          minWidth: "40vw",
          width: "100%",
          height: "100%",
          bgcolor: `rgba(0,0,0,0.7)`,
          boxShadow: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "10px",
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon sx={{ color: theme.palette.common.white }} />
        </IconButton>
        <img
          src={visibleImageUrl}
          alt="preview"
          style={{
            width: "fit-content",
            height: "fit-content",
            borderRadius: "10px",
            maxWidth: window.innerHeight - 50,
            maxHeight: window.innerHeight - 50,
          }}
        />

        <Typography
          sx={{
            width: "100%",
            position: "fixed",
            top: "50%",
            left: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <IconButton disabled={!hasPrevious} onClick={handlePrevious}>
            <ChevronLeftIcon
              fontSize="large"
              sx={{ color: theme.palette.common.white }}
            />
          </IconButton>
          <IconButton disabled={!hasNext} onClick={handleNext}>
            <ChevronRightIcon
              fontSize="large"
              sx={{ color: theme.palette.common.white }}
            />
          </IconButton>
        </Typography>
      </Box>
    </Modal>
  );
};
