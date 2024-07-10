import { ChangeEvent, FC, memo, useMemo } from "react";
import { classNames, Mods } from "../../../shared";
import cls from "./Select.module.scss";

interface SelectOption {
  value?: string
  content?: string
}

interface SelectProps {
  className?: string;
  label?: string
  options?: SelectOption[]
  value?: string
  onChange?: (valued: string) => void
  readonly?: boolean
}

export const Select: FC<SelectProps> = memo((props) => {
  const { className, label, options, value, onChange, readonly } = props
  const mods: Mods = {
  }
  const listOptions = useMemo(() => {
    return options?.map((opt) => (
      <option
        className={cls.option}
        value={opt.value}
        key={opt.value}
      >
        {opt.content}
      </option>
    ))

  }, [options])
  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value)
  }

  return (
    <div className={classNames(cls.Wrapper, mods, [className])}>
      {
        label && (
          <span className={cls.label}>{label}</span>
        )
      }
      <select
        disabled={readonly}
        className={cls.Select}
        value={value}
        onChange={onChangeHandler}
      >
        {listOptions}
      </select>
    </div>
  );
})
