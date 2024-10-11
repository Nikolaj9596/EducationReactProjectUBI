import { FC, memo, useCallback, useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { useTranslation } from "react-i18next";
import {
  Modal,
  Card,
  classNames,
  VStack,
  Text,
  StarRating,
  HStack,
  Button,
  Input,
  ThemeButton,
  Drawer,
} from "../../../../shared";
import cls from "./RatingCard.module.scss";

interface RatingCardProps {
  className?: string;
  title?: string;
  feedbackTitle?: string;
  hasFeedback?: boolean;
  onCancel?: (starsCount: number) => void;
  onAccept?: (starsCount: number, feedback?: string) => void;
}

export const RatingCard: FC<RatingCardProps> = memo((props) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [starsCount, setStarsCount] = useState(0);
  const [feedback, setFeedback] = useState("");
  const { className, title, feedbackTitle, hasFeedback, onCancel, onAccept } =
    props;
  const onSelectStars = useCallback(
    (selectedStarsCount: number) => {
      setStarsCount(selectedStarsCount);
      setIsModalOpen(true);
      if (hasFeedback) {
        setIsModalOpen(true);
      } else {
        onAccept?.(selectedStarsCount);
      }
    },
    [hasFeedback, onAccept],
  );

  const acceptHandle = useCallback(() => {
    setIsModalOpen(false);
    onAccept?.(starsCount, feedback);
  }, [feedback, starsCount, onAccept]);

  const cancelHandle = useCallback(() => {
    setIsModalOpen(false);
    onCancel?.(starsCount);
  }, [starsCount, onCancel]);

  const modalContent = (
    <VStack max gap={"32"}>
      <Text title={feedbackTitle} />
      <Input placeholder={t("Ваш отзыв")} />
      <HStack gap={"16"} max justify={"end"}>
        <Button theme={ThemeButton.OUTLINE_RED} onClick={cancelHandle}>
          {t("Закрыть")}
        </Button>
        <Button theme={ThemeButton.OUTLINE} onClick={acceptHandle}>
          {t("Отправить")}
        </Button>
      </HStack>
    </VStack>
  );
  return (
    <Card className={classNames(cls.RatingCard, {}, [className])}>
      <VStack align={"center"} gap={"8"}>
        <Text title={title} />
        <StarRating size={40} onSelect={onSelectStars} />
      </VStack>
      <BrowserView>
        <Modal isOpen={isModalOpen} lazy>
          {modalContent}
        </Modal>
      </BrowserView>
      <MobileView>
        <Drawer isOpen={isModalOpen} lazy>
          {modalContent}
        </Drawer>
      </MobileView>
    </Card>
  );
});
