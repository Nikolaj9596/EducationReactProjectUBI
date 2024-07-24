import { memo } from "react";
import { classNames, Mods } from "../../lib/classNames/classNames";
import cls from "./Text.module.scss";

export enum TextTheme {
  PRIMARY = "primary",
  ERROR = "error"
}

export enum TextAlign {
  RIGHT = "right",
  LEFT = "left",
  CENTER = "center"
}

export enum TextSize {
  S = "size_s",
  M = "size_m",
  L = "size_l",
  XL = "size_xl"
}

interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  theme?: TextTheme
  align?: TextAlign
  size?: TextSize
}

export const Text = memo((props: TextProps) => {
  const {
    className,
    theme = TextTheme.PRIMARY,
    title,
    text,
    align = TextAlign.LEFT,
    size = TextSize.M
  } = props
  const mods: Mods = {
    [cls[theme]]: true,
    [align]: true,
    [size]: true,
  }
  return (
    <div className={classNames(cls.Text, mods, [className])}>
      {title && <p className={cls.title}>{title}</p>}
      {text && <p className={cls.text}>{text}</p>}
    </div>
  );
});

