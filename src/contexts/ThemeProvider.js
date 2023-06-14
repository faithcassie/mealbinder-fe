import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";

const PRIMARY = {
  main: "#000",
  gray: " #6f6f6f",
  orange: "#AB6614",
};
const SECONDARY = {
  main: "#EDC597",
};
function ThemeProvider({ children }) {
  const themeOptions = {
    palette: {
      mode: "light",
      primary: PRIMARY,
      secondary: SECONDARY,
      background: {
        default: "#FAF4EE",
        // paper: "#FFFFFFBF",
      },
    },
  };
  const theme = createTheme(themeOptions);

  return (
    <MUIThemeProvider theme={theme}>
      {/* <CssBaseline /> */}
      {children}
    </MUIThemeProvider>
  );
}
export default ThemeProvider;
