import React, { FC, InputHTMLAttributes, memo } from "react";
import { classNames } from "../../lib";
import cls from "./Input.module.scss";

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>
interface InputProps extends HTMLInputProps {
  className?: string
  value?: string
  onChange?: (value: string) => void;
}

export const Input = memo((props: InputProps) => {
  const {
    className=cls.Input,
    value,
    onChange,
    type = "text",
    ...otherProps
  } = props

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value)

  }
  return (
    <div className={classNames(cls.Input, {}, [className])}>
      <input
        type={type}
        value={value}
        onChange={onChangeHandler}
      />
    </div>
  )
})
