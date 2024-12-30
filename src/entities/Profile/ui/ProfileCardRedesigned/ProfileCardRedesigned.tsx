import { CurrencySelect } from "../../../../entities/Currency";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import {
  Avatar,
  Card,
  HStack,
  Input,
  Skeleton,
  Text,
  VStack,
} from "../../../../shared";
import { ProfileCardProps } from "../ProfileCard/ProfileCard";

export const ProfileCardError = () => {
  const { t } = useTranslation();

  return (
    <HStack justify="center" max>
      <Text
        variant="error"
        title={t("Произошла ошибка при загрузке профиля")}
        text={t("Попробуйте обновить страницу")}
        align="center"
      />
    </HStack>
  );
};

export const ProfileCardSkeleton = () => {
  return (
    <Card padding="24" max>
      <VStack gap="32">
        <HStack max justify="center">
          <Skeleton border="100%" width={128} height={128} />
        </HStack>
        <HStack gap="32" max>
          <VStack gap="16" max>
            <Skeleton width="100%" height={38} />
            <Skeleton width="100%" height={38} />
            <Skeleton width="100%" height={38} />
            <Skeleton width="100%" height={38} />
          </VStack>

          <VStack gap="16" max>
            <Skeleton width="100%" height={38} />
            <Skeleton width="100%" height={38} />
            <Skeleton width="100%" height={38} />
            <Skeleton width="100%" height={38} />
          </VStack>
        </HStack>
      </VStack>
    </Card>
  );
};

export const ProfileCardRedesigned = memo((props: ProfileCardProps) => {
  const {
    className,
    data,
    readonly,
    onChangeAvatar,
    onChangeFirstName,
    onChangeLastName,
    onChangeMiddleName,
    onChangeCurrency,
    onChangePhone,
    onChangeDateBirthday,
  } = props;
  const { t } = useTranslation("profile");

  return (
    <Card padding="24" border="partial" max className={className}>
      <VStack gap="32">
        {data?.avatar && (
          <HStack justify="center" max>
            <Avatar size={128} src={data?.avatar} />
          </HStack>
        )}

        <HStack gap="24" max>
          <VStack gap="16" max>
            <Input
              value={data?.lastName}
              label={t("Фамилия")}
              onChange={onChangeLastName}
              readonly={readonly}
            />
            <Input
              value={data?.firstName}
              label={t("Имя")}
              onChange={onChangeFirstName}
              readonly={readonly}
            />
            <Input
              value={data?.middleName}
              label={t("Отчество")}
              onChange={onChangeMiddleName}
              readonly={readonly}
            />
          </VStack>
          <VStack gap="16" max>
            <Input
              value={data?.phone}
              label={t("Номер телофона")}
              onChange={onChangePhone}
              readonly={readonly}
            />
            <Input
              value={data?.dateBirthday}
              label={t("Дата рождения")}
              onChange={onChangeDateBirthday}
              readonly={readonly}
            />
            <Input
              value={data?.avatar}
              label={t("Аватарка")}
              onChange={onChangeAvatar}
              readonly={readonly}
            />
            {/* <CurrencySelect readonly={readonly} onChange={onChangeCurrency} /> */}
          </VStack>
        </HStack>
      </VStack>
    </Card>
  );
});
