import { Box, Modal, ThemeProvider, Typography } from "@mui/material";
import React, { useEffect } from "react";
import theme from "../../styles/theme";
import { ModalState } from "../../types/windows/modal";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import themeModalTab from "../../styles/modalTab";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { modalStyle } from "../../styles/modal";

const ModalWindow: React.FC<ModalState> = ({ title, pagesNames, children }) => {
  const { selectModalWindow, selectModalPage } = useActions();
  const {modalPage} = useTypedSelector(state=>state.selectElements);

  const handleClose = () => {
    selectModalWindow('');
  }
  
  useEffect(() => {
    selectModalPage(pagesNames[0]);
  }, []);

  const handleChangePage = (
    event: React.SyntheticEvent<Element, Event>,
    newPage: any
  ) => {
    selectModalPage(newPage);
  };

  return (
    <Modal open={true} onClose={handleClose}>
      <Box sx={modalStyle}>
        {title &&
        <Typography id="modal-title" variant="h6" component="h2" sx={{ p: 1, backgroundColor: theme.palette.primary.dark, color: theme.palette.primary.main}}>
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
