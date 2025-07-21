import { Button, Box } from "@mui/material";
import { IFileUploader } from "../types";

interface IProps {
  groups: IFileUploader.ITabGroup[];
  onTabChange: (newTab: number) => void;
  activeTab: number;
  renderContent: React.ReactNode;
  getLocalizedText?: (text: string, params?: Record<string, any>) => string;
}

export default function ScrollableTabs({
  groups,
  onTabChange,
  activeTab,
  renderContent,
  getLocalizedText,
}: IProps) {
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", overflowX: "auto" }}>
        {groups.map(({ label, _key }, index) => (
          <Button
            key={_key}
            onClick={() => onTabChange(index)}
            sx={{
              flex: "0 0 auto",
              borderRadius: 0,
              borderBottom: 2,
              borderColor: activeTab === index ? "primary.main" : "transparent",
              color: activeTab === index ? "primary.main" : "text.primary",
              fontWeight: 600,
              textTransform: "uppercase",
              "&:hover": {
                backgroundColor: "transparent",
              },
              fontSize: "0.875rem",
              lineHeight: 1.25,
              letterSpacing: "0.02857em",
              maxWidth: "360px",
              minWidth: "90px",
              position: "relative",
              minHeight: "48px",
              flexShrink: 0,
              padding: "12px 16px",
              overflow: "hidden",
              whiteSpace: "normal",
              textAlign: "center",
              flexDirection: "column",
            }}
          >
            {getLocalizedText?.(`${_key}`) || label}
          </Button>
        ))}
      </Box>

      <Box sx={{ my: 2 }}>{renderContent}</Box>
    </Box>
  );
}
