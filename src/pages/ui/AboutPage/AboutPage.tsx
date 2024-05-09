import React from "react";
import { useTranslation } from "react-i18next";


const AboutPage = () => {
  const { t, i18n } = useTranslation("about");
  return (
    <div className="aboutPage">
      <h1>
        {t("Старница О нас")}
      </h1>
    </div>
  );
};

export default AboutPage;
