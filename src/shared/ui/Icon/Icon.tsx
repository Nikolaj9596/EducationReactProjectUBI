import React, { memo } from "react";
import { classNames } from "../../lib/classNames/classNames";
import cls from "./Icon.module.scss";

interface IconProps {
  className?: string;
  Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
}

export const Icon = memo((props: IconProps) => {
  const { className = cls.Icon, Svg } = props;
  return <Svg className={classNames(cls.Icon, {}, [className])} />;
});
