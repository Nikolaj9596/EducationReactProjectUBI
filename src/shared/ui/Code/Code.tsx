import React, { memo, ReactNode } from "react";
import { classNames } from "../../lib/classNames/classNames";
import { Button, ThemeButton } from "../Button/Button";
import cls from "./Code.module.scss";

interface CodeProps {
  className?: string;
  children: ReactNode;
}

export const Code = memo((props: CodeProps) => {
  const { className, children } = props;
  return (
    <pre className={classNames(cls.Code, {}, [className])}>
      <Button className={cls.copyBtn} theme={ThemeButton.OUTLINE}>Копировать</Button>
      <code>{children}</code>
    </pre>
  );
});
