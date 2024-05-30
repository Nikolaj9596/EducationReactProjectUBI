import { useContext } from "react";
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from "./ThemeContext";

interface UseThemeResult {
  theme: Theme;
  toggleTheme: () => void

}
export const useTheme = (): UseThemeResult => {

  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  const { theme, setTheme } = context;

  if (typeof theme === 'undefined' || typeof setTheme === 'undefined') {
    throw new Error('useTheme must be used within a ThemeProvider that defines "theme" and "setTheme".');
  }

  const toggleTheme = () => {
    let newTheme = Theme.DARK
    console.log(theme)
    switch (theme) {
      case Theme.DARK:
        newTheme = Theme.LIGHT
        break
      case Theme.LIGHT:
        newTheme = Theme.DARK
        break
      default:
        newTheme = Theme.LIGHT
    }
    setTheme(newTheme);
    document.body.className = newTheme
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
  }

  return { theme, toggleTheme };
}
