import { SxProps, Typography } from "@mui/material";

interface IModalFooterProps {
  children: React.ReactNode;
  sx?: SxProps;
}

export const ModalFooter = ({ children, sx = {} }: IModalFooterProps) => {
  return (
    <Typography id="modal-modal-footer" component="div" sx={sx}>
      {children}
    </Typography>
  );
};
