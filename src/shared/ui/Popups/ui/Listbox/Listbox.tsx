import {
  Listbox as HListbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { FC, Fragment, ReactNode } from "react";
import { classNames } from "../../../../lib/classNames/classNames";
import { Button, ThemeButton } from "../../../Button/Button";
import { HStack } from "../../../Stack/HStack/HStack";
import cls from "./Listbox.module.scss";
import { mapDirectionClass } from "../../styles/const";
import { DropdownDirection } from "shared/types/ui";
import popupCls from "../../styles/popup.module.scss";

export interface ListBoxItem {
  value: string;
  content: ReactNode;
  disabled?: boolean;
}

interface ListBoxProps {
  items?: ListBoxItem[];
  className?: string;
  value?: string;
  defaultValue?: string;
  onChange?: <T extends string>(value: T) => void;
  readonly?: boolean;
  direction?: DropdownDirection;
  label?: string;
}

export const Listbox: FC<ListBoxProps> = (props) => {
  const {
    items,
    className,
    value,
    defaultValue,
    onChange,
    readonly,
    direction = "bottom right",
    label,
  } = props;

  return (
    <HStack gap={"4"}>
      {label && <span>{label + ">"}</span>}
      <HListbox
        as={"div"}
        className={classNames(cls.Listbox, {}, [className, popupCls.popup])}
        value={value}
        onChange={onChange}
        disabled={readonly}
      >
        <ListboxButton className={cls.trigger} disabled={readonly}>
          <Button theme={ThemeButton.OUTLINE} disabled={readonly}>
            {value ?? defaultValue}
          </Button>
        </ListboxButton>
        <ListboxOptions
          transition
          className={classNames(cls.options, {}, [
            mapDirectionClass[direction],
          ])}
        >
          {items?.map((item) => (
            <ListboxOption
              key={item.value}
              value={item.value}
              as={Fragment}
              disabled={item.disabled}
            >
              {({ active, selected }) => (
                <li
                  className={classNames(cls.option, {
                    [popupCls.active]: active,
                    [popupCls.disabled]: item.disabled,
                  })}
                >
                  {selected && "!!!! "}
                  {item.content}
                </li>
              )}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </HListbox>
    </HStack>
  );
};
