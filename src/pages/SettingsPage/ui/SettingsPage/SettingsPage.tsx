import { useTranslation } from "react-i18next";
import { memo } from "react";
import { Text, VStack } from "../../../../shared";
import { UiDesignSwitcher } from "../../../../features";
import { Page } from "../../../../widgets";

interface SettingsPageProps {
  className?: string;
}

const SettingsPage = memo((props: SettingsPageProps) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <Page>
      <VStack gap="16">
        <Text title={t("Настройки пользователя")} />
        <UiDesignSwitcher />
      </VStack>
    </Page>
  );
});

export default SettingsPage;
