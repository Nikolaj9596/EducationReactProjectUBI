import { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { Page } from "../../../../widgets";
import { classNames } from "../../../../shared";
import cls from "./ArticleEditPage.module.scss";
import { useParams } from "react-router-dom";

interface ArticleEditPageProps {
  className?: string;
}

const ArticleEditPage: FC<ArticleEditPageProps> = memo((props) => {
  const { t } = useTranslation();
  const { className } = props;
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);

  return (
    <Page className={classNames(cls.ArticleEditPage, {}, [className])}>
      {isEdit ? "Edit" : "Create"}
    </Page>
  );
});

export default ArticleEditPage;
