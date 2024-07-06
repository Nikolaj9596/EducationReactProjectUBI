import { FC } from "react";
import { classNames } from "../../lib/classNames/classNames";
import "./Loader.scss";

interface LoaderProps {
  className?: string;
}

export const Loader: FC<LoaderProps> = (props) => {
  return (
    <div className={classNames("lds-ellipsis", {}, [props.className])}>
      <div></div><div></div><div></div><div></div>
    </div>
  );
};
