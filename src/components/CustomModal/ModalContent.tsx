import { SxProps, Typography } from "@mui/material";
import React from "react";

interface IModalContentProps {
  sx?: SxProps;
  children: React.ReactNode;
}

export const ModalContent = ({ sx, children }: IModalContentProps) => {
  return (
    <Typography component={"div"} sx={sx}>
      {children}
    </Typography>
  );
};
