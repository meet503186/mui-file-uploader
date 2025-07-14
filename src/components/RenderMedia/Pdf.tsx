import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { Box, SxProps } from "@mui/system";
import { IMedia } from "../../types";
import { useTheme } from "@mui/material";

const Pdf = ({ data }: { data: IMedia.FileData }) => {
  return <iframe src={data.url} width="100%" height="600px" />;
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
