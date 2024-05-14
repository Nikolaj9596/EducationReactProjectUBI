import React, { ButtonHTMLAttributes, FC } from "react";
import { classNames } from "../../lib";
import cls from "./Button.module.scss";

export enum ThemeButton {
  CLEAR = 'clear',
  OUTLINE = 'outline',
  BACKGROUND_INVERTED = "backgroundInverted",
  BACKGROUND = "background"
}

export enum ButtonSize {
  M = "size_m",
  L = "size_l",
  XL = "size_xl"
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ThemeButton;
  square?: boolean;
  size?: ButtonSize 
}


export const Button: FC<ButtonProps> = (props) => {
  const {
    children,
    className="Button", 
    theme = ThemeButton.CLEAR, 
    square = false, 
    size = ButtonSize.M,
    ...otherProps 
  } = props

  const mods: Record<string, boolean> = {
    [cls[theme]]: true,
    [cls.square]: square,
    [cls[size]]: true 
  }

  return (
    <button
      className={classNames(cls.Button, mods, [className, cls[theme]])}
      {...otherProps}
    >
      {children}
    </button>
  );
};

