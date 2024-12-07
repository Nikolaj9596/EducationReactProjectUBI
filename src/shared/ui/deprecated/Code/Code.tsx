import { memo, useCallback } from "react";
import { classNames, Button } from "../../../../shared";
import cls from "./Code.module.scss";
import { ReactComponent as CopyIcon } from "../../../../shared/assets/icons/copy-20-20.svg";

interface CodeProps {
  className?: string;
  text: string;
}

/**@deprecate**/
export const Code = memo((props: CodeProps) => {
  const { className, text } = props;
  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
  }, [text]);
  return (
    <pre className={classNames(cls.Code, {}, [className])}>
      <Button
        className={cls.copyBtn}
        variant={"clear"}
        onClick={onCopy}
      >
        <CopyIcon className={cls.copyIcon} />
      </Button>
      <code>{text}</code>
    </pre>
  );
});
