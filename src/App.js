import "./App.css";
import React from "react";
import CustomThemeProvider from "./contexts/ThemeProvider";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/index";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <CustomThemeProvider>
          <div className="background">
            <Router />
          </div>
        </CustomThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
