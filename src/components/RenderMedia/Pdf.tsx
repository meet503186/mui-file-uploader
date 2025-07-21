import { Box, SxProps } from "@mui/system";
import { IMedia } from "../../types";
import { CircularProgress, useTheme } from "@mui/material";
import { useCallback, useState } from "react";
import { PictureAsPdfIcon } from "../../assets/icons/IconRegistery";

const Pdf = ({ data }: { data: IMedia.FileData }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading && (
        <CircularProgress
          size={40}
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            translate: "-50% -50%",
          }}
        />
      )}
      <iframe
        src={`https://docs.google.com/gview?url=${encodeURIComponent(
          data.url
        )}&embedded=true`}
        width="100%"
        height="600px"
        style={{ border: "none" }}
        onLoad={handleLoad}
      />
    </>
  );
};

export default Pdf;

export const PdfPlaceholder = ({
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
      <PictureAsPdfIcon
        sx={{ fontSize: "auto", color: theme.palette.primary.main, ...sx }}
      />
    </Box>
  );
};
