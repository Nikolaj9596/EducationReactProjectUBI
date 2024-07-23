import { FC } from "react";
import { classNames } from "../../lib/classNames/classNames";
import cls from "./Skeleton.module.scss";

interface SkeletonProps {
  className?: string;
}

export const Skeleton: FC<SkeletonProps> = (props) => {
  return (
    <div className={classNames(cls.Skeleton, {}, [props.className])}>
    </div>
  );
};
