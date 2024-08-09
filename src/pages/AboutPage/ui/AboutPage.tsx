import { useTranslation } from "react-i18next";
import { Page } from "../../../widgets";

const AboutPage = () => {
  const { t } = useTranslation("about");
  return (
    <Page className="aboutPage">
      <h1>{t("Старница О нас")}</h1>
    </Page>
  );
};

export default AboutPage;
