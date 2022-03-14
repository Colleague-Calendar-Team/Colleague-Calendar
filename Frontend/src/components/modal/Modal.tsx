import { Box, Modal, ThemeProvider, Typography } from "@mui/material";
import React, { SyntheticEvent, useContext, useEffect, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import GlobalContext from "../../context/globalContext";
import theme from "../../styles/theme";
import { ModalState } from "../../types/modal";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import themeModalTab from "../../styles/modalTab";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  border: "2px solid #000",
  boxShadow: 24,
  bgcolor: theme.palette.primary.main,
};

const ModalWindow: React.FC<ModalState> = ({ title, pagesNames, children }) => {
  // console.log('pagesContent 0:', pagesContent[0])
  const { showModalWindow, setShowModalWindow, modalPage, setModalPage} = useContext(GlobalContext);
  const handleClose = () => setShowModalWindow(false);
  
  useEffect(() => {
    setModalPage(pagesNames[0]);
  }, []);

  const handleChangePage = (
    event: React.SyntheticEvent<Element, Event>,
    newPage: any
  ) => {
    setModalPage(newPage);
  };

  return (
    <Modal open={showModalWindow} onClose={handleClose}>
      <Box sx={style}>
        <Typography id="modal-title" variant="h6" component="h2" sx={{ p: 1 }}>
          {title}
        </Typography>
        <TabContext value={modalPage}>
          <ThemeProvider theme={themeModalTab}>
            <Box sx={{ borderBottom: 1 }}>
              <TabList onChange={handleChangePage}>
                <Tab
                  label={pagesNames[0]}
                  value={pagesNames[0]}
                />
                <Tab label={pagesNames[1]} value={pagesNames[1]} />
                <Tab label={pagesNames[2]} value={pagesNames[2]} />
              </TabList>
            </Box>
            <TabPanel value={pagesNames[0]}>{children[0]}</TabPanel>
            <TabPanel value={pagesNames[1]}>{children[1]}</TabPanel>
            <TabPanel value={pagesNames[2]}>{children[2]}</TabPanel>
          </ThemeProvider>
        </TabContext>
      </Box>
    </Modal>
  );
};

export default ModalWindow;
