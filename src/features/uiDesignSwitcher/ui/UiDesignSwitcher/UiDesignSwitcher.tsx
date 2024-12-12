import { useTranslation } from "react-i18next";
import { memo } from "react";
import { useSelector } from "react-redux";
import {
  Listbox,
  Text,
  HStack,
  useForceUpdate,
} from "../../../../shared";
import { getUserAuthData } from "../../../../entities/User";

interface UiDesignSwitcherProps {
  className?: string;
}

export const UiDesignSwitcher = memo((props: UiDesignSwitcherProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const authData = useSelector(getUserAuthData);
  const forceUpdate = useForceUpdate();

  const items = [
    {
      content: t("Новый"),
      value: "new",
    },
    {
      content: t("Старый"),
      value: "old",
    },
  ];

  const onChange = async (value: string) => {
    if (authData) {
      forceUpdate();
    }
  };

  return (
    <HStack>
      <Text text={t("Вариант интерфейса")} />
      {
        <Listbox
          onChange={onChange}
          items={items}
          value={"new"}
          className={className}
        />
      }
    </HStack>
  );
});
