import { Button, IconButton, Typography } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import FlipIcon from "@mui/icons-material/Flip";
import RenderCameraList from "./RenderCameraList";
import { useMemo } from "react";
import { OverridableComponent } from "@mui/material/OverridableComponent";

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
  const iconButtons = useMemo<
    { Icon: OverridableComponent<any>; onClick: () => void }[]
  >(
    () => [
      {
        Icon: CloseIcon,
        onClick: onDecline,
      },
      {
        Icon: FlipIcon,
        onClick: onMirror,
      },
      {
        Icon: DoneIcon,
        onClick: onAccept,
      },
    ],
    [onAccept, onDecline, onMirror]
  );

  return (
    <Typography
      component={"div"}
      sx={{
        position: "absolute",
        bottom: 0,
        background: "rgba(0, 0, 0, 0.5)",
        width: "100%",
        zIndex: 9999,
        p: 2,
        height: 80,
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
          {iconButtons.map(({ Icon, onClick }, index) => (
            <IconButton
              key={index}
              autoFocus={index === 0}
              sx={{ ":focus-visible": { outline: `1px solid #fff` } }}
              onClick={onClick}
            >
              <Icon fontSize="large" sx={{ color: "#fff" }} />
            </IconButton>
          ))}
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
          <Button
            autoFocus
            sx={{
              background: "#fff",
              borderRadius: "100%",
              border: "none",
              outline: "none",
              cursor: "pointer",
              width: 5,
              aspectRatio: 1 / 1,
            }}
            onClick={onClickPicture}
          ></Button>
        </Typography>
      )}
    </Typography>
  );
};
