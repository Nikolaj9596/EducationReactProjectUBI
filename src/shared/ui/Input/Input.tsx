import React, { FC, InputHTMLAttributes, memo } from "react";
import { classNames } from "../../lib";
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
}

export const Input = memo((props: InputProps) => {
  const {
    className = cls.Input,
    value,
    onChange,
    type = "text",
    placeholder,
    ...otherProps
  } = props;

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };
  return (
    <div className={classNames(cls.InputWrapper, {}, [className])}>
      {placeholder && (
        <div className={cls.placeholder}>{`${placeholder} > `}</div>
      )}
      <div className={cls.caretWrapper}>
        <input
          className={cls.Input}
          type={type}
          value={value}
          onChange={onChangeHandler}
        />
        <span className={cls.caret} />
      </div>
    </div>
  );
});
