import React from "react";
import dayjs from "dayjs";
import { Box } from "@mui/material";
import theme from "../../styles/theme";
import { DayState } from "../../types/day";

const Day: React.FC<DayState> = ({ day, hour }) => {
  function getCellStyle(day:dayjs.Dayjs, hour:number) {
    return {
      // color: 'transparent',
      textAlign: "center", 
      borderLeft: 1,
      borderTop: hour === 0 ? 1 : 0,
      borderBottom: hour === 23 ? 1 : 0,
      borderRight: day.day() === 7 ? 1 : 0,
      borderColor: theme.palette.primary.dark,
    }
  }

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column" }}
    >
      <Box sx={getCellStyle(day, hour)}>
          {day.format("DD")}
      </Box>
    </Box>
  );
};

export default Day;
