import * as React from "react";
import Tabs, { TabsProps } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { IFileUploader } from "../types";
import { useTheme } from "@mui/material";

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
  const theme = useTheme();
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    onTabChange(newValue);
  };

  return (
    <Box sx={{ maxWidth: "100%", borderRadius: 1 }}>
      <Tabs
        value={activeTab}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="custom scrollable tabs"
        sx={{ justifyContent: "center" }}
        slotProps={{
          indicator: {
            sx: { bgcolor: theme.palette.primary.main },
          },
        }}
        {...tabsProps}
      >
        {groups.map(({ label }, index) => (
          <Tab
            key={label}
            label={label}
            tabIndex={index}
            sx={{
              fontWeight: "bold",

              "&.Mui-selected": {
                color: theme.palette.primary.main, // Selected tab text color
              },
            }}
          />
        ))}
      </Tabs>

      <Box sx={{ my: 2 }}>{renderContent}</Box>
    </Box>
  );
}

export default ScrollableTabs;
