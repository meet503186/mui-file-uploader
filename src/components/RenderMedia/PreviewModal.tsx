import { useCallback, useEffect, useState } from "react";
import { Box, BoxProps, Modal, SxProps } from "@mui/material";
import { IMedia } from "../../types";
import { getFileType } from "../../utils";
import {
  CloseIcon,
  ArrowBackIcon,
  ArrowForwardIcon,
} from "../../assets/icons/IconRegistery";
import Video from "./Video";
import Image from "./Image";
import Audio from "./Audio";
import Pdf from "./Pdf";
import Document from "./Document";

const PreviewModal = ({
  isOpen,
  onClose,
  data,
  currentIndex,
}: {
  isOpen: boolean;
  onClose: () => void;
  sx?: SxProps;
  data: IMedia.FileData[];
  currentIndex: number;
}) => {
  const [visibleItem, setVisibleItem] = useState<number>(currentIndex);

  const handlePrev = useCallback(() => {
    setVisibleItem((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const handleNext = useCallback(() => {
    setVisibleItem((prev) => (prev < data.length - 1 ? prev + 1 : prev));
  }, [data]);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          handlePrev();
          break;

        case "ArrowRight":
          handleNext();
          break;

        case "Escape":
          onClose();
          break;

        default:
          break;
      }
    },
    [handlePrev, handleNext, onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  useEffect(() => {
    setVisibleItem(currentIndex);
  }, [currentIndex]);

  if (!data[currentIndex]) return null;

  return (
    <Modal
      open={isOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        outline: "none",
        overflow: "auto",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
      }}
      disableEscapeKeyDown
    >
      <Box>
        <IconWrapper onClick={onClose}>
          <CloseIcon />
        </IconWrapper>

        <IconWrapper sx={{ left: 6, top: "50%" }} onClick={handlePrev}>
          <ArrowBackIcon />
        </IconWrapper>

        <IconWrapper sx={{ right: 6, top: "50%" }} onClick={handleNext}>
          <ArrowForwardIcon />
        </IconWrapper>

        <Box
          sx={{
            position: "absolute",
            bgcolor: "grey.300",
            zIndex: 1,
            bottom: 5,
            left: "50%",
            transform: "translateX(-50%)",
            borderRadius: 1,
            px: 1,
            fontSize: 15,
            fontWeight: 500,
          }}
        >
          {visibleItem + 1} / {data.length}
        </Box>

        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            minWidth: "40vw",
            width: { xs: "100%", md: "auto" },
            aspectRatio: 1,
            borderRadius: "8px",
            outline: "none",
          }}
        >
          <PreviewMedia data={data[visibleItem]} />
        </Box>
      </Box>
    </Modal>
  );
};

export default PreviewModal;

const PreviewMedia = ({
  data = {} as IMedia.FileData,
}: {
  data: IMedia.FileData;
}) => {
  switch (getFileType(data)) {
    case "video":
      return <Video src={data.url} controls />;

    case "audio":
      return <Audio src={data.url} />;

    case "document":
      return <Document data={data} />;

    case "pdf":
      return <Pdf data={data} />;

    case "image":
    default:
      return (
        <Image
          src={data.url}
          alt={data.name}
          style={{ objectFit: "contain" }}
        />
      );
  }
};

const IconWrapper = ({ children, sx, ...rest }: BoxProps) => {
  return (
    <Box
      sx={{
        position: "fixed",
        right: 10,
        top: 10,
        zIndex: 1,
        bgcolor: "grey.300",
        borderRadius: "50%",
        width: 30,
        aspectRatio: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "all",
        transitionDuration: 300,
        ":hover": {
          scale: 1.1,
        },
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};
