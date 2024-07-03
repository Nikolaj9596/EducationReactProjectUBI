import { Theme, useTheme } from "../../../app/providers";
import React, { memo } from "react";
import cls from "./ThemeSwitcher.module.scss";
import { Button, ThemeButton, classNames } from "../../../shared";
import { ReactComponent as LightIcon } from "../../../shared/assets/icons/theme-light.svg"
import { ReactComponent as DarkIcon } from "../../../shared/assets/icons/theme-dark.svg"

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
  const { theme, toggleTheme } = useTheme();
  return (
    <Button
      theme={ThemeButton.CLEAR}
      onClick={toggleTheme}
      className={classNames(cls.ThemeSwitcher, {}, [className ? className : ''])}
    >
      {theme === Theme.DARK ? <DarkIcon /> : <LightIcon />}
    </Button>
  );
});
