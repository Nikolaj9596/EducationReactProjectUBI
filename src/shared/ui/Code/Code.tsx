import { memo, useCallback } from "react";
import { classNames, Icon } from "../../../shared";
import cls from "./Code.module.scss";
import { ReactComponent as CopyIcon } from "../../../shared/assets/icons/copy.svg";

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
      <Icon clickable onClick={onCopy} className={cls.copyBtn} Svg={CopyIcon} />
      <code>{text}</code>
    </pre>
  );
});
