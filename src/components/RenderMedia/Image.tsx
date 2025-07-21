import { Box, CircularProgress } from "@mui/material";
import { ImgHTMLAttributes, useState } from "react";
import { BrokenImageIcon } from "../../assets/icons/IconRegistery";

const Image = ({
  src,
  alt = "Media image",
  width = "100%",
  height = "100%",
  containerStyle = {},
  style = {},
  ...rest
}: ImgHTMLAttributes<HTMLImageElement> & {
  containerStyle?: Record<string, any>;
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <Box
      position="relative"
      width={width}
      height={height}
      display="flex"
      alignItems="center"
      justifyContent="center"
      borderRadius={1}
      overflow="hidden"
      style={containerStyle}
    >
      {loading && !error && <CircularProgress size={32} />}

      {!error ? (
        <img
          src={src}
          alt={alt}
          onLoad={() => {
            setLoading(false);
          }}
          onError={() => {
            setLoading(false);
            setError(true);
          }}
          style={{
            display: loading ? "none" : "block",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            ...style,
          }}
          {...rest}
        />
      ) : (
        <Box display="flex" flexDirection="column" alignItems="center">
          <BrokenImageIcon color="disabled" fontSize="large" />
          <span style={{ fontSize: 12, color: "#888" }}>Image not found</span>
        </Box>
      )}
    </Box>
  );
};

export default Image;
