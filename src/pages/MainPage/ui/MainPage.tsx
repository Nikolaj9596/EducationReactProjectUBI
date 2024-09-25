import { Counter } from "../../../entities/Counter";
import { useTranslation } from "react-i18next";
import { Page } from "../../../widgets";
import { Listbox, VStack } from "../../../shared";

const MainPage = () => {
  const { t } = useTranslation("main");
  return (
    <Page className="main-page">
      <h2>
        {t("Главная страница")}
        <Counter />
      </h2>
      <VStack>
      <div>some</div>
      <div>some</div>
      <div>some</div>
      <div>some</div>
      <div>some</div>
      <div>some</div>
      <div>some</div>
      <Listbox />
      <div>some</div>
      <div>some</div>
      <div>some</div>
      <div>some</div>
      </VStack>
    </Page>
  );
};

export default MainPage;
