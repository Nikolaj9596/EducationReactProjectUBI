import React, { ButtonHTMLAttributes, FC } from "react";
import { classNames } from "../../lib";
import cls from "./Button.module.scss";

export enum ThemeButton {
  CLEAR = 'clear',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme: ThemeButton;
}

export const Button: FC<ButtonProps> = (props) => {
  const { className, children, theme = ThemeButton.CLEAR, ...otherProps } = props
  return (
    <button
      className={classNames(cls.Button, {}, [className ? className : '', cls[theme]])}
      {...otherProps}
    >
      {children}
    </button>
  );
};

