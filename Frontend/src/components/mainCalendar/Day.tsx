import React, { useContext } from "react";
import dayjs from "dayjs";
import { Box } from "@mui/material";
import theme from "../../styles/theme";
import { DayState } from "../../types/day";
import GlobalContext from "../../context/globalContext";
import useHourStyles from "../../styles/hour";

const Day: React.FC<DayState> = ({ day, hour }) => {
  const hourClasses = useHourStyles();
  const { setDaySelected, setShowModalWindow } = useContext(GlobalContext);
  function getCellStyle(day: dayjs.Dayjs, hour: number) {
    return {
      // color: 'transparent',
      borderLeft: 1,
      borderTop: hour === 0 ? 1 : 0,
      borderBottom: hour === 23 ? 1 : 0,
      borderRight: day.day() === 7 ? 1 : 0,
    };
  }

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column" }}
      onClick={() => {
        setDaySelected(dayjs(new Date(dayjs(day).year(), dayjs(day).month(), dayjs(day).date(), hour)));
        setShowModalWindow(true);
      }}
    >
      <Box className={hourClasses.root} sx={getCellStyle(day, hour)}>{day.format("DD")}</Box>
    </Box>
  );
};

export default Day;
