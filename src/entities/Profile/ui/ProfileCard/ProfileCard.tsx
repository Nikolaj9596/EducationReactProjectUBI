import { FC } from "react";
import { useTranslation } from "react-i18next";
import {
  classNames,
  Text,
  Input,
  Loader,
  TextTheme,
  TextAlign,
  Avatar,
  Mods,
  VStack,
  HStack,
} from "../../../../shared";
import cls from "./ProfileCard.module.scss";
import { Profile } from "../../model/types/profile";
import { ProfileEditkCallbacks } from "../../../../pages/ProfilePage/ui/ProfilePage";
import { CurrencySelect } from "../../../Currency";

interface ProfileCardProps {
  className?: string;
  data?: Profile;
  isLoading?: boolean;
  error?: string;
  readonly?: boolean;
  callbacks: ProfileEditkCallbacks;
}

export const ProfileCard: FC<ProfileCardProps> = (props) => {
  const { className, data, isLoading, error, callbacks, readonly } = props;
  const { t } = useTranslation("profile");

  if (isLoading) {
    return (
      <HStack
        max
        justify={"center"}
        className={classNames(cls.ProfileCard, { [cls.loading]: true }, [
          className,
        ])}
      >
        <Loader />
      </HStack>
    );
  }

  if (error) {
    console.log(error);
    return (
      <HStack
        justify={"center"}
        max
        className={classNames(cls.ProfileCard, {}, [className, cls.error])}
      >
        <Text
          theme={TextTheme.ERROR}
          title={t("Произошла ошибка при загрузки профиля")}
          text={t("Попробуйте обновить страницу")}
          align={TextAlign.CENTER}
        />
      </HStack>
    );
  }

  const mods: Mods = {
    [cls.editing]: !readonly,
  };

  return (
    <VStack
      gap={"8"}
      max
      className={classNames(cls.ProfileCard, mods, [className])}
    >
      {data?.avatar && (
        <HStack justify={"center"} max className={cls.avatarWrapper}>
          <Avatar size={150} src={data?.avatar} />
        </HStack>
      )}
      <Input
        value={data?.lastName}
        placeholder={t("Фамилия")}
        className={cls.input}
        onChange={callbacks.lastName}
        readonly={readonly}
      />
      <Input
        value={data?.firstName}
        placeholder={t("Имя")}
        className={cls.input}
        onChange={callbacks.firstName}
        readonly={readonly}
      />
      <Input
        value={data?.middleName}
        placeholder={t("Отчество")}
        className={cls.input}
        onChange={callbacks.middleName}
        readonly={readonly}
      />
      <Input
        value={data?.phone}
        placeholder={t("Номер телофона")}
        className={cls.input}
        onChange={callbacks.phone}
        readonly={readonly}
      />
      <Input
        value={data?.dateBirthday}
        placeholder={t("Дата рождения")}
        className={cls.input}
        onChange={callbacks.dateBirthday}
        readonly={readonly}
      />
      <Input
        value={data?.avatar}
        placeholder={t("Аватарка")}
        className={cls.input}
        onChange={callbacks.avatar}
        readonly={readonly}
      />
      <CurrencySelect readonly={readonly} className={cls.input} direction={"bottom"}/>
    </VStack>
  );
};
