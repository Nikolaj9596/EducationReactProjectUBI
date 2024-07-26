import { memo, useCallback } from "react";
import { classNames } from "../../lib/classNames/classNames";
import { Button, ThemeButton } from "../Button/Button";
import cls from "./Code.module.scss";
import { ReactComponent as CopyIcon } from "../../../shared/assets/icons/copy-20-20.svg";

interface CodeProps {
  className?: string;
  text: string;
}

export const Code = memo((props: CodeProps) => {
  const { className, text } = props;
  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
  }, [text]);
  return (
    <pre className={classNames(cls.Code, {}, [className])}>
      <Button
        className={cls.copyBtn}
        theme={ThemeButton.CLEAR}
        onClick={onCopy}
      >
        <CopyIcon className={cls.copyIcon} />
      </Button>
      <code>{text}</code>
    </pre>
  );
});
