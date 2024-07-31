import React, { FC } from "react";
import { classNames, Loader } from "../../../shared";
import cls from "./PageLoader.module.scss";

interface PageLoaderProps {
  className?: string;
}

export const PageLoader: FC<PageLoaderProps> = (props) => {
  return (
    <div className={classNames(cls.PageLoader, {}, [props.className])}>
      <Loader />
    </div>
  );
};
