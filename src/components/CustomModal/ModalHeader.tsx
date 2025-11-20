import { IconButton, Typography } from "@mui/material";
import { CloseIcon } from "../../assets/icons/IconRegistery";

interface IHeaderProps {
  title: string;
  closeBtn?: boolean;
  onClose?: () => void;
}

export const ModalHeader = ({ title, closeBtn, onClose }: IHeaderProps) => {
  return (
    <Typography
      id="modal-modal-title"
      component="div"
      sx={{
        display: "flex",
        borderTopLeftRadius: "8px",
        borderTopRightRadius: "8px",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="h6" component="h2">
        {title}
      </Typography>
      {onClose && closeBtn && (
        <IconButton onClick={onClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      )}
    </Typography>
  );
};
