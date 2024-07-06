import React, { InputHTMLAttributes, memo, useEffect, useRef, useState } from "react";
import { classNames } from "../../lib/classNames/classNames";
import cls from "./Input.module.scss";

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange"
>;
interface InputProps extends HTMLInputProps {
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  autofocus?: boolean;
}

export const Input = memo((props: InputProps) => {
  const {
    className = cls.Input,
    value,
    onChange,
    type = "text",
    placeholder,
    autofocus,
    ...otherProps
  } = props;
  const ref = useRef<HTMLInputElement>(null)
  const [isFocused, setIsFocus] = useState(false)
  const [caretPosiotion, setCaretPosition] = useState(0)
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
    setCaretPosition(e.target.value.length)
  };
  useEffect(() => {
    if (autofocus) {
      setIsFocus(true)
      ref.current?.focus()
    }
  }, [autofocus])

  const onBlure = () => {
    setIsFocus(false)
  }

  const onFocus = () => {

    setIsFocus(true)
  }

  const onSelect = (e: any) => {
    setCaretPosition(e?.target?.selectionStart || 0)
  }

  return (
    <div className={classNames(cls.InputWrapper, {}, [className])}>
      {placeholder && (
        <div className={cls.placeholder}>{`${placeholder}>`}</div>
      )}
      <div className={cls.caretWrapper}>
        <input
          ref={ref}
          className={cls.Input}
          type={type}
          value={value}
          onChange={onChangeHandler}
          onFocus={onFocus}
          onBlur={onBlure}
          onSelect={onSelect}
          {...otherProps}
        />
        {isFocused && (<span className={cls.caret} style={{ left: `${caretPosiotion * 8}px` }} />)}
      </div>
    </div>
  );
});
