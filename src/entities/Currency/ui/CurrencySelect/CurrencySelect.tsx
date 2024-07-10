import { Currency } from "../../modal/types/currency";
import { FC, memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Select, classNames } from "../../../../shared";

interface CurrencySelectProps {
  value?: Currency
  onChange?: (value: Currency) => void
  readonly?: boolean
  className?: string
}

const options = [
  { value: Currency.RUB, content: Currency.RUB },
  { value: Currency.USD, content: Currency.USD },
  { value: Currency.EUR, content: Currency.EUR },
]

export const CurrencySelect: FC<CurrencySelectProps> = memo((props) => {
  const { t } = useTranslation()
  const { value, onChange, readonly, className } = props

  const onChangeHandler = useCallback((value: string) => {
    onChange?.(value as Currency)
  }, [onChange])
  return (
    <Select
      label={t("Укажите валюту")}
      options={options}
      value={value}
      onChange={onChangeHandler}
      readonly={readonly}
      className={className}
    />
  );
})
