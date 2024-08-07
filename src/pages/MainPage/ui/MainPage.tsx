import { Counter } from "../../../entities/Counter";
import { useTranslation } from "react-i18next";
import { Page } from "../../../shared";

const MainPage = () => {
  const { t } = useTranslation("main");
  return (
    <Page className="main-page">
      <h2>
        {t("Главная страница")}
        <Counter />
      </h2>
    </Page>
  );
};

export default MainPage;
