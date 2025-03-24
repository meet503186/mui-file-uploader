import * as React from "react";
import Tabs, { TabsProps } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { IFileUploader } from "../types";

interface ScrollableTabsProps {
  groups: IFileUploader.ITabGroup[];
  onTabChange: (newTab: number) => void;
  activeTab: number;
  renderContent: React.ReactNode;
  tabsProps?: TabsProps;
}

function ScrollableTabs({
  groups,
  onTabChange,
  activeTab,
  renderContent,
  tabsProps,
}: ScrollableTabsProps) {
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    onTabChange(newValue);
  };

  return (
    <Box
      sx={{ maxWidth: "100%", bgcolor: "background.paper", borderRadius: 1 }}
    >
      <Typography variant="h6" sx={{ textAlign: "center" }}></Typography>
      <Tabs
        value={activeTab}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="custom scrollable tabs"
        sx={{ justifyContent: "center" }}
        {...tabsProps}
      >
        {groups.map(({ label }, index) => (
          <Tab
            key={label}
            label={label}
            tabIndex={index}
            sx={{ fontWeight: "bold", color: "primary.main" }}
          />
        ))}
      </Tabs>

      <Box sx={{ my: 2 }}>{renderContent}</Box>
    </Box>
  );
}

export default ScrollableTabs;
