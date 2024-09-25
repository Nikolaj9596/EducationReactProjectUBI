import {
  Listbox as HListbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { FC, Fragment, ReactNode, useState } from "react";
import { classNames } from "../../lib/classNames/classNames";
import { Button, ThemeButton } from "../Button/Button";
import cls from "./Listbox.module.scss";

export interface ListBoxItem {
  value: string;
  content: ReactNode;
}

interface ListBoxProps {
  items?: ListBoxItem[];
  className?: string;
  value?: string;
  defaultValue?: string;
  onChange?: <T extends string>(value: T) => void;
}

export const Listbox: FC<ListBoxProps> = (props) => {
  const { items, className, value, defaultValue, onChange } = props;

  return (
    <HListbox
      as={"div"}
      className={classNames(cls.Listbox, {}, [className])}
      value={value}
      onChange={onChange}
      __demoMode
    >
      <ListboxButton className={cls.trigger}>
        <Button theme={ThemeButton.OUTLINE}>{value ?? defaultValue}</Button>
      </ListboxButton>
      <ListboxOptions anchor="bottom" transition className={cls.options}>
        {items?.map((item) => (
          <ListboxOption key={item.value} value={item.value} as={Fragment}>
            {({ active, selected }) => (
              <li className={classNames(cls.option, { [cls.active]: active })}>
                {selected && "!!!! "}
                {item}
              </li>
            )}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </HListbox>
  );
};
