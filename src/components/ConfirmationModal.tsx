import { Button, Typography } from "@mui/material";
import CustomModal from "./CustomModal";
import { ModalFooter } from "./CustomModal/ModalFooter";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  onYes: () => void;
  getLocalizedText?: (text: string, params?: Record<string, any>) => string;
}

/**
 * ConfirmationModal component renders a modal dialog with a title, description, and two action buttons: "Cancel" and "Yes".
 *
 * @param {boolean} isOpen - Determines whether the modal is open or closed.
 * @param {() => void} param.onClose - Callback function to handle the closing of the modal.
 * @param {string} param.title - The title text displayed at the top of the modal.
 * @param {string} param.description - The description text displayed in the body of the modal.
 * @param {() => void} param.onYes - Callback function to handle the "Yes" button click event.
 *
 * @returns {React.JSX.Element} The rendered ConfirmationModal component.
 */
const ConfirmationModal = ({
  isOpen,
  onClose,
  title,
  description,
  onYes,
  getLocalizedText,
}: IProps): React.JSX.Element => {
  const handleCancel = () => onClose();
  const handleYes = () => onYes();

  return (
    <CustomModal
      title={title}
      isOpen={isOpen}
      onClose={onClose}
      sx={{
        width: "fit-content",
        minWidth: { xs: "80%", sm: 400 },
        maxWidth: 500,
      }}
    >
      <Typography sx={{ fontSize: 14, my: 1, height: "50px" }}>
        {getLocalizedText?.(description) || description}
      </Typography>
      <ModalFooter
        sx={{
          mt: 4,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: 2,
        }}
      >
        <Button variant="outlined" onClick={handleCancel}>
          {getLocalizedText?.("cancel") || "cancel"}
        </Button>
        <Button variant="contained" onClick={handleYes}>
          {getLocalizedText?.("yes") || "yes"}
        </Button>
      </ModalFooter>
    </CustomModal>
  );
};

export default ConfirmationModal;
