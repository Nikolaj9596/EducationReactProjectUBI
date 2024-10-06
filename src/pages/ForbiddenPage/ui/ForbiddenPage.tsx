import { FC } from "react";
import { classNames } from "../../../shared";
import { Page } from "../../../widgets";

interface ForbiddenPageProps {
  className?: string;
}

const ForbiddenPage: FC<ForbiddenPageProps> = (props) => {
  return (
    <Page className={classNames("", {}, [props.className])}>
      {"У вас нет доступа к этой странице"}
    </Page>
  );
};

export default ForbiddenPage;
