import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton } from "@mui/material";
import FlipCameraIcon from "@mui/icons-material/FlipCameraAndroid";

interface IRenderCameraList {
  list: MediaDeviceInfo[];
  selectedCamera: string;
  onChangeCamera: (cameraId: string) => void;
}

export default function RenderCameraList({
  list,
  selectedCamera,
  onChangeCamera,
}: IRenderCameraList) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCameraChange = (deviceId: string) => {
    onChangeCamera(deviceId);
    handleClose();
  };

  return (
    <>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ justifySelf: "self-start" }}
      >
        <FlipCameraIcon
          fontSize="medium"
          sx={{ color: "white", aspectRatio: 1 }}
        />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {list.map((device) => (
          <MenuItem
            key={device.deviceId}
            selected={selectedCamera === device.deviceId}
            onClick={() => handleCameraChange(device.deviceId)}
          >
            {device.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
