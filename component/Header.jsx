import { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function Header({ minMag, setMinMag, timespan, setTimespan }) {
  const [showButtons, setShowButtons] = useState(false);

  const toggleButtons = () => setShowButtons(!showButtons);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "#000" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleButtons}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            USGS Earthquakes
          </Typography>
        </Toolbar>
        {/* Rendert die buttons unter dem Titel */}
        {showButtons && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "left",
              gap: 20,
              p: 2,
              bgcolor: "white",
            }}
          >
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Typography color="black" fontWeight={"bold"}>
                Select Magnitude
              </Typography>
              <ToggleButtonGroup
                value={minMag}
                exclusive
                onChange={(e, Mag) => setMinMag(Mag)}
                color="primary"
              >
                <ToggleButton value={"all"}>ALL</ToggleButton>
                <ToggleButton value={"1.0"}>M1.0+</ToggleButton>
                <ToggleButton value={"2.5"}>M2.5+</ToggleButton>
                <ToggleButton value={"4.5"}>M4.5+</ToggleButton>
                <ToggleButton value={"significant"}>SIGNIFICANT</ToggleButton>
              </ToggleButtonGroup>
            </Box>
            {/* Zweite selektion für Zeit */}
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <Typography color="black" fontWeight={"bold"}>
                Select Time Period
              </Typography>
              <ToggleButtonGroup
                value={timespan}
                exclusive
                onChange={(e, Period) => setTimespan(Period)}
                color="primary"
              >
                <ToggleButton value={"hour"}>LAST HOUR</ToggleButton>
                <ToggleButton value={"day"}>LAST DAY</ToggleButton>
                <ToggleButton value={"week"}>LAST 7 DAYS</ToggleButton>
                <ToggleButton value={"month"}>LAST 30 DAYS</ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Box>
        )}
      </AppBar>
    </Box>
  );
}
