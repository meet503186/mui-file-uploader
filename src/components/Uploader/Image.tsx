import { CircularProgress, Typography } from "@mui/material";
import {
  CSSProperties,
  DetailedHTMLProps,
  ImgHTMLAttributes,
  useCallback,
  useState,
} from "react";

interface IImageProps
  extends DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  imageStyle?: CSSProperties;
  containerStyle?: CSSProperties;
}

const Image = ({
  src,
  loading = "lazy",
  imageStyle = {},
  containerStyle = {},
  ...props
}: IImageProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(src ? false : true);

  const onLoad = useCallback(() => {
    setIsImageLoaded(true);
  }, [isImageLoaded]);

  return (
    <Typography
      component={"div"}
      sx={{
        width: "100px",
        height: "100px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        ...containerStyle,
      }}
    >
      {!isImageLoaded && (
        <CircularProgress sx={{ position: "absolute", margin: "auto" }} />
      )}

      <img
        loading={loading}
        src={src}
        onLoad={onLoad}
        onError={onLoad}
        style={{
          width: "100%",
          height: "100%",
          border: "1px solid",
          ...imageStyle,
        }}
        {...props}
      />
    </Typography>
  );
};

export default Image;
