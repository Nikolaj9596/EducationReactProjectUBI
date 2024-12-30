import {
  Listbox as HListbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { Fragment, ReactNode, useMemo } from "react";
import {
  classNames,
  Button,
  HStack,
  DropdownDirection,
  Icon,
} from "../../../../../shared";
import cls from "./Listbox.module.scss";
import { mapDirectionClass } from "../../styles/const";
import popupCls from "../../styles/popup.module.scss";
import { ReactComponent as ArrowIcon } from "../../../../../shared/assets/icons/arrow-bottom.svg";

export interface ListBoxItem<T extends string> {
  value: string;
  content: ReactNode;
  disabled?: boolean;
}

interface ListBoxProps<T extends string> {
  items?: ListBoxItem<T>[];
  className?: string;
  value?: T;
  defaultValue?: string;
  onChange: (value: T) => void;
  readonly?: boolean;
  direction?: DropdownDirection;
  label?: string;
}

export function ListBox<T extends string>(props: ListBoxProps<T>) {
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

  const optionsClasses = [mapDirectionClass[direction], popupCls.menu];

  const selectedItem = useMemo(() => {
    return items?.find((item) => item.value === value);
  }, [items, value]);

  return (
    <HStack gap={"4"}>
      {label && <span>{`${label}>`}</span>}
      <HListbox
        as={"div"}
        className={classNames(cls.Listbox, {}, [className, popupCls.popup])}
        value={value}
        onChange={onChange}
        disabled={readonly}
      >
        <ListboxButton className={cls.trigger} disabled={readonly}>
          <Button
            variant={"filled"}
            disabled={readonly}
            addonRight={<Icon Svg={ArrowIcon} />}
          >
              {selectedItem?.content ?? defaultValue}
          </Button>
        </ListboxButton>
        <ListboxOptions
          transition
          className={classNames(cls.options, {}, optionsClasses)}
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
                    [popupCls.selected]: selected,
                  })}
                >
                  {selected}
                  {item.content}
                </li>
              )}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </HListbox>
    </HStack>
  );
}
