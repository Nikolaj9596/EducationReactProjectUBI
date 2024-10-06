import { FC } from "react";
import { Page } from "../../../widgets";
import { classNames } from "../../../shared";

interface AdminPanelPageProps {
  className?: string;
}

const AdminPanelPage: FC<AdminPanelPageProps> = (props) => {
  return (
    <Page className={classNames("", {}, [props.className])}>
      {"Admin panel"}
    </Page>
  );
};

export default AdminPanelPage;
