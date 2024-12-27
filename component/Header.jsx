import { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

//
//Header Funktion mit Menuebar und Aswahl Datum
//

export default function Header({ selectedDate, setSelectedDate }) {
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
            Meteodaten Zürich
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
                Select Date
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Datum auswählen"
                  value={selectedDate}
                  onChange={(newValue) => setSelectedDate(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Box>
          </Box>
        )}
      </AppBar>
    </Box>
  );
}
