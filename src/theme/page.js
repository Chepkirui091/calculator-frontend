import { createTheme as createMuiTheme } from "@mui/material/styles";
import DarkThemeOptions from "@/theme/dark-theme-options";
import LightThemeOptions from "./light-theme-options";

export const CreateTheme = (config) => {
    const theme = createMuiTheme({
        ...config?.mode === "dark" ? DarkThemeOptions : LightThemeOptions,
        direction: config.direction,
    });

    return theme;
};
