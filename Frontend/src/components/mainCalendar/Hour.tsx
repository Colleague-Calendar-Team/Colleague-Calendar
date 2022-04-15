import React, { memo } from "react";
import { Box } from "@mui/material";
import { HourElementState } from "../../types/elements/hourElement";
import useHourStyles from "../../styles/hour";
import { DEBUG_RENDER } from "../../utils/debug";
import { useActions } from "../../hooks/useActions";
import { useNavigate } from "react-router-dom";

const Hour: React.FC<HourElementState> = ({ day, hour }) => {
  if (DEBUG_RENDER) {
    console.log('hour render (memo+)');
  }

  const id = day*24 + hour;
  const hourClasses = useHourStyles();
  const { selectModalWindow, selectHour } = useActions();
  const navigate = useNavigate();

  function getCellStyle(day: number, hour: number) {
    return {
      borderLeft: 1,
      borderTop: hour === 0 ? 1 : 0,
      borderBottom: hour === 23 ? 1 : 0,
      borderRight: day === 6 ? 1 : 0,
    };
  }

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column" }}
      onClick={(e) => {
        selectHour(id);
        selectModalWindow('eventCreate');
        navigate('/events/add');
      }}
    >
      <Box id={id.toString()} className={hourClasses.root} sx={getCellStyle(day, hour)}></Box>
    </Box>
  );
};

export default memo(Hour);
