import Image from "./Image";
import Video from "./Video";
import { AudioPlaceholder } from "./Audio";
import { DocumentPlaceholder } from "./Document";
import { PdfPlaceholder } from "./Pdf";

import { Box, IconButton, LinearProgress, Typography } from "@mui/material";

import { useCallback, useState } from "react";
import PreviewModal from "./PreviewModal";
import { IMedia } from "../../types";
import { getFileType } from "../../utils";
import { DeleteIcon, VisibilityIcon } from "../../assets/icons/IconRegistery";
import ReplayIcon from "@mui/icons-material/Replay";

interface IRenderMedia {
  media: IMedia.FileData[];
  progressMap: (number | undefined)[];
  required: boolean;
  disabled?: boolean;
  onRemove: (index: number) => void;
  onRetry: (index: number) => void;
}

const RenderMedia = ({
  media,
  progressMap,
  required,
  disabled,
  onRemove,
  onRetry,
}: IRenderMedia) => {
  const [previewData, setPreviewData] = useState<{
    selectedIndex: number;
  } | null>(null);
  const closePreview = () => setPreviewData(null);

  const onView = useCallback((index: number) => {
    setPreviewData({ selectedIndex: index });
  }, []);

  return (
    <Typography component={"div"} sx={{ mt: disabled ? 1 : 0 }}>
      {media.map((file, index: number) => {
        return (
          <Typography
            key={file.name + index}
            component={"div"}
            color="secondary"
            sx={{
              border: "0.5px solid",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: "50px",
              p: 0.5,
              pl: 1,
              mt: index !== 0 ? 1 : 0,
            }}
          >
            <Typography
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                maxWidth: "80%",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  width: "30px",
                  height: "30px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <RenderMediaItem data={file} />
              </Box>
              <Typography
                color="textPrimary"
                component={"span"}
                sx={{
                  fontSize: 13,
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  flex: 1,
                }}
              >
                {file.name}
              </Typography>
            </Typography>

            {!!progressMap[index] && progressMap[index] !== 100 && (
              <LinearProgress
                sx={{ width: 200, height: 4, borderRadius: 4 }}
                variant="determinate"
                value={progressMap[index]}
              />
            )}
            {progressMap[index] === 100 &&
              (file.isFailed ? (
                <IconButton onClick={() => onRetry(index)}>
                  <ReplayIcon
                    fontSize="small"
                    sx={{ transform: "scaleX(-1)" }}
                  />
                </IconButton>
              ) : (
                <Typography
                  sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}
                >
                  <IconButton onClick={() => onView(index)}>
                    <VisibilityIcon fontSize="small" />
                  </IconButton>
                  {!disabled && (
                    <IconButton
                      onClick={() => onRemove(index)}
                      disabled={media.length === 1 && required}
                    >
                      <DeleteIcon
                        fontSize="small"
                        color={
                          media.length === 1 && required ? "disabled" : "error"
                        }
                      />
                    </IconButton>
                  )}
                </Typography>
              ))}
          </Typography>
        );
      })}

      <PreviewModal
        isOpen={!!previewData}
        onClose={closePreview}
        data={media}
        currentIndex={previewData?.selectedIndex!}
      />
    </Typography>
  );
};

export default RenderMedia;

const RenderMediaItem = ({ data }: { data: IMedia.FileData }) => {
  switch (getFileType(data)) {
    case "video":
      return <Video src={data.url} isPlaceholder />;
    case "audio":
      return <AudioPlaceholder />;

    case "document":
      return <DocumentPlaceholder />;

    case "pdf":
      return <PdfPlaceholder />;

    case "image":
    default:
      return <Image src={data.url} alt={data.name} />;
  }
};
