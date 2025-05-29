import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  VideoHTMLAttributes,
} from "react";
import { Box, CircularProgress } from "@mui/material";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import { PlayCircle } from "@mui/icons-material";

const Video: React.FC<
  VideoHTMLAttributes<HTMLVideoElement> & {
    playIcon?: boolean;
  }
> = ({
  src,
  poster,
  width = "100%",
  height = "100%",
  style = {},
  playIcon,
  ...rest
}) => {
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
      style={{ aspectRatio: 1, background: "#000", ...style }}
    >
      {loading && !error && <CircularProgress size={32} />}

      {!loading && !error && !!playIcon && (
        <PlayCircle
          sx={{ fontSize: "auto", zIndex: 10, position: "absolute" }}
        />
      )}

      {!error ? (
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
            objectFit: "cover",
            opacity: 0.7,
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
      )}
    </Box>
  );
};

export default Video;
