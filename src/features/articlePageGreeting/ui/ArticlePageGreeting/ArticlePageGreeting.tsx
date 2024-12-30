import { useTranslation } from "react-i18next";
import { memo, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { Modal, Text, Drawer, useAppDispatch } from "../../../../shared";
import { useJsonSettings } from "../../../../entities/User/model/selectors/jsonSettings";
import { saveJsonSettings } from "../../../../entities/User";

export const ArticlePageGreeting = memo(() => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { isArticlesPageWasOpened } = useJsonSettings();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isArticlesPageWasOpened) {
      setIsOpen(true);
      dispatch(saveJsonSettings({ isArticlesPageWasOpened: true }));
    }
  }, [dispatch, isArticlesPageWasOpened]);

  const onClose = () => setIsOpen(false);

  const text = (
    <Text
      title={t("Добро пожаловать на страницу статей")}
      text={t(
        "Здесь вы можете искать и просматривать статьи на различные темы",
      )}
    />
  );

  if (isMobile) {
    return (
      <Drawer lazy isOpen={isOpen} onClose={onClose}>
        {text}
      </Drawer>
    );
  }

  return (
    <Modal lazy isOpen={isOpen} onClose={onClose}>
      {text}
    </Modal>
  );
});
