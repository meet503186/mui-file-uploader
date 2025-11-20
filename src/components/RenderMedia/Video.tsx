import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  VideoHTMLAttributes,
} from "react";
import { Box, CircularProgress, SvgIconProps, useTheme } from "@mui/material";
import {
  PlayCircleIcon,
  VideocamOffIcon,
} from "../../assets/icons/IconRegistery";

const Video: React.FC<
  VideoHTMLAttributes<HTMLVideoElement> & {
    isPlaceholder?: boolean;
    iconProps?: SvgIconProps;
  }
> = ({
  src,
  poster,
  width = "100%",
  style = {},
  isPlaceholder,
  iconProps = {},
  ...rest
}) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleLoadedData = useCallback(() => {
    setLoading(false);
  }, []);

  const handleError = useCallback(() => {
    setLoading(false);
    setError(true);
  }, []);

  useEffect(() => {
    if (videoRef.current && videoRef.current.readyState > 3) {
      setLoading(false);
    }
  }, []);

  return (
    <Box
      position="relative"
      width={width}
      display="flex"
      alignItems="center"
      justifyContent="center"
      borderRadius={1}
      overflow="hidden"
      style={{
        aspectRatio: 1,
        background: isPlaceholder ? "transparent" : "black",
        ...style,
      }}
    >
      {loading && !error && !isPlaceholder && <CircularProgress size={32} />}

      {!!isPlaceholder && (
        <PlayCircleIcon
          sx={{
            fontSize: "auto",
            zIndex: 10,
            position: "absolute",
            color: theme.palette.primary.main,
          }}
          {...iconProps}
        />
      )}

      {!isPlaceholder &&
        (!error ? (
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            preload="metadata"
            loop={false}
            onLoadedMetadata={handleLoadedData}
            onError={handleError}
            style={{
              display: loading ? "none" : "block",
              width: "100%",
              // height: "100%",
              aspectRatio: 1,
              objectFit: isPlaceholder ? "cover" : "contain",
              opacity: isPlaceholder ? 0 : 1,
            }}
            {...rest}
          />
        ) : (
          <Box display="flex" flexDirection="column" alignItems="center">
            <VideocamOffIcon color="disabled" fontSize="large" />
            <span style={{ fontSize: 12, color: "#888" }}>
              Video not available
            </span>
          </Box>
        ))}
    </Box>
  );
};

export default Video;
