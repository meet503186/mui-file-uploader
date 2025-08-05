import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  CircularProgress,
  SxProps,
  Typography,
  useTheme,
} from "@mui/material";
import { HeadsetIcon, VolumeOffIcon } from "../../assets/icons/IconRegistery";

const Audio: React.FC<React.AudioHTMLAttributes<HTMLAudioElement>> = ({
  src,
  style = {},
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (audioRef.current && audioRef.current.readyState >= 3) {
      setLoading(false);
    }
  }, []);

  const handleLoaded = () => setLoading(false);
  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  return (
    <Box
      width={"100%"}
      height={"100%"}
      padding={2}
      borderRadius={1}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        ...style,
      }}
    >
      {loading && !error && (
        <CircularProgress
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            translate: "-50% -50%",
          }}
          size={32}
        />
      )}

      {!error ? (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            bgcolor: "grey.300",
            borderRadius: 2,
          }}
        >
          {!loading && <AudioPlaceholder sx={{ fontSize: 120 }} />}
          <audio
            ref={audioRef}
            src={src}
            controls
            onLoadedMetadata={handleLoaded}
            //   onCanPlayThrough={handleLoaded}
            onError={handleError}
            style={{
              display: loading ? "none" : "block",
              width: "100%",
              borderRadius: 0,
            }}
          />
        </Box>
      ) : (
        <Box display="flex" alignItems="center" flexDirection="column">
          <VolumeOffIcon color="disabled" fontSize="large" />
          <Typography variant="body2" color="textSecondary">
            Audio not available
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Audio;

export const AudioPlaceholder = ({
  sx,
  containerSx,
}: {
  sx?: SxProps;
  containerSx?: SxProps;
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...containerSx,
      }}
    >
      <HeadsetIcon
        sx={{ fontSize: "auto", color: theme.palette.primary.main, ...sx }}
      />
    </Box>
  );
};
