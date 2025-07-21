import { Box, IconButton, Typography } from "@mui/material";

import RenderCameraList from "./RenderCameraList";
import {
  CloseIcon,
  DoneIcon,
  FlipIcon,
} from "../../../../assets/icons/IconRegistery";

interface ICameraFooterProps {
  devices: MediaDeviceInfo[];
  selectedDeviceId: string;
  onChangeSelectedDevice: (deviceId: string) => void;
  isPictureClicked: boolean;
  onClickPicture: () => void;
  onAccept: () => void;
  onDecline: () => void;
  onMirror: () => void;
}

export const CameraFooter = ({
  devices,
  selectedDeviceId,
  onChangeSelectedDevice,
  isPictureClicked,
  onClickPicture,
  onAccept,
  onDecline,
  onMirror,
}: ICameraFooterProps) => {
  return (
    <Box
      component={"div"}
      sx={{
        position: "absolute",
        bottom: 0,
        background: "rgba(0, 0, 0, 0.5)",
        width: "100%",
        zIndex: 9999,
        height: 80,
        display: "flex",
        alignItems: "center",
      }}
    >
      {isPictureClicked ? (
        <Typography
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <IconButton onClick={onDecline}>
            <CloseIcon fontSize="large" sx={{ color: "#fff" }} />
          </IconButton>
          <IconButton onClick={onMirror}>
            <FlipIcon fontSize="large" sx={{ color: "#fff" }} />
          </IconButton>
          <IconButton onClick={onAccept}>
            <DoneIcon fontSize="large" sx={{ color: "#fff" }} />
          </IconButton>
        </Typography>
      ) : (
        <Typography
          sx={{
            width: "100%",
            textAlign: "center",
            display: "grid",
            gridTemplateColumns: "0.9fr 1.1fr",
          }}
        >
          <RenderCameraList
            list={devices}
            selectedCamera={selectedDeviceId}
            onChangeCamera={onChangeSelectedDevice}
          />
          <button
            style={{
              background: "#fff",
              borderRadius: "100%",
              border: "none",
              outline: "none",
              cursor: "pointer",
              width: "50px",
              height: "auto",
              aspectRatio: 1,
            }}
            onClick={onClickPicture}
          ></button>
        </Typography>
      )}
    </Box>
  );
};
