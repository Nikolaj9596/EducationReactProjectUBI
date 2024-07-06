import { Counter } from "../../../entities/Counter";
import { useTranslation } from "react-i18next";

const MainPage = () => {
  const { t, i18n } = useTranslation("main");
  return (
    <div className="main-page">
      <h2>
        {t("Главная страница")}
        <Counter />
      </h2>
    </div>
  );
};

export default MainPage;
