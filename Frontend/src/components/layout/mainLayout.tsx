import { Box } from "@mui/material";
import theme from "../../styles/theme";
import { MainLayoutState } from "../../types/elements/mainLayout";

const MainLayout: React.FC<MainLayoutState> = ({element, color, bgColor}) => {
  return (<Box sx={{ 
    display: 'flex', 
    flexDirection: 'column', 
    width: '100%', 
    height: '100vh', 
    backgroundColor: bgColor, 
    color: color}}>
      {element}
  </Box>);
}

export default MainLayout;