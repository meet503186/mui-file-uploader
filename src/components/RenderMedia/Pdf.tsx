import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { Box, SxProps } from "@mui/system";
import { IMedia } from "../../types";

const Pdf = ({ data }: { data: IMedia.FileData }) => {
  return <iframe src={data.fileUrl} width="100%" height="600px" />;
};

export default Pdf;

export const PdfPlaceholder = ({
  sx,
  containerSx,
}: {
  sx?: SxProps;
  containerSx?: SxProps;
}) => {
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
      <PictureAsPdfIcon color="primary" sx={{ fontSize: "auto", ...sx }} />
    </Box>
  );
};
