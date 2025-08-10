import { ThemeProvider, createTheme } from "@mui/material/styles";
import {Container } from "@mui/material";
import { deepOrange,red , blue ,green} from "@mui/material/colors";
import './App.css'
import ToggleButtons from "./components/tabs";
import TaskBox from "./components/tasks";
import { MyProvider } from "./contexts/provider";
import TasksBox from "./components/tasks";
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: blue["500"],
    },
    secondary: {
      main: deepOrange[800],
    },
    error:{
      main:red["900"]
    },
    success:{
      main:green["A700"]
    }
  },
});
function App() {
  return(
    <ThemeProvider theme={theme}>
      <Container sx={{padding:8}} maxWidth="lg">
        <div className="todo" >
          <h1>to do list </h1>
          <hr />
          <MyProvider>
          <ToggleButtons/>
          <TasksBox></TasksBox>
            
          </MyProvider>
        </div>
      </Container>
    </ThemeProvider>
  )
}

export default App
