import { Box, SxProps, useTheme } from "@mui/material";
import { IMedia } from "../../types";
import { DescriptionIcon, LaunchIcon } from "../../assets/icons/IconRegistery";

const Document = ({ data }: { data: IMedia.FileData }) => {
  const handleRedirect = () => {
    window.open(data.url);
  };

  return (
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
        position: "relative",
        overflow: "hidden",
      }}
    >
      <LaunchIcon
        sx={{
          position: "absolute",
          right: 0,
          bgcolor: "white",
          width: "40px",
          height: "40px",
          p: "5px",
          cursor: "pointer",
        }}
        onClick={handleRedirect}
      />
      <DocumentPlaceholder sx={{ fontSize: 50 }} />
    </Box>
  );
};

export default Document;

export const DocumentPlaceholder = ({
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
      <DescriptionIcon
        sx={{ fontSize: "auto", color: theme.palette.primary.main, ...sx }}
      />
    </Box>
  );
};
