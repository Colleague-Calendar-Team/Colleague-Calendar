import { Box, Modal, ThemeProvider, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import GlobalContext from "../../context/globalContext";
import theme from "../../styles/theme";
import { ModalState } from "../../types/elements/modal";
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
  const { setShowModalWindow, modalPage, setModalPage } = useContext(GlobalContext);
  const handleClose = () => {
    setShowModalWindow('');
  }
  
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
    <Modal open={true} onClose={handleClose}>
      <Box sx={style}>
        {title !== '' &&
        <Typography id="modal-title" variant="h6" component="h2" sx={{ p: 1 }}>
          {title}
        </Typography>
        }
        <TabContext value={modalPage}>
          <ThemeProvider theme={themeModalTab}>
            <Box sx={{ borderBottom: 1 }}>
              <TabList onChange={handleChangePage}>
                {children.map((_, id) => 
                  <Tab key={id} label={pagesNames[id]} value={pagesNames[id]} />
                )}
              </TabList>
            </Box>
            {children.map((tab, id) => 
              <TabPanel key={id} value={pagesNames[id]}>{tab}</TabPanel>
            )}
          </ThemeProvider>
        </TabContext>
      </Box>
    </Modal>
  );
};

export default ModalWindow;
