import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import SignIn from "./components/sign-in";
import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./components/sign-up";
import Home from "./components/home";
import TemporaryDrawer from "./components/temporary-drawer";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { useAuthContext } from "./hooks/useAuthContext";
import { useEffect, useState } from "react";
import { PaletteMode } from "@mui/material";

function App() {
  const { user, authIsReady } = useAuthContext() as any;
  const [mode, setMode] = useState<PaletteMode>('light');
  
  useEffect(() => {
    const mode = localStorage.getItem('mode') as PaletteMode;
    if (!mode) setMode('light');
    else setMode(mode);
  }, []);
  
  
  const darkTheme = createTheme({
    palette: {
      mode,
    },
  });
  
  const onSetModeHandler = () => {
    setMode((prevState) => {
      const currentMode = prevState === 'light' ? 'dark' : 'light';
      localStorage.setItem('mode', currentMode);
      return currentMode;
    });
  };
  
  
  return (
    <div className="App">
      {authIsReady && (
        <ThemeProvider theme={darkTheme}>
          <CssBaseline/>
          <TemporaryDrawer mode={mode}
                           setMode={onSetModeHandler}/>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <main>
              <Routes>
                <Route path="/sign-in" element={!user ? <SignIn/> : <Navigate to="/" replace/>}/>
                <Route path="/sign-up" element={!user ? <SignUp/> : <Navigate to="/" replace/>}/>
                <Route path="/" element={user ? <Home/> : <Navigate to="/sign-in" replace/>}/>
              </Routes>
            </main>
          </LocalizationProvider>
        </ThemeProvider>
      )}
    </div>
  );
}

export default App;
