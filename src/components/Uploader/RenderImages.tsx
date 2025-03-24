import { IconButton, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "./Image";
import { getFileUrl } from "./utils";
import { useState } from "react";
import { ImagePreviewModal } from "./PreviewModal";

interface IRenderImages {
  images: (string | File)[];
  onRemove: (index: number) => void;
}

const RenderImages = ({ images, onRemove }: IRenderImages) => {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const onView = (index: number) => {
    setActiveImageIndex(index);
  };

  return (
    <Typography component={"div"}>
      {images.map((image: any, index: number) => {
        const fileUrl = getFileUrl(image);
        const imageName = image?.name || `image${index + 1}`;

        return (
          <Typography
            key={image.name + index}
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
              sx={{ flex: 1, display: "flex", alignItems: "center", gap: 0.5 }}
            >
              <Image
                src={fileUrl}
                alt={imageName}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
                containerStyle={{ width: "40px", height: "35px" }}
              />
              <Typography
                color="textPrimary"
                component={"span"}
                sx={{ fontSize: 13, maxWidth: "70%" }}
              >
                {imageName}
              </Typography>
            </Typography>

            <Typography>
              <IconButton onClick={() => onView(index)}>
                <VisibilityIcon fontSize="small" />
              </IconButton>
              <IconButton onClick={() => onRemove(index)}>
                <DeleteIcon fontSize="small" color="error" />
              </IconButton>
            </Typography>
          </Typography>
        );
      })}

      {activeImageIndex !== null && (
        <ImagePreviewModal
          images={images}
          activeImageIndex={activeImageIndex}
          onChangeActiveImageIndex={(newIndex) => setActiveImageIndex(newIndex)}
          onClose={() => setActiveImageIndex(null)}
        />
      )}
    </Typography>
  );
};

export default RenderImages;
