import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../../../shared";

interface LangSwitcherProps {
  className?: string;
  short?: boolean;
}

export const LangSwitcher = memo(({ short = false }: LangSwitcherProps) => {
  const { t, i18n } = useTranslation();
  const toggle = () => {
    i18n.changeLanguage(i18n.language === "ru" ? "en" : "ru");
  };
  return (
    <Button onClick={toggle} variant="clear">
      {t(short ? "Короткий язык" : "Язык")}
    </Button>
  );
});
