import {
  Box,
  Button,
  ButtonProps,
  Modal,
  SxProps,
  Typography,
} from "@mui/material";
import React from "react";
import { ModalHeader } from "./ModalHeader";
import { ModalFooter } from "./ModalFooter";

interface IModalProps {
  title?: string;
  sx?: SxProps;
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  className?: string;
  buttons?: ButtonProps[];
}

const CustomModal = ({
  title,
  isOpen,
  onClose,
  children,
  sx,
  className = "",
  buttons,
}: IModalProps) => {
  return (
    <Modal
      open={isOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ outline: "none", overflow: "auto" }}
    >
      <Box
        component={"div"}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          minWidth: "40vw",
          width: { xs: "80%", sm: "30%" },
          bgcolor: "background.paper",
          boxShadow: 4,
          borderRadius: "8px",
          p: 2,
          maxHeight: "100%",
          overflow: "auto",
          ...sx,
        }}
        className={`hide-scrollbar ${className}`}
      >
        {title && <ModalHeader title={title} onClose={onClose} />}

        <Typography
          component={"div"}
          sx={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography component={"div"}>{children}</Typography>
          {!!buttons?.length && (
            <ModalFooter>
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  gap: 2,
                }}
              >
                {buttons.map(
                  ({ title, hidden, ...rest }) =>
                    !hidden && (
                      <Button key={title} {...rest}>
                        {title}
                      </Button>
                    )
                )}
              </Typography>
            </ModalFooter>
          )}
        </Typography>
      </Box>
    </Modal>
  );
};

export default CustomModal;
