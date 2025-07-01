import Video from "./Video";
import Image from "./Image";
import { Box, BoxProps, Modal, SxProps } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useEffect, useState } from "react";
import Audio from "./Audio";
import Pdf from "./Pdf";
import Document from "./Document";
import { IMedia } from "../../types";
import { getFileType } from "../../utils";

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

  const handlePrev = () => {
    if (visibleItem > 0) {
      setVisibleItem((_state) => --_state);
    }
  };

  const handleNext = () => {
    if (visibleItem < data.length - 1) {
      setVisibleItem((_state) => ++_state);
    }
  };

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
    >
      <>
        <IconWrapper onClick={onClose}>
          <CloseIcon />
        </IconWrapper>

        <IconWrapper sx={{ left: 6, top: "50%" }} onClick={handlePrev}>
          <ArrowBack />
        </IconWrapper>

        <IconWrapper sx={{ right: 6, top: "50%" }} onClick={handleNext}>
          <ArrowForward />
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
      </>
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
