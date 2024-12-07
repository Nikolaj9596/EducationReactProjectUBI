import { memo, useCallback } from "react";
import { Icon, useTheme, useAppDispatch } from "../../../shared";
import { saveJsonSettings } from "../../../entities/User";
import { ReactComponent as ThemeIcon } from "../../../shared/assets/icons/theme.svg";

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
  const { theme, toggleTheme } = useTheme();
  const dispatch = useAppDispatch();

  const onToggleHandler = useCallback(() => {
    toggleTheme((newTheme) => {
      dispatch(saveJsonSettings({ theme: newTheme }));
    });
  }, [dispatch, toggleTheme]);
  return <Icon Svg={ThemeIcon} clickable onClick={onToggleHandler} />;
});
