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
        <Listbox
          defaultValue="Select value"
          value={undefined}
          onChange={(value: string) => {}}
          items={[
            { value: '1', content: "one" },
            { value: '2', content: "twp" },
            { value: '3', content: "three" },
            { value: '4', content: "some" },
          ]}
        />
        <div>some</div>
        <div>some</div>
        <div>some</div>
        <div>some</div>
      </VStack>
    </Page>
  );
};

export default MainPage;
