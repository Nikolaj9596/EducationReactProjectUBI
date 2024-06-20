import React, { ButtonHTMLAttributes, FC } from "react";
import { classNames } from "../../lib";
import cls from "./Button.module.scss";

export enum ThemeButton {
  CLEAR = 'clear',
  CLEAR_INVERTED = 'clearInverted',
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
  disabled?: boolean;
}


export const Button: FC<ButtonProps> = (props) => {
  const {
    children,
    className="Button", 
    theme = ThemeButton.CLEAR, 
    square = false, 
    size = ButtonSize.M,
    disabled=false,
    ...otherProps 
  } = props

  const mods: Record<string, boolean> = {
    [cls[theme]]: true,
    [cls.square]: square,
    [cls[size]]: true,
    [cls.disabled]: disabled
    
  }

  return (
    <button
      className={classNames(cls.Button, mods, [className, cls[theme]])}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
  );
};

